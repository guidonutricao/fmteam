import React, { useState, useRef } from 'react';
import { Upload, X, Video, Image as ImageIcon, File, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/use-permissions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MediaType = 'video' | 'image' | 'pdf' | 'unknown';

interface MediaUploaderProps {
  onUpload: (file: File | null, embedUrl?: string) => void;
  onCancel?: () => void;
  accept?: string;
  maxSize?: number; // em MB
  type?: 'video' | 'image' | 'any';
  currentUrl?: string;
  className?: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUpload,
  onCancel,
  accept = "video/*,image/*,.pdf",
  maxSize = 50, // 50MB default
  type = 'any',
  currentUrl,
  className
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = usePermissions();

  const getMediaType = (file: File): MediaType => {
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'unknown';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Verificar tamanho
      if (selectedFile.size > maxSize * 1024 * 1024) {
        setError(`O arquivo excede o tamanho máximo de ${maxSize}MB`);
        return;
      }
      
      // Verificar tipo se especificado
      if (type !== 'any') {
        const mediaType = getMediaType(selectedFile);
        if (type === 'video' && mediaType !== 'video') {
          setError('Por favor, selecione um arquivo de vídeo');
          return;
        }
        if (type === 'image' && mediaType !== 'image') {
          setError('Por favor, selecione uma imagem');
          return;
        }
      }
      
      setFile(selectedFile);
      
      // Criar preview
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      setIsUploading(true);
      
      try {
        // Simulação de upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        onUpload(file);
        setUploadComplete(true);
        
        // Reiniciar após alguns segundos
        setTimeout(() => {
          setUploadComplete(false);
        }, 2000);
      } catch (error) {
        setError('Erro ao fazer upload do arquivo');
      } finally {
        setIsUploading(false);
      }
    } else if (embedUrl) {
      onUpload(null, embedUrl);
    }
  };

  const handleEmbedSubmit = () => {
    // Validar URL do YouTube ou Vimeo
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;
    
    if (!youtubeRegex.test(embedUrl) && !vimeoRegex.test(embedUrl)) {
      setError('Por favor, insira uma URL válida do YouTube ou Vimeo');
      return;
    }
    
    setError(null);
    setPreview(embedUrl);
    onUpload(null, embedUrl);
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setEmbedUrl('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onCancel) onCancel();
  };

  if (!isAdmin) {
    return null;
  }

  const renderPreview = () => {
    if (!preview) return null;
    
    // Se for um URL de embed (YouTube ou Vimeo)
    if (typeof preview === 'string' && (preview.includes('youtube') || preview.includes('youtu.be') || preview.includes('vimeo'))) {
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
            title="Vídeo incorporado"
          />
        </div>
      );
    }
    
    // Se for um arquivo local
    if (file) {
      const mediaType = getMediaType(file);
      
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
              alt="Preview" 
              className="w-full max-h-80 object-contain rounded-md" 
            />
          );
        case 'pdf':
          return (
            <div className="flex items-center justify-center p-4 bg-muted rounded-md">
              <File size={32} className="text-primary mr-2" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          );
        default:
          return (
            <div className="flex items-center justify-center p-4 bg-muted rounded-md">
              <File size={32} className="text-primary mr-2" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          );
      }
    }
    
    return null;
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
            <TabsTrigger value="embed">Incorporar Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            {!preview ? (
              <div 
                className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={32} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Clique para selecionar ou arraste e solte um arquivo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {type === 'video' ? 'Vídeo' : type === 'image' ? 'Imagem' : 'Arquivo'} (máx. {maxSize}MB)
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept={accept}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {renderPreview()}
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSelection}
                  >
                    <X size={16} className="mr-1" /> Remover
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSubmit}
                    disabled={isUploading || uploadComplete}
                  >
                    {uploadComplete ? (
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
              <Label htmlFor="embed-url">URL do YouTube ou Vimeo</Label>
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
                  <Video size={16} className="mr-1" /> Incorporar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cole a URL de um vídeo para incorporá-lo
              </p>
            </div>
            
            {preview && embedUrl && (
              <div className="space-y-4">
                {renderPreview()}
                
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
        
        {error && (
          <div className="text-destructive text-sm px-2 py-1 border border-destructive/20 rounded bg-destructive/10">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaUploader; 