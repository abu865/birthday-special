import { type FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts: FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(current => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100, // Random horizontal position
          delay: 0,
          duration: Math.random() * 10 + 10 // Random duration between 10-20s
        };
        // Keep only recent hearts to prevent memory leak
        return [...current.slice(-20), newHeart];
      });
    }, 2000); // Add new heart every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: -1000 }} // Fallback animation if CSS class fails, but CSS class handles simpler float
        >
          <Heart fill="#ff6b6b" stroke="none" size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
