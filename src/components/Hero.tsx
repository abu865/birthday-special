import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

const Hero: FC<HeroProps> = ({ onEnter }) => {
  return (
    <motion.div 
      className="hero-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100dvh', // Use dvh for better mobile browser support
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 94, 98, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ zIndex: 1 }}
      >
        <Gift size={80} color="#ff6b6b" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))' }} />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', // Responsive font size
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #ff9966, #ff5e62)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 1,
          padding: '0 10px'
        }}
      >
        A Special Surprise  
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{ 
          fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', 
          marginBottom: '3rem', 
          maxWidth: '600px', 
          lineHeight: '1.6',
          color: '#e0e0e0',
          zIndex: 1
        }}
      >
        Someone very confident, smart, and beautiful has a birthday today...
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        style={{
          padding: '1.2rem 3rem',
          fontSize: '1.3rem',
          backgroundColor: '#ff5e62',
          border: 'none',
          borderRadius: '50px',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255, 94, 98, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1,
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}
      >
        <Sparkles size={24} />
        Open Gift
        <Sparkles size={24} />
      </motion.button>
    </motion.div>
  );
};

export default Hero;
