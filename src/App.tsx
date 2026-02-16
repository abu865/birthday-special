import { useState } from 'react';
import Hero from './components/Hero';
import BirthdayWish from './components/BirthdayWish';
import FloatingHearts from './components/FloatingHearts';
import AudioPlayer from './components/AudioPlayer';
import Quiz from './components/Quiz';
import MoonStory from './components/MoonStory';

function App() {
  const [step, setStep] = useState<'hero' | 'quiz' | 'wish' | 'story'>('hero');

  return (
    <div className="app-container">
      <FloatingHearts />
      {step !== 'story' && <AudioPlayer />}
      
      {step === 'hero' && (
        <Hero onEnter={() => setStep('quiz')} />
      )}
      
      {step === 'quiz' && (
        <Quiz onComplete={() => setStep('wish')} />
      )}
      
      {step === 'wish' && (
        <main>
           <BirthdayWish onStartStory={() => setStep('story')} />
        </main>
      )}

      {step === 'story' && (
        <MoonStory onComplete={() => setStep('wish')} />
      )}
    </div>
  );
}

export default App;
