import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import './MoonStory.css';
import ParticleImageReveal from './ParticleImageReveal';

// Import Audio Files
// @ts-ignore
import introAudio from '../audio/New York Nagaram.mp3';
// @ts-ignore
import mainAudio from '../audio/Munbe Vaa.mp3';
// @ts-ignore
import finalAudio from '../audio/Vennilave Vennilave Vinnai.mp3';

interface MoonStoryProps {
  onComplete: () => void;
}

export default function MoonStory({ onComplete }: MoonStoryProps) {
  const [scene, setScene] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; message: string; revealed: boolean }[]>([]);
  const [giftOpen, setGiftOpen] = useState(false);
  const [moonTaps, setMoonTaps] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize stars for Scene 4
  useEffect(() => {
    const newStars = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 60 + 5, // Top 65% of screen
      message: ['You represent beauty', 'You are kind', 'You are special', 'You shine bright', 'So precious 🙈'][i % 5],
      revealed: false
    }));
    setStars(newStars);
  }, []);

  // Audio Playlist Logic
  useEffect(() => {
    if (!audioRef.current) return;

    const playAudio = async (src: string) => {
        try {
            // Only change src if it's different to avoid reloading
            if (audioRef.current!.src !== src && audioRef.current!.src !== window.location.href + src) {
                 audioRef.current!.src = src;
            }
            audioRef.current!.volume = 0.5;
            await audioRef.current!.play();
            setAudioPlaying(true);
        } catch (e) {
            console.error("Audio playback failed:", e);
        }
    };

    if (scene === 0) {
        // Intro: Autoplay New York Nagaram
        playAudio(introAudio);
    } else if (scene === 2) {
        // Main Moon Scene: Munbe Vaa
        playAudio(mainAudio);
    } else if (scene === 9) {
        // Final Message
        playAudio(finalAudio);
    }
  }, [scene]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        // If empty src (initial state), set to intro audio
        if (!audioRef.current.src || audioRef.current.src === window.location.href) {
            audioRef.current.src = introAudio;
        }
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const nextScene = () => {
    setScene(prev => prev + 1);
    setTextIndex(0);
  };

  const handleStarClick = (id: number) => {
    setStars(prev => prev.map(star => star.id === id ? { ...star, revealed: true } : star));
  };

  const handleMoonTap = () => {
    if (scene === 9) {
      setMoonTaps(prev => prev + 1);
      if (moonTaps + 1 === 5) {
        setScene(10); // Secret ending
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFFFFF', '#FFA500']
        });
      }
    }
  };

  // Scene 1: Dark Night Start
  const renderScene0 = () => (
    <motion.div 
      className="scene-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="star-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px'
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>
      <motion.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         transition={{ delay: 1, duration: 2 }}
         className="story-center"
      >
        <h2 className="story-text">In this dark world...</h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3, duration: 2 }}
          className="story-text"
        >
          There is something beautiful...
        </motion.p>
      </motion.div>
      <motion.button 
        className="next-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        onClick={nextScene}
      >
        Next
      </motion.button>
    </motion.div>
  );

  // Scene 2: Moon Reveal
  const renderScene1 = () => (
    <motion.div className="scene-container">
      <motion.div
        className="moon-dotted-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="moon-dotted-circle"></div>
        <motion.img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" 
            alt="Person"
            className="moon-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
        />
      </motion.div>

      <motion.h2 
        className="story-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        It’s YOU 🌙
      </motion.h2>
       <motion.button 
        className="next-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        onClick={nextScene}
      >
        Continue
      </motion.button>
    </motion.div>
  );

  // Scene 3: Why Moon?
  const reasons = [
    "Because you are calm like the night 🌙",
    "Because your smile lights up everything ✨",
    "Because you make people feel peaceful 💖"
  ];
  
  const renderScene2 = () => (
    <motion.div className="scene-container">
       <motion.div className="moon" style={{ transform: 'scale(0.8)', marginBottom: '2rem' }}>
        <div className="moon-glow"></div>
       </motion.div>
       
       {reasons.map((reason, index) => (
         <motion.p
            key={index}
            className="story-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 2.5 }}
            style={{ fontSize: '1.2rem', margin: '1rem 0' }}
         >
           {reason}
         </motion.p>
       ))}

       <motion.button 
        className="next-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8 }}
        onClick={nextScene}
      >
        Why?
      </motion.button>
    </motion.div>
  );

  // Scene 4: Interactive Stars
  const renderScene3 = () => (
    <motion.div className="scene-container" style={{ cursor: 'crosshair' }}>
      <h3 style={{ position: 'absolute', top: '10%' }}>Tap the stars... ✨</h3>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`, 
            width: '15px', 
            height: '15px',
            background: star.revealed ? '#FFD700' : 'white'
          }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleStarClick(star.id)}
        >
          {star.revealed && (
            <motion.div 
              className="star-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -20 }}
            >
              {star.message}
            </motion.div>
          )}
        </motion.div>
      ))}
      <div style={{ position: 'absolute', bottom: '10%' }}>
         <button className="next-button" onClick={nextScene}>I have a surprise...</button>
      </div>
    </motion.div>
  );

  // New Scene: Particle Reveal (Scene 4)
  const renderSceneParticle = () => (
     <motion.div 
       className="scene-container"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
     >
        <ParticleImageReveal 
           imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
           width={window.innerWidth > 500 ? 400 : 300}
           height={window.innerWidth > 500 ? 500 : 400} 
        />
        <motion.button 
          className="next-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          onClick={nextScene}
          style={{ marginTop: '2rem' }}
        >
          Beautiful, isn't it?
        </motion.button>
     </motion.div>
  );

  // Scene 5: Phases of Moon
  const phases = [
    { text: "The day we met (New Moon)", shadow: 'inset 150px 0px 0px 0px #000' },
    { text: "We started talking (Growing)", shadow: 'inset 80px 0px 0px 0px #000' },
    { text: "We shared moments (Half)", shadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0.5)' }, // Full circle essentially
    { text: "Now you are important to me (Full)", shadow: 'none', bg: '#fdfcdc' }
  ];

  const renderScene4 = () => (
    <motion.div className="scene-container">
      <AnimatePresence mode='wait'>
         <motion.div 
           key={textIndex}
           className="moon-phase-container"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
         >
            <div 
                className="moon-phase" 
                style={{ 
                    boxShadow: phases[textIndex].shadow,
                    background: phases[textIndex].bg || '#fdfcdc' 
                }} 
            />
            <p className="story-text">{phases[textIndex].text}</p>
         </motion.div>
      </AnimatePresence>
      <button 
        className="next-button" 
        onClick={() => {
            if (textIndex < phases.length - 1) setTextIndex(prev => prev + 1);
            else nextScene();
        }}
      >
        {textIndex < phases.length - 1 ? "Next Phase" : "Next Chapter"}
      </button>
    </motion.div>
  );

  // Scene 6: Memory
  const renderScene5 = () => (
    <motion.div className="scene-container">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: '#fff', padding: '20px', borderRadius: '10px', color: '#000', maxWidth: '300px' }}
      >
        <p style={{ fontStyle: 'italic' }}>"Remember when..."</p>
        <h3>That day changed everything.</h3>
        <p>Just listening to you makes my day better.</p>
      </motion.div>
      <button className="next-button" onClick={nextScene}>A Gift for you</button>
    </motion.div>
  );

  // Scene 7: Gift Box
  const renderScene6 = () => (
    <motion.div className="scene-container">
      {!giftOpen ? (
        <motion.div 
            className="gift-box"
            onClick={() => setGiftOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            🎁
            <p style={{ fontSize: '1rem', marginTop: '10px', color: 'white' }}>Tap to open</p>
        </motion.div>
      ) : (
        <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ textAlign: 'center' }}
        >
            <h2 className="story-text" style={{ color: '#FFD700' }}>The moon is beautiful...</h2>
            <h1 className="story-text" style={{ fontSize: '2.5rem', marginTop: '1rem' }}>But you shine way brighter ✨</h1>
            <button className="next-button" onClick={nextScene} style={{ marginTop: '30px' }}>Listen</button>
        </motion.div>
      )}
    </motion.div>
  );

  // Scene 8: Voice Message
  const renderScene7 = () => (
     <motion.div className="scene-container">
        <h2 className="story-text">A message...</h2>
        <motion.div 
            style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '30px', 
                borderRadius: '50%',
                cursor: 'pointer',
                border: '2px solid white',
                marginTop: '20px'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAudio}
        >
            {audioPlaying ? <Music size={40} className="animate-pulse" /> : <Play size={40} />}
        </motion.div>
        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>{audioPlaying ? "Playing..." : "Tap to play"}</p>
        
        <button className="next-button" onClick={nextScene} style={{ marginTop: '50px' }}>Final Promise</button>
     </motion.div>
  );

  // Scene 9: Final Scene (Climax)
  const renderScene8 = () => (
    <motion.div className="scene-container" style={{ background: 'radial-gradient(circle at 50% 50%, #2a2a2a 0%, #000 100%)' }}>
        <motion.div 
            className="moon"
            animate={{ boxShadow: ['0 0 20px #fff', '0 0 100px #fff', '0 0 20px #fff'] }}
            transition={{ duration: 4, repeat: Infinity }}
            onClick={handleMoonTap}
        >
            <div className="moon-glow"></div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
            style={{ marginTop: '2rem', textAlign: 'center', zIndex: 10 }}
        >
            <p className="story-text">Even if the world changes...</p>
            <p className="story-text">The moon will always be there...</p>
            <p className="story-text" style={{ color: '#FFD700', fontWeight: 'bold' }}>Just like you 🌙❤️</p>
        </motion.div>
        
        {/* Fireflies effect */}
        {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
             key={i}
             style={{
               position: 'absolute',
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               width: '4px',
               height: '4px',
               borderRadius: '50%',
               background: '#ffff00',
               boxShadow: '0 0 5px #ffff00'
             }}
             animate={{ 
                 y: [0, -20, 0], 
                 x: [0, Math.random() * 20 - 10, 0],
                 opacity: [0, 1, 0] 
             }}
             transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
           />
        ))}

        <button className="next-button" onClick={onComplete} style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '0.8rem' }}>
            Finish
        </button>
    </motion.div>
  );

  // Scene 10: Secret Ending
  const renderScene9 = () => (
    <motion.div className="scene-container">
         <motion.h1 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="story-text"
            style={{ fontSize: '3rem', color: '#FFD700' }}
         >
            One more thing...
         </motion.h1>
         <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="story-text"
         >
            You make my world brighter 🌙✨
         </motion.p>
         <button className="next-button" onClick={onComplete} style={{ marginTop: '50px' }}>
            Back to Earth
        </button>
    </motion.div>
  );

  return (
    <div className="moon-story-container">
       <audio ref={audioRef} loop /> {/* Audio controlled by React state */}
       
       <AnimatePresence mode='wait'>
         {scene === 0 && renderScene0()}
         {scene === 1 && renderScene1()}
         {scene === 2 && renderScene2()}
         {scene === 3 && renderScene3()}
         {scene === 4 && renderSceneParticle()}
         {scene === 5 && renderScene4()}
         {scene === 6 && renderScene5()}
         {scene === 7 && renderScene6()}
         {scene === 8 && renderScene7()}
         {scene === 9 && renderScene8()}
         {scene === 10 && renderScene9()}
       </AnimatePresence>

       {/* Optional Skip for testing */}
       <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.3 }}>
          <button onClick={() => setScene(10)} style={{ background: 'transparent' }}><SkipForward color='white' size={20}/></button>
       </div>
    </div>
  );
}
