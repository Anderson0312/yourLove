'use client'
import { useEffect } from 'react';
import YouTubeAudioPlayer from './YouTubeAudioPlayer';
/* eslint-disable @typescript-eslint/no-unused-vars */

interface MusicPlayerProps {
  selectedMusicUser: { videoId: string };
}

const MusicPlayerNetflix = ({ selectedMusicUser }: MusicPlayerProps) => {
  useEffect(() => {
    console.log('MusicPlayer = ' + selectedMusicUser.videoId)
  }, [selectedMusicUser]);

  return (

    <YouTubeAudioPlayer 
      videoId={selectedMusicUser.videoId}
    />

  );
};

export default MusicPlayerNetflix;
