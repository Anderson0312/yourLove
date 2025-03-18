import { useEffect, useState } from "react";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";

// Extensão do tipo de window para incluir a API do YouTube
declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubeAudioPlayerProps {
  videoId: string;
}

function YouTubeAudioPlayer({ videoId }: YouTubeAudioPlayerProps) {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        const newPlayer = new window.YT.Player("youtube-audio", {
          height: "0",
          width: "0",
          videoId: videoId,
          playerVars: {
            autoplay: 0, // Não iniciar automaticamente
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              setPlayer(event.target);
            },
            onStateChange: (event) => {
              if (event.data === window.YT?.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
            },
          },
        });

        setPlayer(newPlayer);
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const togglePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  return (
    <div className="flex">
      <div id="youtube-audio" style={{ display: "none" }}></div>
      <button type="button" onClick={togglePlayPause}>
        {isPlaying ? (
          <PauseCircleIcon className="size-8 text-black hover:text-red-200" />
        ) : (
          <PlayCircleIcon className="size-8 text-black hover:text-red-200" />
        )}
      </button>
    </div>
  );
}

export default YouTubeAudioPlayer;
