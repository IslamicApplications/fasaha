import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { arabicAudio } from '../utils/audio';

interface AudioPlayerButtonProps {
  text: string;
  rate?: number;
  pitch?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon-only';
  className?: string;
  label?: string;
  title?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  text,
  rate = 0.85,
  pitch = 1.0,
  size = 'md',
  variant = 'secondary',
  className = '',
  label,
  title = `Listen: "${text}"`,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      arabicAudio.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    arabicAudio.speak(text, {
      rate,
      pitch,
      onEnd: () => setIsPlaying(false),
      onCancel: () => setIsPlaying(false),
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  }[size];

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800/50',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
    'icon-only': 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50 rounded-full p-2',
  }[variant];

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={title}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all duration-150 active:scale-95 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {isPlaying ? (
        <span className="flex items-center gap-1">
          <VolumeX className="w-4 h-4 animate-pulse text-amber-500" />
          {label && <span>Stop</span>}
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
          {label && <span>{label}</span>}
        </span>
      )}
      {isPlaying && (
        <span className="flex space-x-0.5 items-center">
          <span className="w-1 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-3.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
        </span>
      )}
    </button>
  );
};
