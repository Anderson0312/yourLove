import { useEffect } from "react";

// Definição da interface para a API do YouTube
interface YT {
  Player: {
    new (elementId: string, options: YTPlayerOptions): void;
  };
}

// Definição da interface para as opções do player
interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars: {
    autoplay: number;
    controls: number;
    modestbranding: number;
    showinfo: number;
    rel: number;
  };
  events: {
    onReady: (event: { target: { playVideo: () => void } }) => void;
  };
}

// Extensão do tipo de window para incluir a API do YouTube
declare global {
  interface Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function YouTubeAudioPlayer({ videoId }: { videoId: string }) {

  useEffect(() => {
    // Carregar a API do YouTube
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Criar o player quando a API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      new YT.Player("youtube-audio", {
        height: "20",
        width: "20",
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
            event.target.playVideo();
          },
        },
      });
    };
  }, [videoId]);

  return <div id="youtube-audio" style={{ display: "none" }}></div>;
}

export default YouTubeAudioPlayer;
