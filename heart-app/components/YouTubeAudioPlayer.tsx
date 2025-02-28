import { useEffect, useState } from "react";

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

  useEffect(() => {
    // Função para inicializar o player quando a API estiver pronta
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
          },
        });

        setPlayer(newPlayer);
      }
    };

    // Verifica se a API do YouTube já foi carregada
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // Callback quando a API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const handlePlay = () => {
    if (player) {
      player.playVideo();
    }
  };

  return (
    <div>
      <div id="youtube-audio" style={{ display: "none" }}></div>
      <button
      type="button"
        onClick={handlePlay}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        ▶️ Play
      </button>
    </div>
  );
}

export default YouTubeAudioPlayer;
