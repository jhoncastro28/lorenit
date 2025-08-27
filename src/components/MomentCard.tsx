import { SkipBack, SkipForward } from "lucide-react";

interface Moment {
  title: string;
  description: string;
  emoji: string;
  color: string;
  quote: string;
  image: string;
  song: string;
}

interface MomentCardProps {
  moment: Moment;
  currentMoment: number;
  totalMoments: number;
  onPrevious: () => void;
  onNext: () => void;
}

const MomentCard = ({
  moment,
  currentMoment,
  totalMoments,
  onPrevious,
  onNext,
}: MomentCardProps) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`bg-gradient-to-br from-white to-${
          moment.color.split("-")[1]
        }-50 p-6 md:p-8 rounded-2xl shadow-2xl transition-all duration-1000 backdrop-blur-sm bg-opacity-95`}
      >
        {/* Indicador de progreso */}
        <div className="mb-6 w-full bg-white bg-opacity-40 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-700"
            style={{
              width: `${((currentMoment + 1) / totalMoments) * 100}%`,
            }}
          ></div>
        </div>

        {/* Contenido del momento */}
        <div className="animate-fadeIn">
          <div className="text-center mb-6">
            <span className="text-5xl mb-3 inline-block">
              {moment.emoji}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 animate-slideIn">
              {moment.title}
            </h2>
            <p className="text-base md:text-lg text-pink-700 leading-relaxed">
              {moment.description}
            </p>
          </div>

          {/* Cita romántica */}
          <div className="bg-white bg-opacity-60 p-4 rounded-xl my-6 text-center italic text-pink-800 border-l-4 border-pink-400">
            {moment.quote}
          </div>

          {/* Imagen mejorada */}
          <div className="bg-white p-1 rounded-lg shadow-lg mx-auto max-w-sm mb-3 rotate-1 hover:rotate-0 transition-all duration-300 animate-float-photo">
            <div className="bg-gradient-to-br from-pink-200 to-purple-100 p-1 rounded">
              <div
                className="rounded flex items-center justify-center bg-white overflow-hidden"
                style={{ minHeight: "200px", maxHeight: "280px" }}
              >
                <img
                  src={moment.image}
                  alt={`Momento: ${moment.title}`}
                  className="rounded w-full max-h-70 object-contain"
                  style={{
                    objectPosition: "center center",
                  }}
                  onError={(e) => {
                    console.error(
                      `Error loading image: ${moment.image}`
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
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onPrevious}
            disabled={currentMoment === 0}
            className={`py-3 px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
              currentMoment === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
            }`}
          >
            <SkipBack size={18} className="mr-2" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <span className="text-pink-800 font-medium bg-white bg-opacity-70 py-2 px-4 rounded-full">
            {currentMoment + 1} / {totalMoments}
          </span>

          <button
            onClick={onNext}
            disabled={currentMoment === totalMoments - 1}
            className={`py-3 px-5 rounded-full font-medium transition-all duration-300 flex items-center ${
              currentMoment === totalMoments - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md"
            }`}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <SkipForward size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MomentCard;
