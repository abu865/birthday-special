import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import './InstaSlider.css';

import img1 from '../assets/IMG-20251225-WA0078.jpg';
import img2 from '../assets/IMG-20260202-WA0059.jpg';
import img3 from '../assets/IMG20251220160043.jpg';
import img4 from '../assets/PXL_20260125_015050249.PORTRAIT.jpg';
import img5 from '../assets/PXL_20260125_024915462.MP.jpg';
import img6 from '../assets/PXL_20260125_090756472.PORTRAIT.jpg';
import vid1 from '../assets/PXL_20260131_114131673.mp4';
import vid2 from '../assets/VID-20260304-WA0000.mp4';
import img7 from '../assets/PXL_20260131_114711335.jpg';
import img8 from '../assets/PXL_20260201_110236058.jpg';
import img9 from '../assets/PXL_20260201_110816024.jpg';
import img10 from '../assets/PXL_20260201_122941882.jpg';
// @ts-ignore
import sliderMusic from '../assets/_Pookkal_Pookkum_Tharunam_Bgm_Flute_Tamil_Madrasapattinam_Ringtone_(by Fringster.com) (1).mp3';

const stories = [
  { type: 'image', src: img1, caption: 'Beautiful memories 💖', duration: 4000 },
  { type: 'image', src: img2, caption: 'That smile 😊', duration: 4000 },
  { type: 'image', src: img3, caption: 'Stunning as always 🌟', duration: 4000 },
  { type: 'video', src: vid1, caption: 'Wait for it... 🎥', duration: 15000 }, // Fallback duration, video dictates it
  { type: 'image', src: img4, caption: 'Precious moments ✨', duration: 4000 },
  { type: 'image', src: img5, caption: 'Too perfect 🦋', duration: 4000 },
  { type: 'image', src: img6, caption: 'Just beautiful 🌙', duration: 4000 },
  { type: 'image', src: img7, caption: 'Sweet vibes 🥰', duration: 4000 },
  { type: 'image', src: img8, caption: 'Always shining 💫', duration: 4000 },
  { type: 'image', src: img9, caption: 'look Wasum 🔥', duration: 4000 },
  { type: 'image', src: img10, caption: '🤍', duration: 4000 },
  { type: 'video', src: vid2, caption: 'Amazing memories ✨', duration: 15000 },
];

interface InstaSliderProps {
  onComplete: () => void;
}

export default function InstaSlider({ onComplete }: InstaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeStory = stories[currentIndex];

  useEffect(() => {
    audioRef.current = new Audio(sliderMusic);
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (!isPaused && activeStory.type !== 'video') {
        audioRef.current.play().catch(e => console.log('Music play error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPaused, activeStory.type]);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    let accumulatedTime = 0;
    
    // Total time depends on whether it's an image or a video
    // We try to use video.duration if available, otherwise fallback
    let totalDuration = activeStory.duration;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      if (!isPaused) {
        if (activeStory.type === 'video' && videoRef.current) {
          // If video, use video's current time for progress
          if (videoRef.current.duration) {
            totalDuration = videoRef.current.duration * 1000;
            const currentVideoProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentVideoProgress);
          }
        } else {
          // Image progress based on time
          const elapsed = timestamp - startTime + accumulatedTime;
          const currentProgress = (elapsed / totalDuration) * 100;
          setProgress(currentProgress);

          if (currentProgress >= 100) {
            handleNext();
            return;
          }
        }
      } else {
        // Paused state management for image
        if (activeStory.type === 'image') {
          accumulatedTime += timestamp - startTime;
          startTime = timestamp; 
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    if (activeStory.type === 'video' && videoRef.current) {
         if (!isPaused) videoRef.current.play();
         else videoRef.current.pause();
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentIndex, isPaused, activeStory]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleVideoEnded = () => {
      handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="insta-slider-container">
      {/* Background blur */}
      <div 
         className="insta-bg" 
         style={{ backgroundImage: `url(${activeStory.type === 'image' ? activeStory.src : activeStory.src})` }} 
      />
      
      <div className="insta-content-wrapper">
        {/* Progress Bars */}
        <div className="insta-progress-container">
          {stories.map((story, index) => (
            <div key={index} className="insta-progress-bar-bg">
              <div 
                className={`insta-progress-bar-fill ${index < currentIndex ? 'completed' : ''}`}
                style={{ 
                    width: index === currentIndex ? `${progress}%` : (index < currentIndex ? '100%' : '0%'),
                    transition: index === currentIndex && !isPaused && story.type === 'image' ? 'none' : 'width 0.1s linear'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header (Close Button, Play/Pause) */}
        <div className="insta-header">
           <div className="insta-user-info">
              <div className="insta-avatar">✨</div>
              <span className="insta-username">Our Memories</span>
           </div>
           <div className="insta-actions">
              <button className="insta-btn" onClick={() => setIsPaused(!isPaused)}>
                 {isPaused ? <Play size={20} /> : <Pause size={20} />}
              </button>
              <button className="insta-btn" onClick={onComplete}>
                 <X size={24} />
              </button>
           </div>
        </div>

        {/* Story Media area */}
        <div 
           className="insta-media-container"
           onPointerDown={() => setIsPaused(true)}
           onPointerUp={() => setIsPaused(false)}
           onPointerLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode='wait'>
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="insta-media-inner"
                >
                    {activeStory.type === 'image' ? (
                        <img src={activeStory.src} alt="Story" className="insta-media" />
                    ) : (
                        <video 
                            ref={videoRef} 
                            src={activeStory.src} 
                            className="insta-media" 
                            playsInline 
                            onEnded={handleVideoEnded}
                            onTimeUpdate={(e) => {
                                const target = e.target as HTMLVideoElement;
                                if (target.duration) {
                                    setProgress((target.currentTime / target.duration) * 100);
                                }
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
            
            {/* Caption */}
            <motion.div 
                className="insta-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={`cap-${currentIndex}`}
            >
                <p>{activeStory.caption}</p>
            </motion.div>
        </div>

        {/* Touch zones for Prev/Next */}
        <div className="insta-nav-left" onClick={handlePrev}>
            <ChevronLeft size={40} className="nav-icon" />
        </div>
        <div className="insta-nav-right" onClick={handleNext}>
            <ChevronRight size={40} className="nav-icon" />
        </div>
      </div>
    </div>
  );
}
