'use client'
import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
/* eslint-disable @typescript-eslint/no-unused-vars */

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Função para controlar play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Função para atualizar o tempo atual da música
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
    // Iniciar a música automaticamente quando o componente for montado
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);  // Atualiza o estado para refletir que está tocando
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg flex items-center justify-center w-full max-w-md">
      {/* Controles do player */}
      <audio
        ref={audioRef}
        src="/musci.mp3"  // Caminho da música
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        className="text-white p-2 rounded-full bg-red-500 hover:bg-red-700"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6" />
        ) : (
          <PlayIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
