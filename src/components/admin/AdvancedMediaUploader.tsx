import React, { useState, useRef, useCallback } from 'react';
import { 
  Upload, X, Video, File, Image as ImageIcon, 
  Check, Archive, ExternalLink, Youtube 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/use-permissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useEdit } from '@/contexts/EditContext';

type MediaType = 'video' | 'image' | 'pdf' | 'doc' | 'unknown';

// Simula o upload para backend
const simulateUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula uma URL para o arquivo carregado
      const fakeURL = URL.createObjectURL(file);
      resolve(fakeURL);
    }, 2000);
  });
};

interface AdvancedMediaUploaderProps {
  onUpload: (url: string, mediaType: MediaType, title?: string) => void;
  onCancel?: () => void;
  maxSize?: number; // em MB
  acceptedTypes?: MediaType[];
  currentUrl?: string;
  currentTitle?: string;
  className?: string;
  showPreview?: boolean;
}

const AdvancedMediaUploader: React.FC<AdvancedMediaUploaderProps> = ({
  onUpload,
  onCancel,
  maxSize = 100, // 100MB default
  acceptedTypes = ['video', 'image', 'pdf', 'doc'],
  currentUrl = '',
  currentTitle = '',
  className,
  showPreview = true
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'embed'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentUrl);
  const [mediaType, setMediaType] = useState<MediaType>('unknown');
  const [title, setTitle] = useState<string>(currentTitle);
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const { toast } = useToast();
  const { isAdmin } = usePermissions();
  const { isEditMode, setPendingChanges } = useEdit();
  
  const getMediaTypeFromFile = (file: File): MediaType => {
    const type = file.type.toLowerCase();
    if (type.includes('video')) return 'video';
    if (type.includes('image')) return 'image';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word') || type.includes('doc')) return 'doc';
    return 'unknown';
  };
  
  const getMediaTypeFromUrl = (url: string): MediaType => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || lowerUrl.includes('vimeo.com')) {
      return 'video';
    }
    if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg')) {
      return 'video';
    }
    if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg') || lowerUrl.endsWith('.png') || lowerUrl.endsWith('.gif')) {
      return 'image';
    }
    if (lowerUrl.endsWith('.pdf')) {
      return 'pdf';
    }
    if (lowerUrl.endsWith('.doc') || lowerUrl.endsWith('.docx')) {
      return 'doc';
    }
    return 'unknown';
  };
  
  const getMimeTypeFromMediaType = (type: MediaType): string => {
    switch (type) {
      case 'video': return 'video/*';
      case 'image': return 'image/*';
      case 'pdf': return 'application/pdf';
      case 'doc': return '.doc,.docx';
      default: return '*/*';
    }
  };
  
  const getAcceptedMimeTypes = (): string => {
    return acceptedTypes.map(type => getMimeTypeFromMediaType(type)).join(',');
  };
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    
    // Verificar tamanho
    if (selectedFile.size > maxSize * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: `O arquivo excede o tamanho máximo de ${maxSize}MB`,
        variant: 'destructive'
      });
      return;
    }
    
    // Verificar tipo
    const fileType = getMediaTypeFromFile(selectedFile);
    if (!acceptedTypes.includes(fileType)) {
      toast({
        title: 'Tipo de arquivo não suportado',
        description: `Este tipo de arquivo não é aceito`,
        variant: 'destructive'
      });
      return;
    }
    
    setFile(selectedFile);
    setMediaType(fileType);
    
    // Criar preview
    if (fileType === 'image' || fileType === 'video') {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setPreview('');
    }
    
    if (!title) {
      // Extrair nome do arquivo como título
      setTitle(selectedFile.name.split('.')[0]);
    }
  }, [maxSize, acceptedTypes, toast, title]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: acceptedTypes.includes('image') || acceptedTypes.includes('video') || acceptedTypes.includes('pdf') || acceptedTypes.includes('doc') ? {
      'image/*': acceptedTypes.includes('image') ? ['.jpg', '.jpeg', '.png', '.gif'] : [],
      'video/*': acceptedTypes.includes('video') ? ['.mp4', '.webm', '.ogg'] : [],
      'application/pdf': acceptedTypes.includes('pdf') ? ['.pdf'] : [],
      'application/msword': acceptedTypes.includes('doc') ? ['.doc', '.docx'] : [],
    } : undefined,
    maxSize: maxSize * 1024 * 1024,
    multiple: false
  });
  
  const handleEmbedSubmit = () => {
    if (!embedUrl) {
      toast({
        title: "URL vazio",
        description: "Por favor, forneça uma URL para incorporar",
        variant: "destructive"
      });
      return;
    }

    try {
      new URL(embedUrl); // Valida se é uma URL válida
      const type = getMediaTypeFromUrl(embedUrl);
      
      if (!acceptedTypes.includes(type)) {
        toast({
          title: "Tipo de mídia não suportado",
          description: `Este tipo de mídia (${type}) não é suportado. Tipos aceitos: ${acceptedTypes.join(', ')}`,
          variant: "destructive"
        });
        return;
      }
      
      onUpload(embedUrl, type, title);
      setComplete(true);
      setPreview(embedUrl);
      setMediaType(type);
      setPendingChanges(true);
      
      toast({
        title: "Mídia incorporada",
        description: "Mídia incorporada com sucesso!",
      });
    } catch (e) {
      toast({
        title: "URL inválida",
        description: "Por favor, forneça uma URL válida",
        variant: "destructive"
      });
    }
  };
  
  const handleFileUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(0);
    
    try {
      // Simulação de upload com progresso
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);
      
      // Simula upload para backend
      const url = await simulateUpload(file);
      
      clearInterval(interval);
      setProgress(100);
      setComplete(true);
      
      setTimeout(() => {
        onUpload(url, mediaType, title);
        setIsUploading(false);
        setComplete(false);
      }, 1000);
      
    } catch (error) {
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível fazer o upload do arquivo',
        variant: 'destructive'
      });
      setIsUploading(false);
    }
  };
  
  const clearSelection = () => {
    setFile(null);
    setPreview('');
    setEmbedUrl('');
    setProgress(0);
    setIsUploading(false);
    setComplete(false);
    if (onCancel) onCancel();
  };
  
  const getMediaIcon = (type: MediaType, size = 24) => {
    switch (type) {
      case 'video': return <Video size={size} />;
      case 'image': return <ImageIcon size={size} />;
      case 'pdf': return <File size={size} />;
      case 'doc': return <File size={size} />;
      default: return <Archive size={size} />;
    }
  };
  
  const renderPreview = () => {
    if (!preview) return null;
    
    if (!showPreview) {
      return (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          {getMediaIcon(mediaType)}
          <span className="ml-2 font-medium">{title || "Arquivo selecionado"}</span>
        </div>
      );
    }
    
    // Para URLs de videos do YouTube ou Vimeo
    if (preview.includes('youtube.com') || preview.includes('youtu.be') || preview.includes('vimeo.com')) {
      let embedSrc = preview;
      
      // Converter URL do YouTube para embed
      if (preview.includes('youtube.com/watch')) {
        const videoId = new URL(preview).searchParams.get('v');
        embedSrc = `https://www.youtube.com/embed/${videoId}`;
      } else if (preview.includes('youtu.be')) {
        const videoId = preview.split('/').pop();
        embedSrc = `https://www.youtube.com/embed/${videoId}`;
      } else if (preview.includes('vimeo.com')) {
        const videoId = preview.split('/').pop();
        embedSrc = `https://player.vimeo.com/video/${videoId}`;
      }
      
      return (
        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
          <iframe 
            src={embedSrc} 
            className="w-full h-full" 
            allowFullScreen
            frameBorder="0"
            title={title || "Vídeo incorporado"}
          />
        </div>
      );
    }
    
    // Para arquivos locais
    if (file) {
      switch (mediaType) {
        case 'video':
          return (
            <video 
              src={preview} 
              controls 
              className="w-full rounded-md max-h-80"
            />
          );
        case 'image':
          return (
            <img 
              src={preview} 
              alt={title || "Preview"} 
              className="w-full max-h-80 object-contain rounded-md" 
            />
          );
        case 'pdf':
          return (
            <div className="flex items-center justify-center p-4 bg-muted rounded-md">
              <File size={32} className="text-primary mr-2" />
              <span className="font-medium">{file.name}</span>
            </div>
          );
        default:
          return (
            <div className="flex items-center justify-center p-4 bg-muted rounded-md">
              {getMediaIcon(mediaType, 32)}
              <span className="ml-2 font-medium">{file.name}</span>
            </div>
          );
      }
    }
    
    // Para URLs de preview (não YouTube/Vimeo)
    return (
      <div className="flex items-center justify-center p-4 bg-muted rounded-md">
        {getMediaIcon(mediaType, 32)}
        <span className="ml-2 font-medium truncate">{title || preview}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2"
          onClick={() => window.open(preview, '_blank')}
        >
          <ExternalLink size={14} />
        </Button>
      </div>
    );
  };
  
  if (!isAdmin || !isEditMode) {
    return null;
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Adicionar Mídia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'embed')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
            <TabsTrigger value="embed">Adicionar Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            {!file ? (
              <div 
                {...getRootProps()} 
                className={cn(
                  "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center",
                  "transition-colors cursor-pointer",
                  isDragActive 
                    ? "border-primary/50 bg-primary/5" 
                    : "hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <input {...getInputProps()} />
                <Upload size={32} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {isDragActive
                    ? "Solte o arquivo aqui..."
                    : "Clique para selecionar ou arraste e solte um arquivo"}
                </p>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  Formatos aceitos: {acceptedTypes.join(', ')} (máx. {maxSize}MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {renderPreview()}
                
                <div className="space-y-2">
                  <Label htmlFor="file-title">Título (opcional)</Label>
                  <Input
                    id="file-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título do arquivo ou vídeo"
                  />
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {progress < 100 
                        ? `Enviando... ${Math.round(progress)}%` 
                        : "Processando arquivo..."}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSelection}
                    disabled={isUploading && !complete}
                  >
                    <X size={16} className="mr-1" /> Remover
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleFileUpload}
                    disabled={isUploading || complete}
                  >
                    {complete ? (
                      <><Check size={16} className="mr-1" /> Concluído</>
                    ) : isUploading ? (
                      'Enviando...'
                    ) : (
                      <><Upload size={16} className="mr-1" /> Upload</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="embed-url">URL do vídeo ou documento</Label>
              <div className="flex gap-2">
                <Input 
                  id="embed-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                />
                <Button 
                  onClick={handleEmbedSubmit}
                  disabled={!embedUrl}
                >
                  <Youtube size={16} className="mr-1" /> Adicionar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cole a URL de um vídeo (YouTube/Vimeo) ou documento
              </p>
            </div>
            
            {preview && activeTab === 'embed' && (
              <div className="space-y-4">
                {renderPreview()}
                
                <div className="space-y-2">
                  <Label htmlFor="embed-title">Título (opcional)</Label>
                  <Input
                    id="embed-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título do vídeo ou documento"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearSelection}
                >
                  <X size={16} className="mr-1" /> Remover
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedMediaUploader; 