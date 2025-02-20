import { searchYouTubeMusic } from "@/services/api";
import { useState } from "react";
import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import Image from "next/image";

function YouTubeMusicSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [videoId, setVideoId] = useState("");
    const [searchResults, setSearchResults] = useState<{ videoId: string; title: string; thumbnail: string }[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<{ videoId: string; title: string; thumbnail: string } | null>(null);

  
    async function handleSearch() {
      if (!searchTerm.trim()) return; // Evita busca vazia
  
      const results = await searchYouTubeMusic(searchTerm);
      setSearchResults(results);
    }

    function handleSelectMusic(music: { videoId: string; title: string; thumbnail: string }) {
        setVideoId(music.videoId);
        setSelectedMusic(music);
        setSearchResults([]); // Limpa os resultados da busca
    }

    function handlePlayMusic() {
        if (selectedMusic) {
            setVideoId(selectedMusic.videoId); // Reproduz a música selecionada novamente
        }
    }

  
    return (
      <div className="">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar música..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Buscar
          </button>
        </div>
  
        {/* Lista de resultados */}
        {searchResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {searchResults.map((result) => (
              <li
                key={result.videoId}
                onClick={() => handleSelectMusic(result)}
                className="flex items-center gap-3 p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
              >
                <Image width={12} height={12} src={result.thumbnail} alt={result.title} className="w-12 h-12 rounded" />
                <span className="text-white">{result.title}</span>
              </li>
            ))}
          </ul>
        )}

         {/* Música selecionada */}
         {selectedMusic && (
                <div className="mt-4 p-4 bg-gray-800 rounded-md flex items-center gap-3">
                    <Image width={12} height={12} src={selectedMusic.thumbnail} alt={selectedMusic.title} className="w-12 h-12 rounded" />
                    <span className="text-white">{selectedMusic.title}</span>
                    <button
                    type="button"
                        onClick={handlePlayMusic}
                        className="ml-auto flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600"
                    >
                        {/* SVG de Play */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.397-3.21A1 1 0 007 9.428v5.144a1 1 0 001.355.932l5.397-3.21a1 1 0 000-1.732z" />
                        </svg>
                    </button>
                </div>
            )}
  
        {/* Player */}
        {videoId && <YouTubeAudioPlayer videoId={videoId} />}
      </div>
    );
  }
  
  export default YouTubeMusicSearch;