import { searchYouTubeMusic } from "@/services/api";
import { useEffect, useState } from "react";
import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Ícone de loading
import Image from "next/image";

interface YouTubeMusicSearchProps {
  selectedMusicUser?: { title: string; thumbnail: string; videoId: string } | null;
  onMusicSelect?: (music: { title: string; thumbnail: string; videoId: string }) => void;
}

function YouTubeMusicSearch({ selectedMusicUser, onMusicSelect }: YouTubeMusicSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{ videoId: string; title: string; thumbnail: string }[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<{ videoId: string; title: string; thumbnail: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Atualiza a música selecionada quando `selectedMusicUser` mudar (dados do banco)
  useEffect(() => {
    if (selectedMusicUser) {
      setSelectedMusic(selectedMusicUser);
    }
  }, [selectedMusicUser]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]); // Limpa os resultados se o campo estiver vazio
      return;
    }

    setIsSearching(true);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      const results = await searchYouTubeMusic(searchTerm);
      setSearchResults(results);
      setIsSearching(false);
    }, 500); // Espera 500ms após a última tecla antes de buscar

    setTypingTimeout(timeout);
  }, [searchTerm]);

  function handleSelectMusic(music: { videoId: string; title: string; thumbnail: string }) {
    setSelectedMusic(music);
    setSearchResults([]); // Limpa os resultados após seleção
    onMusicSelect?.(music);
  }

  return (
    <div>
      <label htmlFor="music-search" className="poppins-thin block text-lg font-bold text-white mb-2">
        Selecione a música
      </label>
      <div className="relative flex gap-2">
        <input
          id="music-search"
          type="text"
          placeholder="Buscar música..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-md bg-transparent border px-3 py-1.5 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
        />
        {isSearching && (
          <AiOutlineLoading3Quarters className="absolute top-2 right-3  animate-spin text-gray-400" size={20} />
        )}
      </div>

      {/* Lista de resultados */}
      {searchResults.length > 0 && (
        <ul className="mt-4 space-y-2">
          {searchResults.map((result) => (
            <li
              key={result.videoId}
              onClick={() => handleSelectMusic(result)}
              className="flex items-center gap-3 p-2 bg-transparent border rounded-md cursor-pointer hover:bg-gray-600"
            >
              <Image width={48} height={48} src={result.thumbnail} alt={result.title} className="w-12 h-12 rounded" />
              <span className="text-white">{result.title}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Música selecionada */}
      {selectedMusic && selectedMusic.videoId && (
        <div className="mt-4 p-4 bg-transparent border rounded-md flex items-center gap-3 justify-between">
          <div className="flex justify-between items-center gap-3">
            <Image width={48} height={48} src={selectedMusic.thumbnail} alt={selectedMusic.title} className="w-12 h-12 rounded" />
            <span className="text-white">{selectedMusic.title}</span>
          </div>
          {selectedMusic.videoId && <YouTubeAudioPlayer videoId={selectedMusic.videoId} />}
        </div>
      )}
    </div>
  );
}

export default YouTubeMusicSearch;
