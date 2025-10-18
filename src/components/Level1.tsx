import { useState, useRef } from 'react';
import { Tutorial } from './Tutorial';
import { Timer } from './Timer';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, XCircle } from 'lucide-react';

interface Level1Props {
  onComplete: () => void;
  onBack: () => void;
}

const PHRASES = [
  'Hello World',
  'Good Morning',
  'Thank You',
  'How are you',
  'Have a nice day'
];

export function Level1({ onComplete, onBack }: Level1Props) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPhrase] = useState(PHRASES[0]);
  const [inputs, setInputs] = useState(['', '', '', '', '']);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setGameStarted(true);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Check if all inputs are correct
    if (newInputs.every(input => input === currentPhrase)) {
      setSuccess(true);
      setGameOver(true);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setSuccess(false);
  };

  const handleRestart = () => {
    setInputs(['', '', '', '', '']);
    setGameOver(false);
    setSuccess(false);
    setGameStarted(true);
  };

  if (showTutorial) {
    return <Tutorial type="copy-paste" level={1} onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-12 px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-blue-900">Level 1: Copy & Paste</h1>
          <div className="w-32" />
        </div>

        {!gameOver && (
          <div className="flex justify-center mb-8">
            <Timer duration={60} onTimeUp={handleTimeUp} isActive={gameStarted} />
          </div>
        )}

        {!gameOver ? (
          <div className="bg-white rounded-3xl p-12 shadow-xl border-4 border-blue-300">
            <p className="text-center mb-8 text-gray-700">
              Copy the text below and paste it into all 5 boxes
            </p>

            <div className="mb-12">
              <label className="block mb-3 text-gray-700">
                Text to Copy:
              </label>
              <div className="bg-blue-50 border-4 border-blue-400 rounded-xl p-6 select-all">
                <p className="text-center text-blue-900">
                  {currentPhrase}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {inputs.map((input, index) => (
                <div key={index}>
                  <label className="block mb-2 text-gray-700">
                    Box {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className={`w-full p-6 border-4 rounded-xl ${
                      input === currentPhrase
                        ? 'border-green-500 bg-green-50'
                        : input === ''
                        ? 'border-gray-300 bg-white'
                        : 'border-red-500 bg-red-50'
                    }`}
                    placeholder="Paste here..."
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-3xl p-12 shadow-xl text-center border-4 ${
              success
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            {success ? (
              <>
                <Trophy className="w-24 h-24 text-green-600 mx-auto mb-6" />
                <h2 className="mb-4 text-green-900">
                  Excellent Work!
                </h2>
                <p className="mb-8 text-green-700">
                  You've mastered Level 1!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="h-16 px-12 text-white"
                    onClick={onComplete}
                  >
                    Continue to Next Level
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 px-12"
                    onClick={handleRestart}
                  >
                    Play Again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-600 mx-auto mb-6" />
                <h2 className="mb-4 text-red-900">
                  Time's Up!
                </h2>
                <p className="mb-8 text-red-700">
                  Don't worry, practice makes perfect!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="h-16 px-12 text-white"
                    onClick={handleRestart}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 px-12"
                    onClick={onBack}
                  >
                    Back to Menu
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
