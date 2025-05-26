import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Music,
  Camera,
  Star,
  MessageSquareHeart,
  X,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";
import "./App.css";

// Todas las imágenes
import aeropuerto from "./assets/photos/aeropuerto.jpeg";
import loreAntes from "./assets/photos/loreAntes.jpeg";
import besoPlanetario from "./assets/photos/besoPlanetario.jpeg";
import primerViaje from "./assets/photos/primerViaje.jpeg";
import obelisco from "./assets/photos/obelisco.jpeg";
import lenguaAfuera from "./assets/photos/lenguaAfuera.jpeg";
import camiseta from "./assets/photos/camiseta.jpeg";
import gafasSombrero from "./assets/photos/gafasSombrero.jpeg";
import arrunchaos from "./assets/photos/arrunchaos.jpeg";
import snoopy from "./assets/photos/snoopy.jpeg";

// Todas las canciones
import selenaGomez from "./assets/songs/Selena Gomez, benny blanco - Scared of Loving You.mp3";
import theBeatles from "./assets/songs/The Beatles - Something.mp3";
import oneDirection from "./assets/songs/One Direction - Fireproof.mp3";
import benjaminAmadeo from "./assets/songs/Benjamin Amadeo - Para Siempre.mp3";
import millionLittleReasons from "./assets/songs/million little reasons - Oscar Lang.mp3";
import macMiller from "./assets/songs/Mac Miller - Surf.mp3";
import youAndMe from "./assets/songs/You And Me - Niall Horan.mp3";
import abelPintos from "./assets/songs/Abel Pintos - No Me Olvides.mp3";
import harryStyles from "./assets/songs/Harry Styles - Love Of My Life.mp3";
import goodOldFashioned from "./assets/songs/Good Old-Fashioned Lover Boy.mp3";

function App() {
  const [started, setStarted] = useState(false);
  const [currentMoment, setCurrentMoment] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const moments = [
    {
      title: "Cuando nos conocimos",
      description:
        "Ese día tan gris, sombrío, frío y lluvioso se convirtió en el más cálido de todos",
      emoji: "✨",
      color: "bg-pink-100",
      quote: "«Una vibra indescriptible»",
      image: loreAntes,
      song: selenaGomez,
    },
    {
      title: "Nuestras primeras llamadas",
      description: "Tan nerviosos y torpes, emociones a rebosar",
      emoji: "📞",
      color: "bg-purple-100",
      quote: "«Una historia particular, pero la más hermosa»",
      image: lenguaAfuera,
      song: theBeatles,
    },
    {
      title: "El primer beso",
      description:
        "No es la mejor foto jajaja. En el Aeropuerto, esa primera mirada. Yo siempre tan torpe, Lore siempre tan radiante y dulce",
      emoji: "💋",
      color: "bg-blue-100",
      quote: "«Un beso lleno de sacrificio y unión»",
      image: aeropuerto,
      song: oneDirection,
    },
    {
      title: "Nuestra primera salida juntos",
      description:
        "Un lugar nuevo, completamente diferente. Yo completamente admirado por todo lo que veía, pero más aún por ti",
      emoji: "🧳",
      color: "bg-green-100",
      quote: "«No importa el destino o el contexto, siempre tú»",
      image: primerViaje,
      song: benjaminAmadeo,
    },
    {
      title: "Frente al Planetario",
      description:
        "En aquel momento, parsimonioso, pero tan fuerte e impactante. Supe más que nunca que daría lo que fuera",
      emoji: "💭",
      color: "bg-yellow-100",
      quote: "«La simpleza contiene los momentos más memorables»",
      image: besoPlanetario,
      song: millionLittleReasons,
    },
    {
      title: "Las noches juntos",
      description:
        "Risas, lágrimas, sueños y anhelos compartidos. Pero cada una de ellas tan vivas y cálidas, como de toda la vida",
      emoji: "🌙",
      color: "bg-red-100",
      quote: "«No cuento los días, cuento los momentos y risas a tu lado»",
      image: arrunchaos,
      song: macMiller,
    },
    {
      title: "Los detalles y gestos siempre desinteresados",
      description:
        "Siempre tan generosa y dulce. Siempre atenta, siempre pensando en mí. Siempre mi Lore",
      emoji: "🎁",
      color: "bg-indigo-100",
      quote: "«No se le puede mentir a lo que brota del corazón»",
      image: camiseta,
      song: youAndMe,
    },
    {
      title:
        "Tantos momentos difíciles, pero encontrando la luz, siempre encontrándonos a nosotros",
      description:
        "Tu apoyo ha significado todo para mí. Gracias por estar siempre, escucharme y soportar mi mal carácter y torpeza",
      emoji: "🤝",
      color: "bg-teal-100",
      quote: "«Las pruebas de fuego son las que realmente dictaminan. Juntos»",
      image: gafasSombrero,
      song: abelPintos,
    },
    {
      title: "Los apodos, nuestros chistes, anécdotas y recuerdos",
      description:
        "Esos pequeños rituales que hemos creado y que hacen especial nuestra relación cada día el viento jamás los contará porque estarán aquí por siempre",
      emoji: "🌟",
      color: "bg-orange-100",
      quote: "«La belleza en la cotidianidad»",
      image: obelisco,
      song: harryStyles,
    },
    {
      title: "Hoy",
      description:
        "Después de todo este tiempo, a pesar de las dudas y los miedos. Esto es solo el comienzo.",
      emoji: "❤️",
      color: "bg-pink-100",
      quote:
        "«Te amo por todo lo que eres, todo lo que significas, todo lo que haces y todo lo que quieres»",
      image: snoopy,
      song: goodOldFashioned,
    },
  ];

  // Precarga las imágenes para mejorar el rendimiento
  useEffect(() => {
    moments.forEach((moment) => {
      const img = new Image();
      img.src = moment.image;
    });
  }, []);

  // Función para cargar la canción actual
  const loadCurrentSong = () => {
    if (audioRef.current && started) {
      try {
        audioRef.current.src = moments[currentMoment].song;
        audioRef.current.load();
        audioRef.current.volume = 0.7;
        audioRef.current.muted = isMuted;

        // Reproducir automáticamente sin mostrar botones
        if (!isMuted) {
          setTimeout(() => {
            audioRef.current?.play().catch((error) => {
              console.log("Reproducción automática bloqueada:", error);
              // Silenciosamente manejar el error sin mostrar botones
              setIsMuted(true);
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
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio bloqueado, continuando sin música:", error);
          setIsMuted(true);
        });
      }
    }
  }, [started, isMuted]);

  // Cargar nueva canción cuando cambia el momento
  useEffect(() => {
    loadCurrentSong();
  }, [currentMoment]);

  // Pasar al siguiente momento cuando termina la canción
  useEffect(() => {
    if (audioRef.current && started) {
      const handleSongEnd = () => {
        if (currentMoment < moments.length - 1) {
          setCurrentMoment((prev) => prev + 1);
        }
      };

      audioRef.current.addEventListener("ended", handleSongEnd);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleSongEnd);
        }
      };
    }
  }, [audioRef, currentMoment, moments.length, started]);

  // Confeti en el último momento
  useEffect(() => {
    if (currentMoment === moments.length - 1 && started) {
      launchConfetti();
    }
  }, [currentMoment, started, moments.length]);

  // Agregar listener para activar audio en interacción del usuario
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !isMuted) {
        audioRef.current.play().catch((error) => {
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
    setStarted(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = moments[0].song;
        audioRef.current.load();
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch((error) => {
          console.log("Reproducción inicial bloqueada:", error);
          setIsMuted(true);
        });
      }
    }, 100);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
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

  const launchConfetti = () => {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "999";
    document.body.appendChild(confettiContainer);

    const emojis = ["❤️", "💖", "💕", "💓", "💗", "💞", "💘", "💝", "✨", "🎉"];

    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.fontSize = Math.random() * 24 + 12 + "px";
        confetti.style.userSelect = "none";
        confetti.style.zIndex = "1000";
        confetti.textContent =
          emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.animation = `fall ${
          Math.random() * 3 + 3
        }s linear forwards`;
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 6000);
      }, Math.random() * 2500);
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 8500);
  };

  // Corazones flotantes
  const FloatingHearts = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="fixed animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.5 + Math.random() * 0.3,
              transform: `scale(${0.4 + Math.random() * 0.6})`,
            }}
          >
            <Heart
              className={`${
                i % 3 === 0
                  ? "text-pink-600"
                  : i % 3 === 1
                  ? "text-red-500"
                  : "text-purple-500"
              }`}
              size={i % 5 === 0 ? 30 : 22}
              fill="currentColor"
            />
          </div>
        ))}
      </div>
    );
  };

  // Estrellas brillantes
  const ShiningStars = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="fixed animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${1.5 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.7,
            }}
          >
            <Star
              className="text-yellow-400"
              size={i % 3 === 0 ? 18 : 14}
              fill="currentColor"
            />
          </div>
        ))}
      </div>
    );
  };

  // Mensaje personalizado
  const SpecialMessage = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn overflow-auto">
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-lg shadow-xl max-w-md w-full relative">
          <button
            onClick={handleCloseMessage}
            className="absolute top-2 right-2 text-pink-800 hover:text-pink-900"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-4">
            <MessageSquareHeart className="mx-auto text-pink-600" size={48} />
            <h3 className="text-2xl font-bold text-pink-800 mt-2">
              Mi mensaje especial para ti
            </h3>
          </div>

          <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-inner mb-4">
            <p className="text-pink-900 italic text-lg leading-relaxed">
              {customMessage ||
                "Cuando la noche es más oscura, es porque está a punto de amanecer. Te amaré por siempre, oasis, golpe de suerte. María Bonita"}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="animate-pulse-slow">
              <Heart className="text-red-500" size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Obtener nombre de la canción para mostrar en la sección fija
  const getCurrentSongName = () => {
    if (!started || !moments[currentMoment].song) return null;

    return moments[currentMoment].song
      .split("/")
      .pop()
      ?.replace(".mp3", "")
      .replace(/%20/g, " ");
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden ${
        started ? moments[currentMoment].color : "bg-pink-50"
      } transition-colors duration-1000`}
    >
      <FloatingHearts />
      {started && <ShiningStars />}

      {/* Reproducción de audio */}
      <audio
        ref={audioRef}
        preload="auto"
        loop={false}
        controls={false}
        style={{ display: "none" }}
      />

      {/* Controles de audio y mensaje en esquina superior */}
      {started && (
        <div className="fixed top-4 right-4 flex items-center space-x-2 z-40">
          {/* Botón de mensaje especial */}
          <button
            onClick={handleShowMessage}
            className="bg-white bg-opacity-70 hover:bg-opacity-90 p-3 rounded-full transition-all duration-300 shadow-lg"
            title="Ver mensaje especial"
          >
            <MessageSquareHeart size={20} className="text-pink-700" />
          </button>

          {/* Control de audio */}
          <button
            onClick={toggleMute}
            className="bg-white bg-opacity-70 hover:bg-opacity-90 p-3 rounded-full transition-all duration-300 shadow-lg"
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-pink-700" />
            ) : (
              <Volume2 size={20} className="text-pink-700" />
            )}
          </button>
        </div>
      )}

      {showMessage && <SpecialMessage />}

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center w-full">
        {!started ? (
          // Portada inicial
          <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 p-6 md:p-10 rounded-lg shadow-xl max-w-md mx-4 relative z-10 transition-all duration-500 hover:shadow-2xl">
            <div className="animate-heartbeat mb-6">
              <Heart
                className="mx-auto text-pink-500"
                size={80}
                fill="currentColor"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Lore & Jhon
            </h1>
            <p className="text-pink-700 mb-8 text-lg">
              Un recorrido por los momentos que han construido nuestra historia
              juntos
            </p>
            <div className="flex flex-wrap justify-center mb-6 space-x-2 md:space-x-4">
              <div className="flex items-center text-pink-600 mb-2 md:mb-0">
                <Camera size={18} className="mr-1" />
                <span>Recuerdos</span>
              </div>
              <div className="flex items-center text-pink-600 mb-2 md:mb-0">
                <Music size={18} className="mr-1" />
                <span>Música</span>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="relative z-10">Comenzar Nuestro Viaje ❤️</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </div>
        ) : (
          // Visualización de momentos
          <div
            className={`w-full max-w-md md:max-w-2xl mx-auto p-3 md:p-6 lg:p-8 rounded-lg shadow-2xl transition-all duration-1000 bg-gradient-to-br from-${
              moments[currentMoment].color.split("-")[1]
            } to-${
              moments[currentMoment].color.split("-")[1]
            }-50 backdrop-blur-sm bg-opacity-90`}
            style={{ margin: "0 16px" }}
          >
            <div className="relative overflow-hidden">
              {/* Indicador de progreso */}
              <div className="mb-6 w-full bg-white bg-opacity-40 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-700"
                  style={{
                    width: `${((currentMoment + 1) / moments.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Contenido del momento */}
              <div className="animate-fadeIn">
                <div className="text-center mb-8">
                  <span className="text-4xl mb-2 inline-block">
                    {moments[currentMoment].emoji}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-3 animate-slideIn">
                    {moments[currentMoment].title}
                  </h2>
                  <p className="text-base md:text-lg text-pink-700">
                    {moments[currentMoment].description}
                  </p>
                </div>

                {/* Cita romántica */}
                <div className="bg-white bg-opacity-50 p-4 rounded-lg my-6 text-center italic text-pink-800">
                  {moments[currentMoment].quote}
                </div>

                {/* Imagen con marco más bonito */}
                <div className="bg-white p-3 rounded-lg shadow-lg mx-auto max-w-sm mb-6 rotate-1 hover:rotate-0 transition-all duration-300 animate-float-photo">
                  <div className="bg-gradient-to-br from-pink-200 to-purple-100 p-1 rounded">
                    <div
                      className="rounded flex items-center justify-center overflow-hidden"
                      style={{ minHeight: "200px", maxHeight: "280px" }}
                    >
                      <img
                        src={moments[currentMoment].image}
                        alt={`Momento: ${moments[currentMoment].title}`}
                        className="rounded object-cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          console.error(
                            `Error loading image: ${moments[currentMoment].image}`
                          );
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/400x300?text=Imagen+no+disponible";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles de navegación */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentMoment === 0}
                  className={`py-2 px-3 md:px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
                    currentMoment === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
                  }`}
                >
                  <SkipBack size={16} className="mr-1" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <span className="text-pink-800 font-medium bg-white bg-opacity-50 py-2 px-4 rounded-full">
                  {currentMoment + 1} / {moments.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentMoment === moments.length - 1}
                  className={`py-2 px-3 md:px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
                    currentMoment === moments.length - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
                  }`}
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <SkipForward size={16} className="ml-1" />
                </button>
              </div>

              {/* Personalización del mensaje - aparece solo en el último momento */}
              {currentMoment === moments.length - 1 && (
                <div className="mt-8 bg-white bg-opacity-60 p-4 rounded-lg animate-fadeIn">
                  <h3 className="text-xl font-bold text-pink-700 mb-2">
                    ¿Quieres personalizar tu mensaje?
                  </h3>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Escribe aquí tu mensaje personalizado de amor..."
                    className="w-full p-3 rounded border border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-300 text-pink-900"
                    rows={4}
                  />
                  <button
                    onClick={handleShowMessage}
                    className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300"
                  >
                    Ver mensaje especial
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Información de la canción en sección fija (solo cuando está iniciado) */}
      {started && getCurrentSongName() && (
        <div className="w-full bg-white bg-opacity-80 backdrop-blur-sm border-t border-pink-200 p-3 flex items-center justify-center">
          <div className="flex items-center max-w-md">
            <Music size={16} className="text-pink-600 mr-2 flex-shrink-0" />
            <span className="text-sm text-pink-800 font-medium truncate">
              {getCurrentSongName()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
