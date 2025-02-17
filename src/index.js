/*import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Screen 1: Welcome
function WelcomeScreen({ onNext }) {
    const startExperience = () => {
        const audio = new Audio('/audio/your-song-file.mp3');
        audio.play().catch(e => console.log('Audio initialization failed'));
        onNext();
      };

  return (
    <div className="container">
      <h1>Hello, Beautiful <span className="heart">♥</span></h1>
      <p>I have something special prepared just for you!</p>
      <button className="btn" onClick={onNext}>Begin</button>
    </div>
  );
}

// Screen 2: Thinking
function ThinkingScreen({ onNext }) {
  return (
    <div className="container">
      <h1>I've been thinking <span className="heart">♥</span></h1>
      <p>About you... about us... and about what makes me smile every day.</p>
      <button className="btn" onClick={onNext}>Continue</button>
    </div>
  );
}

// Screen 3: Question coming
function QuestionComingScreen({ onNext }) {
  return (
    <div className="container">
      <h1>I wanted to ask you something <span className="heart">♥</span></h1>
      <p>Something nice...</p>
      <button className="btn" onClick={onNext}>What is it?</button>
    </div>
  );
}

// Screen 4: The Question
function QuestionScreen({ onYes }) {
  return (
    <div className="container">
      <h1>My Dearest <span className="heart">♥</span></h1>
      <p>You're my everyday val, but to honour the season, will you be my valentine?</p>
      <div>
        <button className="btn" onClick={() => onYes('Yes')}>Yes</button>
        <button className="btn" onClick={() => onYes('Absolutely yes')}>Absolutely yes</button>
      </div>
    </div>
  );
}

// Screen 5: Final Screen with music and petals
function FinalScreen({ answer }) {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    // Play music
    const audio = new Audio('/home/bosun/valentine-proposal/public/Yung-Kai---Blue.mp3');
    // Note: In a real application, you should use the actual Yung Kai - Blue song file
    audio.loop = true;
    audio.play().catch(e => console.log('Audio playback failed: ', e));
    
    // Create petals
    const createPetals = () => {
      const newPetals = [];
      for (let i = 0; i < 100; i++) {
        newPetals.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random(),
          size: `${Math.random() * 15 + 5}px`,
          hue: Math.floor(Math.random() * 30) + 330 // Different shades of pink/red
        });
      }
      setPetals(newPetals);
    };
    
    createPetals();
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  return (
    <div className="final-screen">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
            width: petal.size,
            height: petal.size,
            background: `hsl(${petal.hue}, 100%, 80%)`,
          }}
        />
      ))}
      <div className="final-content">
        <h1 className="final-title">Great! <span className="heart">♥</span></h1>
        <p style={{ color: 'white', fontSize: '24px', marginBottom: '30px' }}>
          You chose "<strong>{answer}</strong>" and that makes me the happiest person!
        </p>
        <div style={{ marginTop: '20px' }}>
          <span className="heart" style={{ fontSize: '50px' }}>♥</span>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [answer, setAnswer] = useState('');
  
  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };
  
  const handleAnswer = (ans) => {
    setAnswer(ans);
    setCurrentScreen(5);
  };
  
  return (
    <>
      {currentScreen === 1 && <WelcomeScreen onNext={handleNext} />}
      {currentScreen === 2 && <ThinkingScreen onNext={handleNext} />}
      {currentScreen === 3 && <QuestionComingScreen onNext={handleNext} />}
      {currentScreen === 4 && <QuestionScreen onYes={handleAnswer} />}
      {currentScreen === 5 && <FinalScreen answer={answer} />}
    </>
  );
}

// Render the app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);*/


import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Main app component
function App() {
  const [currentScreen, setCurrentScreen] = useState(0); // Intro screen
  const [answer, setAnswer] = useState('');
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);
  
  // Initialize audio on app load
  useEffect(() => {
    audioRef.current = new Audio('public/Yung-Kai---Blue.mp3'); 
    audioRef.current.loop = true;
    
    // Cleanup function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  
  const startMusic = () => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.play()
        .then(() => {
          setMusicStarted(true);
          handleNext(); // Move to the first screen
        })
        .catch(e => {
          console.log('Audio playback failed: ', e);
          // Still proceed even if audio fails
          setMusicStarted(true);
          handleNext();
        });
    } else {
      handleNext();
    }
  };
  
  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };
  
  const handleAnswer = (ans) => {
    setAnswer(ans);
    setCurrentScreen(5);
  };
  
  return (
    <>
      {currentScreen === 0 && <IntroScreen onStart={startMusic} />}
      {currentScreen === 1 && <WelcomeScreen onNext={handleNext} />}
      {currentScreen === 2 && <ThinkingScreen onNext={handleNext} />}
      {currentScreen === 3 && <QuestionComingScreen onNext={handleNext} />}
      {currentScreen === 4 && <QuestionScreen onYes={handleAnswer} />}
      {currentScreen === 5 && <FinalScreen answer={answer} />}
    </>
  );
}

// Initial Screen to handle music autoplay restrictions
function IntroScreen({ onStart }) {
  return (
    <div className="container">
      <h1>For Someone Special <span className="heart">♥</span></h1>
      <p>Click the button below to begin our journey together</p>
      <button className="btn" onClick={onStart}>Start Experience</button>
    </div>
  );
}

// Screen 1: Welcome
function WelcomeScreen({ onNext }) {
  return (
    <div className="container">
      <h1>Hello, Beautiful <span className="heart">♥</span></h1>
      <p>I have something special prepared just for you!</p>
      <button className="btn" onClick={onNext}>Begin</button>
    </div>
  );
}

// Screen 2: Thinking
function ThinkingScreen({ onNext }) {
  return (
    <div className="container">
      <h1>I've been thinking <span className="heart">♥</span></h1>
      <p>About you... about us... and about what makes me smile every day.</p>
      <button className="btn" onClick={onNext}>Continue</button>
    </div>
  );
}

// Screen 3: Question coming
function QuestionComingScreen({ onNext }) {
  return (
    <div className="container">
      <h1>I wanted to ask you something <span className="heart">♥</span></h1>
      <p>Something that's been on my mind for quite some time now...</p>
      <button className="btn" onClick={onNext}>What is it?</button>
    </div>
  );
}

// Screen 4: The Question
function QuestionScreen({ onYes }) {
  return (
    <div className="container">
      <h1>My Dearest <span className="heart">♥</span></h1>
      <p>You're my everyday val, but to honour the season, will you be my valentine?</p>
      <div>
        <button className="btn" onClick={() => onYes('Yes')}>Yes</button>
        <button className="btn" onClick={() => onYes('Absolutely yes')}>Absolutely yes</button>
      </div>
    </div>
  );
}

// Screen 5: Final Screen with petals
function FinalScreen({ answer }) {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    // Create petals
    const createPetals = () => {
      const newPetals = [];
      for (let i = 0; i < 100; i++) {
        newPetals.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random(),
          size: `${Math.random() * 15 + 5}px`,
          hue: Math.floor(Math.random() * 30) + 330 // Different shades of pink/red
        });
      }
      setPetals(newPetals);
    };
    
    createPetals();
  }, []);
  
  return (
    <div className="final-screen">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
            width: petal.size,
            height: petal.size,
            background: `hsl(${petal.hue}, 100%, 80%)`,
          }}
        />
      ))}
      <div className="final-content">
        <h1 className="final-title">Great! <span className="heart">♥</span></h1>
        <p style={{ color: 'white', fontSize: '24px', marginBottom: '30px' }}>
          You chose "<strong>{answer}</strong>" and that makes me the happiest person!
        </p>
        <div style={{ marginTop: '20px' }}>
          <span className="heart" style={{ fontSize: '50px' }}>♥</span>
        </div>
      </div>
    </div>
  );
}

// Render the app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);