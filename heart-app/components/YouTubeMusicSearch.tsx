import { searchYouTubeMusic } from "@/services/api";
import { useEffect, useState } from "react";
import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import Image from "next/image";

interface YouTubeMusicSearchProps {
  selectedMusicUser: { title: string; thumbnail: string; videoId: string } | null;
  onMusicSelect: (music: { title: string; thumbnail: string; videoId: string }) => void;
}

function YouTubeMusicSearch({ selectedMusicUser, onMusicSelect }: YouTubeMusicSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<{ videoId: string; title: string; thumbnail: string }[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<{ videoId: string; title: string; thumbnail: string } | null>(null);

      // Quando `selectedMusicUser` mudar (vindo do banco), atualiza `selectedMusic`
      useEffect(() => {
        if (selectedMusicUser) {
          setSelectedMusic(selectedMusicUser);
        }
      }, [selectedMusicUser]);

  
    async function handleSearch() {
      if (!searchTerm.trim()) return; // Evita busca vazia
  
      const results = await searchYouTubeMusic(searchTerm);
      setSearchResults(results);
    }

    function handleSelectMusic(music: { videoId: string; title: string; thumbnail: string }) {
        setSelectedMusic(music);
        setSearchResults([]); // Limpa os resultados da busca
        onMusicSelect(music);
    }

  
    return (
      <div className="">
        <label htmlFor="about" className="poppins-thin block text-lg font-bold text-withe mb-2">
                  Selecione a música
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar música..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md bg-transparent border px-3 py-1.5 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
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
          <ul className="mt-4 space-y-2" >
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
         {selectedMusic && selectedMusic.videoId ? (
          <div className="mt-4 p-4 bg-gray-800 rounded-md flex items-center gap-3 justify-between">
            <div className="flex justify-between items-center gap-3">
              <Image
                width={12}
                height={12}
                src={selectedMusic.thumbnail}
                alt={selectedMusic.title}
                className="w-12 h-12 rounded"
              />
              <span className="text-white">{selectedMusic.title}</span>
            </div>
            {selectedMusic.videoId && <YouTubeAudioPlayer videoId={selectedMusic.videoId} />}
          </div>
        ) : null}
  
        
      </div>
    );
  }
  
  export default YouTubeMusicSearch;