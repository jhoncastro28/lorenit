import { useState, useEffect, useRef } from "react";

interface Moment {
  title: string;
  description: string;
  emoji: string;
  color: string;
  quote: string;
  image: string;
  song: string;
}

export const useAudioPlayer = (moments: Moment[], currentMoment: number, started: boolean) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songNames = [
    "Louis Tomlinson - Silver Tongues",
    "The Beatles - Something",
    "One Direction - Fireproof",
    "Benjamin Amadeo - Para Siempre",
    "Oscar Lang - Million Little Reasons",
    "Mac Miller - Surf",
    "Niall Horan - You And Me",
    "Abel Pintos - No Me Olvides",
    "Harry Styles - Love Of My Life",
    "Queen - Good Old-Fashioned Lover Boy",
  ];

  // Función para cargar la canción actual
  const loadCurrentSong = () => {
    if (audioRef.current && started) {
      try {
        audioRef.current.src = moments[currentMoment].song;
        audioRef.current.load();
        audioRef.current.volume = 0.7;
        audioRef.current.muted = isMuted;
        audioRef.current.loop = true;

        // Reproducir automáticamente sin mostrar botones
        if (!isMuted) {
          setTimeout(() => {
            audioRef.current
              ?.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log("Reproducción automática bloqueada:", error);
                setIsPlaying(false);
              });
          }, 300);
        }
      } catch (error) {
        console.error("Error al cargar el audio:", error);
      }
    }
  };

  // Iniciar o detener la música según el estado
  useEffect(() => {
    if (started && audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Audio bloqueado, continuando sin música:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [started, isMuted]);

  // Cargar nueva canción cuando cambia el momento
  useEffect(() => {
    loadCurrentSong();
  }, [currentMoment]);

  // Agregar listener para activar audio en interacción del usuario
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !isMuted) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Error al reproducir audio:", error);
          });
      }
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [isMuted]);

  const handleStart = () => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = moments[0].song;
        audioRef.current.load();
        audioRef.current.volume = 0.7;
        audioRef.current.loop = true;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Reproducción inicial bloqueada:", error);
            setIsPlaying(false);
          });
      }
    }, 100);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  const getCurrentSongName = () => {
    if (!started) return null;
    return songNames[currentMoment] || null;
  };

  return {
    audioRef,
    isMuted,
    isPlaying,
    handleStart,
    toggleMute,
    togglePlayPause,
    getCurrentSongName,
  };
};
