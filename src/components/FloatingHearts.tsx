import { Heart } from "lucide-react";

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

export default FloatingHearts;
