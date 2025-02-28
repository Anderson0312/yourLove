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
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg flex items-center justify-center w-full max-w-md md:max-w-2xl whitespace-nowrap gap-4">
  {/* Thumbnail e título da música */}
  {/* Thumbnail e título da música */}
    <div className="flex items-center space-x-4">
      <img src={selectedMusicUser.thumbnail} alt="Thumbnail" className="w-12 h-12 rounded-md" />
      <span className="text-white lg:text-lg xs:text-xs">{selectedMusicUser.title.split(" ").slice(0, 2).join(" ")}</span>
    </div>

    {/* Player YouTube invisível */}
    <YouTubeAudioPlayer 
      videoId={selectedMusicUser.videoId}
    />

  </div>
  );
};

export default MusicPlayer;
