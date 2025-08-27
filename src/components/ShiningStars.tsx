import { Star } from "lucide-react";

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

export default ShiningStars;
