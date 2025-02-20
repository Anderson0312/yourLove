// src/global.d.ts
declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void; // Defina o tipo como uma função que não recebe parâmetros e não retorna nada
    }
  }
  
  export {}; // Para que o arquivo seja tratado como um módulo
  