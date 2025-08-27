import { Heart, Camera, Music } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg mx-auto relative z-10 transition-all duration-500 hover:shadow-3xl">
      <div className="animate-heartbeat mb-8">
        <Heart
          className="mx-auto text-pink-500"
          size={100}
          fill="currentColor"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Lore & Jhon
      </h1>
      <p className="text-pink-700 mb-8 text-lg md:text-xl leading-relaxed">
        Un recorrido por los momentos que han construido nuestra historia
        juntos
      </p>
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        <div className="flex items-center text-pink-600 bg-white bg-opacity-60 px-4 py-2 rounded-full">
          <Camera size={20} className="mr-2" />
          <span>Recuerdos</span>
        </div>
        <div className="flex items-center text-pink-600 bg-white bg-opacity-60 px-4 py-2 rounded-full">
          <Music size={20} className="mr-2" />
          <span>Música</span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group text-lg"
      >
        <span className="relative z-10">Comenzar Nuestro Viaje ❤️</span>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      </button>
    </div>
  );
};

export default StartScreen;
