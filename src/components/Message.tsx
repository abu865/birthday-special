import { type FC } from 'react';
import { motion } from 'framer-motion';

const Message: FC = () => {
  return (
    <section style={{ 
      padding: '2rem 1rem', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center',
      background: 'transparent' 
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(20, 20, 20, 0.8)',
          backdropFilter: 'blur(15px)',
          padding: '2rem',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff9966, #ff5e62)'
        }} />
        
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
          marginBottom: '2rem', 
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          color: '#fff'
        }}>
          My Wish For You
        </h2>
        
        <div style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', lineHeight: '1.8', color: '#e0e0e0', whiteSpace: 'pre-line' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Happy Birthday to the one who makes my world brighter!
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Every day with you is a gift, but today is extra special because it belongs to you. 
            Your smile, your laugh, and just... everything about you makes my heart sparkle. ✨
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            May this year bring you as much joy as you’ve brought into my life. 
            I can’t wait to create more amazing memories together.
          </p>
          <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '3rem', fontWeight: 'bold', color: '#ff6b6b' }}>
            You're so precious to me! 🙈💖
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Message;
