import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Music,
  Gift,
  Camera,
  Star,
  MessageSquareHeart,
  X,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";
import "./App.css"; // Asegúrate de que este archivo existe

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
      image: "./assets/photos/aeropuerto.jpeg",
      song: "./assets/songs/Selena Gomez, benny blanco - Scared of Loving You.mp3",
    },
    {
      title: "Nuestras primeras llamadas",
      description: "Tan nerviosos y torpes, emociones a rebosar",
      emoji: "📞",
      color: "bg-purple-100",
      quote: "«Una historia particular, pero la más hermosa»",
      image: "./assets/photos/loreAntes.jpeg",
      song: "./assets/songs/The Beatles - Something.mp3",
    },
    {
      title: "El primer beso",
      description:
        "No es la mejor foto jajaja. En el Aeropuerto, esa primera mirada. Yo siempre tan torpe, Lore siempre tan radiante y dulce",
      emoji: "💋",
      color: "bg-blue-100",
      quote: "«Un beso lleno de sacrificio y unión»",
      image: "/assets/photos/besoPlanetario.jpeg",
      song: "/assets/songs/One Direction - Fireproof.mp3",
    },
    {
      title: "Nuestra primera salida juntos",
      description:
        "Un lugar nuevo, completamente diferente. Yo completamente admirado por todo lo que veía, pero más aún por ti",
      emoji: "🧳",
      color: "bg-green-100",
      quote: "«No importa el destino o el contexto, siempre tú»",
      image: "/assets/photos/primerViaje.jpeg",
      song: "/assets/songs/Benjamín Amadeo - Para Siempre.mp3",
    },
    {
      title: "Frente al Planetario",
      description:
        "En aquel momento, parsimonioso, pero tan fuerte e impactante. Supe más que nunca que daría lo que fuera",
      emoji: "💭",
      color: "bg-yellow-100",
      quote: "«La simpleza contiene los momentos más memorables»",
      image: "/assets/photos/obelisco.jpeg",
      song: "/assets/songs/million little reasons.mp3",
    },
    {
      title: "Las noches juntos",
      description:
        "Risas, lágrimas, sueños y anhelos compartidos. Pero cada una de ellas tan vivas y cálidas, como de toda la vida",
      emoji: "🌙",
      color: "bg-red-100",
      quote: "«No cuento los días, cuento los momentos y risas a tu lado»",
      image: "/assets/photos/lenguaAfuera.jpeg",
      song: "/assets/songs/Mac Miller - Surf.mp3",
    },
    {
      title: "Los detalles y gestos siempre desinteresados",
      description:
        "Siempre tan generosa y dulce. Siempre atenta, siempre pensando en mí. Siempre mi Lore",
      emoji: "🎁",
      color: "bg-indigo-100",
      quote: "«No se le puede mentir a lo que brota del corazón»",
      image: "/assets/photos/camiseta.jpeg",
      song: "/assets/songs/You And Me.mp3",
    },
    {
      title:
        "Tantos momentos difíciles, pero encontrando la luz, siempre encontrándonos a nosotros",
      description:
        "Tu apoyo ha significado todo para mí. Gracias por estar siempre, escucharme y soportar mi mal carácter y torpeza",
      emoji: "🤝",
      color: "bg-teal-100",
      quote: "«Las pruebas de fuego son las que realmente dictaminan. Juntos»",
      image: "/assets/photos/gafasSombrero.jpeg",
      song: "/assets/songs/Abel Pintos - No Me Olvides.mp3",
    },
    {
      title: "Los apodos, nuestros chistes, anécdotas y recuerdos",
      description:
        "Esos pequeños rituales que hemos creado y que hacen especial nuestra relación cada día el viento jamás los contará porque estarán aquí por siempre",
      emoji: "🌟",
      color: "bg-orange-100",
      quote: "«La belleza en la cotidianidad»",
      image: "/assets/photos/arrunchaos.jpeg",
      song: "/assets/songs/Harry Styles - Love Of My Life.mp3",
    },
    {
      title: "Hoy",
      description:
        "Después de todo este tiempo, a pesar de las dudas y los miedos. Esto es solo el comienzo.",
      emoji: "❤️",
      color: "bg-pink-100",
      quote:
        "«Te amo por todo lo que eres, todo lo que significas, todo lo que haces y todo lo que quieres»",
      image: "/assets/photos/snoopy.jpeg",
      song: "/assets/songs/Good Old-Fashioned Lover Boy.mp3",
    },
  ];

  // Función para cargar la canción actual
  const loadCurrentSong = () => {
    if (audioRef.current && started) {
      audioRef.current.src = moments[currentMoment].song;
      audioRef.current.load();
      if (!isMuted) {
        audioRef.current.play().catch((error) => {
          console.error("Error al reproducir audio:", error);
        });
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
          console.error("Error al reproducir audio:", error);
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

  const handleStart = () => {
    setStarted(true);
  };

  const handleNext = () => {
    if (currentMoment < moments.length - 1) {
      setCurrentMoment((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMoment > 0) {
      setCurrentMoment((prev) => prev - 1);
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

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.fontSize = Math.random() * 20 + 10 + "px";
        confetti.style.userSelect = "none";
        confetti.textContent =
          emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.animation = `fall ${
          Math.random() * 3 + 2
        }s linear forwards`;
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, Math.random() * 2000);
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 7000);
  };

  // Corazones flotantes
  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 15}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.2 + Math.random() * 0.5,
              transform: `scale(${0.3 + Math.random() * 1.2})`,
            }}
          >
            <Heart
              className={`${
                i % 3 === 0
                  ? "text-pink-500"
                  : i % 3 === 1
                  ? "text-red-400"
                  : "text-purple-400"
              }`}
              size={i % 5 === 0 ? 32 : 24}
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${1 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star
              className="text-yellow-300"
              size={i % 3 === 0 ? 16 : 12}
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
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
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

  // Mostrar información de la canción que está sonando
  const SongInfo = () => {
    if (!started || !moments[currentMoment].song) return null;

    const songName = moments[currentMoment].song
      .split("/")
      .pop()
      ?.replace(".mp3", "");

    return (
      <div className="fixed bottom-4 right-4 bg-white bg-opacity-50 py-2 px-4 rounded-full shadow-md z-40 backdrop-blur-sm flex items-center">
        <Music size={16} className="text-pink-700 mr-2" />
        <span className="text-sm text-pink-800 font-medium truncate max-w-xs">
          {songName}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        started ? moments[currentMoment].color : "bg-pink-50"
      } transition-colors duration-1000`}
    >
      <FloatingHearts />
      {started && <ShiningStars />}

      {/* Reproducción de audio */}
      <audio ref={audioRef} />

      {/* Controles de audio */}
      {started && (
        <div className="fixed top-4 right-4 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full z-40 flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="transition-all duration-300"
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

      {/* Botón de mensaje especial */}
      {started && (
        <button
          onClick={handleShowMessage}
          className="fixed top-4 left-4 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full z-40 transition-all duration-300"
          title="Ver mensaje especial"
        >
          <MessageSquareHeart size={20} className="text-pink-700" />
        </button>
      )}

      {/* Mostrar información de la canción */}
      <SongInfo />

      {showMessage && <SpecialMessage />}

      {!started ? (
        // Portada inicial
        <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 p-10 rounded-lg shadow-xl max-w-md mx-4 relative z-10 transition-all duration-500 hover:shadow-2xl">
          <div className="animate-heartbeat mb-6">
            <Heart
              className="mx-auto text-pink-500"
              size={80}
              fill="currentColor"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nuestra Historia de Amor
          </h1>
          <p className="text-pink-700 mb-8 text-lg">
            Un recorrido por los momentos que han construido nuestra historia
            juntos
          </p>
          <div className="flex justify-center mb-6 space-x-4">
            <div className="flex items-center text-pink-600">
              <Camera size={18} className="mr-1" />
              <span>Recuerdos</span>
            </div>
            <div className="flex items-center text-pink-600">
              <Music size={18} className="mr-1" />
              <span>Música</span>
            </div>
            <div className="flex items-center text-pink-600">
              <Gift size={18} className="mr-1" />
              <span>Sorpresas</span>
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
          className={`w-full max-w-2xl mx-4 p-8 rounded-lg shadow-2xl transition-all duration-1000 bg-gradient-to-br from-${
            moments[currentMoment].color.split("-")[1]
          } to-${
            moments[currentMoment].color.split("-")[1]
          }-50 backdrop-blur-sm bg-opacity-90`}
        >
          <div className="relative overflow-hidden">
            {/* Indicador de progreso */}
            <div className="mb-6 w-full bg-white bg-opacity-40 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-700 animate-reveal"
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
                <h2 className="text-3xl font-bold text-pink-800 mb-3 animate-slideIn">
                  {moments[currentMoment].title}
                </h2>
                <p className="text-lg text-pink-700">
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
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={moments[currentMoment].image}
                      alt={`Momento: ${moments[currentMoment].title}`}
                      className="max-h-64 rounded object-cover transform hover:scale-105 transition-transform duration-700"
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
                className={`py-2 px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
                  currentMoment === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
                }`}
              >
                <SkipBack size={16} className="mr-1" />
                Anterior
              </button>

              <span className="text-pink-800 font-medium bg-white bg-opacity-50 py-2 px-4 rounded-full">
                {currentMoment + 1} / {moments.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentMoment === moments.length - 1}
                className={`py-2 px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
                  currentMoment === moments.length - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
                }`}
              >
                Siguiente
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
  );
}

export default App;
