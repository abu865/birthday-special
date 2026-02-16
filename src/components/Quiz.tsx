import { type FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertTriangle } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: FC<QuizProps> = ({ onComplete }) => {
  const [measuring, setMeasuring] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (measuring) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 120) {
            clearInterval(interval);
            setTimeout(onComplete, 2000); // Wait a bit before completing
            return 120;
          }
          // Accelerate as it gets higher for effect
          const increment = prev > 80 ? 2 : 1; 
          return prev + increment;
        });
      }, 30); // Speed of the counter

      return () => clearInterval(interval);
    }
  }, [measuring, onComplete]);

  const handleUnlock = () => {
    setMeasuring(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        background: 'rgba(0,0,0,0.9)', // Slightly darker for focus
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50
      }}
    >
      <AnimatePresence mode="wait">
        {!measuring ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heart size={50} color="#ff6b6b" fill="#ff6b6b" style={{ marginBottom: '1.5rem' }} />
            </motion.div>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: "'Playfair Display', serif" }}>
              Quick Question! <br />
              <span style={{ fontSize: '1.5rem', color: '#ff9966' }}>Who is the most beautiful girl in the world?</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                style={{
                  padding: '1rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'linear-gradient(to right, #ff9966, #ff5e62)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
                }}
              >
                Unlock Surprise 🔓
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="measuring"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
              Measuring your cuteness...
            </h2>
            
            <div style={{ 
              fontSize: '4rem', 
              fontWeight: 'bold', 
              color: '#ff69b4', 
              fontFamily: 'monospace',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(255, 105, 180, 0.5)'
            }}>
              {progress}%
            </div>

            <div style={{ 
              width: '100%', 
              height: '30px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '15px', 
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <motion.div 
                style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #ff9966, #ff5e62, #ff69b4)',
                  borderRadius: '15px',
                  width: `${Math.min(progress, 100)}%` // Visually cap at 100 or let it overflow if we want
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {progress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  color: '#ffcc00', 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem',
                  background: 'rgba(255, 204, 0, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 204, 0, 0.3)'
                }}
              >
                <AlertTriangle size={24} />
                WARNING: TOO CUTE TO HANDLE!
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;
