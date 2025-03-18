'use client'
import { useEffect } from 'react';
import YouTubeAudioPlayer from './YouTubeAudioPlayer';
/* eslint-disable @typescript-eslint/no-unused-vars */


interface MusicPlayerProps {
  selectedMusicUser: { title: string; thumbnail: string; videoId: string };
}



const MusicPlayer = ({ selectedMusicUser }: MusicPlayerProps) => {
  useEffect(() => {
    console.log('MusicPlayer' + selectedMusicUser.title)
  }, [selectedMusicUser]);


  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 fixed bottom-0 left-1/2 transform -translate-x-1/2 pt-1.5 pb-1.5 rounded flex items-center justify-center w-full max-w-md md:max-w-2xl whitespace-nowrap gap-4">
  {/* Thumbnail e título da música */}
      <div className="flex items-center space-x-4 overflow-hidden">
      <img src={selectedMusicUser.thumbnail} alt="Thumbnail" className="w-11 h-10 rounded-md" />
      <div className="relative w-48 overflow-hidden">
      <div className="flex items-center animate-marquee">
        <span className="text-white lg:text-lg xs:text-xs whitespace-nowrap">
          {selectedMusicUser.title}
        </span>
      </div>
    </div>
    </div>

    {/* Player YouTube invisível */}
    <YouTubeAudioPlayer 
      videoId={selectedMusicUser.videoId}
    />

  </div>
  );
};

export default MusicPlayer;
