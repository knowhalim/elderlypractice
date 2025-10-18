import { useState } from 'react';
import { LevelSelect } from './components/LevelSelect';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { Level4 } from './components/Level4';
import { Level5 } from './components/Level5';
import { Level6 } from './components/Level6';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const handleLevelComplete = (level: number) => {
    setCompletedLevels(prev => new Set([...prev, level]));
    setCurrentLevel(0); // Return to level select
  };

  const handleLevelSelect = (level: number) => {
    setCurrentLevel(level);
  };

  const handleBackToMenu = () => {
    setCurrentLevel(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      {currentLevel === 0 && (
        <LevelSelect
          onLevelSelect={handleLevelSelect}
          completedLevels={completedLevels}
        />
      )}
      {currentLevel === 1 && (
        <Level1 onComplete={() => handleLevelComplete(1)} onBack={handleBackToMenu} />
      )}
      {currentLevel === 2 && (
        <Level2 onComplete={() => handleLevelComplete(2)} onBack={handleBackToMenu} />
      )}
      {currentLevel === 3 && (
        <Level3 onComplete={() => handleLevelComplete(3)} onBack={handleBackToMenu} />
      )}
      {currentLevel === 4 && (
        <Level4 onComplete={() => handleLevelComplete(4)} onBack={handleBackToMenu} />
      )}
      {currentLevel === 5 && (
        <Level5 onComplete={() => handleLevelComplete(5)} onBack={handleBackToMenu} />
      )}
      {currentLevel === 6 && (
        <Level6 onComplete={() => handleLevelComplete(6)} onBack={handleBackToMenu} />
      )}
    </div>
  );
}
