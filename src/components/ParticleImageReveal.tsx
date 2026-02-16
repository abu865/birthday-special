import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

interface ParticleImageRevealProps {
  imageSrc: string;
  onComplete?: () => void;
  width?: number;
  height?: number;
}

const ParticleImageReveal = ({ imageSrc, onComplete, width = 400, height = 400 }: ParticleImageRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      // Draw image to canvas to read pixels
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const newParticles: Particle[] = [];

      // Create particles from image data
      // Step controls density (higher = fewer particles)
      const step = 4; 
      
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 128) {
            const red = data[index];
            const green = data[index + 1];
            const blue = data[index + 2];
            
            newParticles.push({
              x: Math.random() * width, // Random start x
              y: Math.random() * height, // Random start y
              originX: x,
              originY: y,
              color: `rgb(${red}, ${green}, ${blue})`,
              size: Math.random() * 2 + 1,
              vx: 0,
              vy: 0
            });
          }
        }
      }

      setParticles(newParticles);
      setLoading(false);
      
      // Clear canvas to start animation loop
      ctx.clearRect(0, 0, width, height);
    };

  }, [imageSrc, width, height]);

  useEffect(() => {
    if (loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw "22" or overlay text if needed, but we'll focus on particles first
      
      let allSettled = true;

      particles.forEach(p => {
        if (isRevealed) {
          // Move towards origin
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 1) {
            p.x += dx * 0.08; // Easing factor
            p.y += dy * 0.08;
            allSettled = false;
          } else {
            p.x = p.originX;
            p.y = p.originY;
          }
        } else {
            // Float around randomly (Star state)
            p.x += (Math.random() - 0.5) * 0.5;
            p.y += (Math.random() - 0.5) * 0.5;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
            allSettled = false;
        }

        ctx.fillStyle = isRevealed ? p.color : '#ffffff'; // White stars initially, then color
        ctx.beginPath();
        ctx.arc(p.x, p.y, isRevealed ? 1.5 : Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isRevealed && allSettled && onComplete) {
         // Optional: trigger something when fully formed
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [loading, isRevealed, particles, width, height, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div 
            style={{ position: 'relative', width: width, height: height, cursor: 'pointer', margin: '0 auto' }} 
            onClick={() => setIsRevealed(true)}
        >
          {!isRevealed && !loading && (
            <div style={{
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              textAlign: 'center',
              width: '100%'
            }}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span style={{ fontSize: '3rem', color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>✨</span>
              </motion.div>
              <p style={{ color: 'white', marginTop: '10px', fontSize: '1.2rem' }}>Tap the Magic Star</p>
            </div>
          )}
          
          {loading && <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading Magic...</div>}
          
          <canvas 
            ref={canvasRef} 
            width={width} 
            height={height}
            style={{ borderRadius: '20px', boxShadow: isRevealed ? '0 0 50px rgba(255,255,255,0.2)' : 'none' }}
          />
        </div>
      
      <AnimatePresence>
        {isRevealed && (
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              style={{
                  marginTop: '1.5rem',
                  textAlign: 'center',
                  color: '#FFD700',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem'
              }}
           >
              Happy 22nd Birthday! ❤️
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParticleImageReveal;
