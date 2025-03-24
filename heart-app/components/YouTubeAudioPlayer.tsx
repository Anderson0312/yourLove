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
          height: "1",
          width: "1",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              setPlayer(event.target);

              // Disparar um clique fantasma para tentar ativar o áudio
              const fakeClick = document.createElement("button");
              fakeClick.style.position = "absolute";
              fakeClick.style.opacity = "0";
              document.body.appendChild(fakeClick);
              fakeClick.click();
              document.body.removeChild(fakeClick);

              // Tentar iniciar o vídeo após um pequeno delay
              setTimeout(() => {
                event.target.playVideo();
              }, 500);
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

    // Método alternativo usando IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && player && !isPlaying) {
          player.playVideo();
        }
      });
    });

    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.position = "absolute";
    hiddenDiv.style.bottom = "-100px";
    document.body.appendChild(hiddenDiv);
    observer.observe(hiddenDiv);

    return () => {
      if (player) {
        player.destroy();
      }
      observer.disconnect();
      document.body.removeChild(hiddenDiv);
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
      <div id="youtube-audio" style={{ position: "absolute", width: "1px", height: "1px" }}></div>
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
