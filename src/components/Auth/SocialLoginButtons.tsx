import React from 'react';

interface SocialLoginButtonsProps {
  onGoogle: () => void;
  onFacebook: () => void;
  loading?: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onGoogle, onFacebook, loading }) => (
  <div className="flex flex-col gap-3 w-full">
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 font-medium shadow hover:bg-gray-50 transition disabled:opacity-60"
      onClick={onGoogle}
      disabled={loading}
    >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
      Entrar com Google
    </button>
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded px-4 py-2 font-medium shadow hover:bg-blue-700 transition disabled:opacity-60"
      onClick={onFacebook}
      disabled={loading}
    >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5 bg-white rounded-full" />
      Entrar com Facebook
    </button>
  </div>
);

export default SocialLoginButtons; 