import { type FC, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Music } from 'lucide-react';
import Carousel from './Carousel';
import Message from './Message';

interface BirthdayWishProps {
  onStartStory: () => void;
}

const BirthdayWish: FC<BirthdayWishProps> = ({ onStartStory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // ... existing confetti logic ...

  useEffect(() => {
    // Trigger initial confetti explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        padding: '2rem 1rem',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4rem',
        overflowX: 'hidden'
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        style={{ marginTop: '2rem' }}
      >
        <h1 style={{ 
          fontSize: 'clamp(3rem, 10vw, 6rem)', 
          marginBottom: '0.5rem',
          textShadow: '0 0 20px rgba(255,255,255,0.3)',
          fontFamily: "'Playfair Display', serif"
        }}>
          Happy Birthday!
        </h1>
        <h2 style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 3rem)', 
          color: '#ff9966',
          marginBottom: '2rem' 
        }}>
          To Comfort Zone
        </h2>
      </motion.div>

      <Message />
      
      {/* 3D Carousel Section */}
      <div style={{ width: '100%', overflow: 'hidden', padding: '2rem 0' }}>
         <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff9966' }}>Our Beautiful Memories</h3>
         <Carousel />
         <p style={{ opacity: 0.7, fontStyle: 'italic', marginTop: '1rem' }}>Swipe or hover to pause. (Best viewed in 3D!)</p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{ 
          padding: '2rem', 
          marginBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartStory}
          style={{
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            border: 'none',
            padding: '1.5rem 3rem',
            fontSize: '1.5rem',
            borderRadius: '50px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(37, 117, 252, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            width: 'min(100%, 300px)',
            justifyContent: 'center'
          }}
        >
          <span style={{ fontSize: '1.8rem' }}>🌙</span>
          Start The Story
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            borderRadius: '50px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            width: 'min(100%, 300px)',
            justifyContent: 'center'
          }}
        >
          <Music size={20} />
          Celebrate Again
          <Heart fill="white" size={20} />
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default BirthdayWish;
