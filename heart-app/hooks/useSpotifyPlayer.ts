import { useEffect, useState } from "react";

declare global {
  interface Window {
    Spotify: any;
  }
}

const useSpotifyPlayer = (token: string | null) => {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: "Meu Player Spotify",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      newPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Player pronto, device_id:", device_id);
      });

      newPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
        console.log("Player não está pronto:", device_id);
      });

      newPlayer.connect();
      setPlayer(newPlayer);
    };
  }, [token]);

  return player;
};

export default useSpotifyPlayer;
