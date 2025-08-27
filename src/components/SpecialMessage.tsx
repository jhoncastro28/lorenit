import { X, MessageSquareHeart, Heart } from "lucide-react";

interface SpecialMessageProps {
  onClose: () => void;
  customMessage?: string;
}

const SpecialMessage = ({ onClose, customMessage }: SpecialMessageProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn overflow-auto">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
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

export default SpecialMessage;
