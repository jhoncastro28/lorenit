import { Music, MessageSquareHeart, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AudioControlsProps {
  currentSongName: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlayPause: () => void;
  onToggleMute: () => void;
  onShowMessage: () => void;
}

const AudioControls = ({
  currentSongName,
  isPlaying,
  isMuted,
  onTogglePlayPause,
  onToggleMute,
  onShowMessage,
}: AudioControlsProps) => {
  return (
    <div className="w-full bg-white bg-opacity-90 backdrop-blur-sm border-t border-pink-200 p-4">
      <div className="max-w-lg mx-auto">
        {/* Información de la canción */}
        {currentSongName && (
          <div className="flex items-center justify-center mb-3">
            <Music size={18} className="text-pink-600 mr-2 flex-shrink-0" />
            <span className="text-sm text-pink-800 font-medium truncate">
              {currentSongName}
            </span>
          </div>
        )}

        {/* Controles centrados */}
        <div className="flex items-center justify-center gap-4">
          {/* Botón de mensaje especial */}
          <button
            onClick={onShowMessage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-125 animate-bounce relative overflow-hidden"
            title="💌 Ver mensaje especial"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 opacity-0 animate-pulse"></span>
            <MessageSquareHeart
              size={28}
              className="relative z-10 animate-heartbeat"
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Control de reproducción/pausa */}
          <button
            onClick={onTogglePlayPause}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            title={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Control de volumen */}
          <button
            onClick={onToggleMute}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
