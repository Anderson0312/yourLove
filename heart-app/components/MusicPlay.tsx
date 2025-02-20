import useSpotifyPlayer from "@/hooks/useSpotifyPlayer";
import { useState } from "react";


const MusicSearch = ({ token }: { token: string | null }) => {
  const [query, setQuery] = useState("");
  const [musicList, setMusicList] = useState([]);
  const player = useSpotifyPlayer(token); 

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Por favor, digite o nome da música.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();
        const tracks = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          albumImage: track.album.images[0]?.url,
          uri: track.uri,
        }));
        setMusicList(tracks); // Atualiza a lista de músicas encontradas

    } catch (e) {
      console.error("Erro ao buscar músicas: ", e);
    }
  };

  const playTrack = async (uri: string) => {

    if (!player) return;

    try {
      await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ uris: [uri] }),
      });
    } catch (error) {
      console.error("Erro ao tocar a música:", error);
    }
  };

  return (
    <div className="sm:col-span-4">
              <label
                htmlFor="musica"
                className="poppins-thin block text-lg font-bold text-white"
              >
                Selecione uma música
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="musica"
                  name="musica"
                  placeholder="Digite o nome da música"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-red-600 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Buscar
                </button>
              </div>

              {musicList.length > 0 && (
                <div className="mt-4 space-y-3">
                  {musicList.map((music) => (
                    <div
                      key={music.id}
                      className="flex items-center gap-4 bg-gray-700 p-3 rounded-md shadow-md"
                    >
                      <img
                        src={music.albumImage}
                        alt={`Capa do álbum de ${music.name}`}
                        className="w-16 h-16 rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-white text-lg font-semibold">{music.name}</p>
                        <p className="text-gray-300 text-sm">Artista: {music.artist}</p>
                      </div>
                      <button type="button" onClick={() => playTrack(music.uri)} className="px-2 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                        🎵
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
  );
};

export default MusicSearch;
