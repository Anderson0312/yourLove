'use client'
import { useEffect } from 'react';
import YouTubeAudioPlayer from './YouTubeAudioPlayer';
/* eslint-disable @typescript-eslint/no-unused-vars */


interface MusicPlayerProps {
  selectedMusicUser: { title: string; thumbnail: string; videoId: string };
}



const MusicPlayer = ({ selectedMusicUser }: MusicPlayerProps) => {
  useEffect(() => {
  }, [selectedMusicUser]);


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-500 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between max-w-4xl">
        {/* Thumbnail e título da música */}
        <div className="flex items-center space-x-4 overflow-hidden flex-1 min-w-0">
          <img 
            src={selectedMusicUser.thumbnail} 
            alt="Thumbnail" 
            className="w-10 h-10 rounded-md flex-shrink-0" 
          />
          <div className="relative overflow-hidden flex-1 min-w-0">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-white text-sm md:text-base">
                {selectedMusicUser.title}
              </span>
            </div>
          </div>
        </div>

        {/* Player YouTube invisível */}
        <div className="flex-shrink-0 ml-4">
          <YouTubeAudioPlayer videoId={selectedMusicUser.videoId} />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
