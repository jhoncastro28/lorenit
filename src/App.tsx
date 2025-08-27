import { useState, useEffect, useRef } from "react";
import "./App.css";

// Componentes
import StartScreen from "./components/StartScreen";
import FloatingHearts from "./components/FloatingHearts";
import ShiningStars from "./components/ShiningStars";
import SpecialMessage from "./components/SpecialMessage";
import MomentCard from "./components/MomentCard";
import AudioControls from "./components/AudioControls";

// Hooks y utilidades
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { launchConfetti } from "./utils/confetti";

// Datos
import { moments } from "./data/moments";

function App() {
  const [started, setStarted] = useState(false);
  const [currentMoment, setCurrentMoment] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [customMessage] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hook personalizado para el reproductor de audio
  const {
    audioRef,
    isMuted,
    isPlaying,
    handleStart,
    toggleMute,
    togglePlayPause,
    getCurrentSongName,
  } = useAudioPlayer(moments, currentMoment, started);

  // Precarga las imágenes para mejorar el rendimiento
  useEffect(() => {
    moments.forEach((moment) => {
      const img = new Image();
      img.src = moment.image;
    });
  }, []);

  // Confeti en el último momento
  useEffect(() => {
    if (currentMoment === moments.length - 1 && started) {
      launchConfetti();
    }
  }, [currentMoment, started]);

  const handleStartApp = () => {
    setStarted(true);
    handleStart();
  };

  const handlePrevious = () => {
    if (currentMoment > 0) {
      setCurrentMoment((prev) => prev - 1);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleNext = () => {
    if (currentMoment < moments.length - 1) {
      setCurrentMoment((prev) => prev + 1);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 100);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col relative overflow-hidden ${started ? moments[currentMoment].color : "bg-pink-50"
        } transition-colors duration-1000`}
    >
      <FloatingHearts />
      {started && <ShiningStars />}

      {/* Reproducción de audio */}
      <audio
        ref={audioRef}
        preload="auto"
        loop={true}
        controls={false}
        style={{ display: "none" }}
      />

      {showMessage && (
        <SpecialMessage onClose={handleCloseMessage} customMessage={customMessage} />
      )}

      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center w-full p-4">
        {!started ? (
          <StartScreen onStart={handleStartApp} />
        ) : (
          <MomentCard
            moment={moments[currentMoment]}
            currentMoment={currentMoment}
            totalMoments={moments.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>

      {/* Controles de audio y mensaje centrados en la parte inferior */}
      {started && (
        <AudioControls
          currentSongName={getCurrentSongName()}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlayPause={togglePlayPause}
          onToggleMute={toggleMute}
          onShowMessage={handleShowMessage}
        />
      )}
    </div>
  );
}

export default App;
