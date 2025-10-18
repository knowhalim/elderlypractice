import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { MousePointer2, PlayCircle } from 'lucide-react';

interface TutorialProps {
  type: 'copy-paste' | 'drag-drop' | 'file-copy';
  onComplete: () => void;
  level: number; // Add level number to know which video URL to use
}

// ============================================
// VIDEO CONFIGURATION - PASTE YOUR YOUTUBE URLS HERE
// ============================================
const VIDEO_URLS: Record<number, string> = {
  1: 'YOUR_YOUTUBE_URL_FOR_LEVEL_1', // Level 1: Copy & Paste Basics (60 seconds)
  2: 'YOUR_YOUTUBE_URL_FOR_LEVEL_2', // Level 2: Copy & Paste Practice (30 seconds)
  3: 'YOUR_YOUTUBE_URL_FOR_LEVEL_3', // Level 3: Copy & Paste Expert (15 seconds)
  4: 'YOUR_YOUTUBE_URL_FOR_LEVEL_4', // Level 4: Drag & Drop Basics (30 seconds)
  5: 'YOUR_YOUTUBE_URL_FOR_LEVEL_5', // Level 5: Drag & Drop Practice (15 seconds)
  6: 'YOUR_YOUTUBE_URL_FOR_LEVEL_6', // Level 6: Copy & Paste Files (30 seconds)
};

// Function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  // If it's already a valid embed URL, return it
  if (url.includes('embed')) {
    return url;
  }
  
  // Handle different YouTube URL formats
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  
  // If it's a placeholder or invalid, return it as is (will show error message)
  return url;
}

export function Tutorial({ type, onComplete, level }: TutorialProps) {
  const [step, setStep] = useState<'text' | 'video'>('text');

  const handleNext = () => {
    setStep('video');
  };

  const handleStart = () => {
    onComplete();
  };

  const videoUrl = VIDEO_URLS[level] || 'YOUR_YOUTUBE_URL_HERE';
  const isPlaceholder = videoUrl.includes('YOUR_YOUTUBE_URL');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8 overflow-y-auto">
      <motion.div
        key={step}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 md:p-12 max-w-3xl w-full shadow-2xl my-4"
      >
        {step === 'text' ? (
          <>
            <h2 className="text-center mb-6 md:mb-8 text-blue-900">
              How to Play - Text Instructions
            </h2>

            {type === 'copy-paste' && (
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-blue-800">
                    Step 1: Select the Text
                  </h3>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex-shrink-0"
                    >
                      <MousePointer2 className="w-12 h-12 text-blue-600" />
                    </motion.div>
                    <p className="text-gray-700">
                      Click and drag over the text to select it, or triple-click to select all
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-green-800">
                    Step 2: Copy the Text
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Press <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded">C</kbd>
                    </p>
                    <p className="text-gray-600">
                      Or right-click and select "Copy"
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-purple-800">
                    Step 3: Paste the Text
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Click in the empty box, then press <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded">V</kbd>
                    </p>
                    <p className="text-gray-600">
                      Or right-click and select "Paste"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {type === 'drag-drop' && (
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-blue-800">
                    Step 1: Click and Hold
                  </h3>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex-shrink-0"
                    >
                      <MousePointer2 className="w-12 h-12 text-blue-600" />
                    </motion.div>
                    <p className="text-gray-700">
                      Click on a file and HOLD the mouse button down
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-green-800">
                    Step 2: Drag the File
                  </h3>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ x: [0, 40, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex-shrink-0"
                    >
                      <MousePointer2 className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <p className="text-gray-700">
                      While holding the button, move the mouse to the folder
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h3 className="mb-4 text-purple-800">
                    Step 3: Release to Drop
                  </h3>
                  <p className="text-gray-700">
                    Release the mouse button when the file is over the folder
                  </p>
                </div>
              </div>
            )}

            {type === 'file-copy' && (
              <div className="space-y-4 md:space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                <div className="bg-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <h3 className="mb-3 md:mb-4 text-blue-800">
                    Step 1: Right-Click File
                  </h3>
                  <div className="flex items-start gap-3 md:gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex-shrink-0"
                    >
                      <MousePointer2 className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">
                        Right-click on a file to open the menu
                      </p>
                      <div className="p-2 md:p-3 bg-white border-2 border-blue-300 rounded-lg">
                        <p className="text-blue-800 text-sm md:text-base">
                          💡 Right-click = RIGHT mouse button
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <h3 className="mb-3 md:mb-4 text-green-800">
                    Step 2: Click "Copy"
                  </h3>
                  <p className="text-gray-700 mb-2 md:mb-3">
                    Click on "📋 Copy" in the menu
                  </p>
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-2 md:p-3 inline-block">
                    <p className="text-gray-700 text-sm md:text-base">📋 Copy</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <h3 className="mb-3 md:mb-4 text-purple-800">
                    Step 3: Right-Click Folder
                  </h3>
                  <p className="text-gray-700">
                    Right-click on the "Backup Folder"
                  </p>
                </div>

                <div className="bg-orange-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <h3 className="mb-3 md:mb-4 text-orange-800">
                    Step 4: Click "Paste"
                  </h3>
                  <p className="text-gray-700 mb-2 md:mb-3">
                    Click "📄 Paste" to copy the file
                  </p>
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-2 md:p-3 inline-block">
                    <p className="text-gray-700 text-sm md:text-base">📄 Paste</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full mt-6 md:mt-8 h-12 md:h-16 text-white"
              onClick={handleNext}
            >
              Next: Watch Video Tutorial
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-center mb-6 md:mb-8 text-blue-900">
              Video Tutorial - Level {level}
            </h2>

            <div className="mb-6 md:mb-8">
              {isPlaceholder ? (
                <div className="bg-gray-100 border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <PlayCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Video Tutorial Placeholder
                  </p>
                  <p className="text-gray-500 text-sm">
                    Replace VIDEO_URLS[{level}] in Tutorial.tsx with your YouTube URL
                  </p>
                  <div className="mt-4 p-3 bg-white rounded-lg border-2 border-gray-300 text-left">
                    <p className="text-xs text-gray-600 font-mono break-all">
                      Current: {videoUrl}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(videoUrl)}
                    title={`Level ${level} Tutorial Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 md:p-6 rounded-2xl mb-6">
              <h3 className="mb-3 text-blue-800">
                Quick Tips:
              </h3>
              <ul className="space-y-2 text-gray-700">
                {type === 'copy-paste' && (
                  <>
                    <li>• Select text by clicking and dragging</li>
                    <li>• Use Ctrl+C to copy, Ctrl+V to paste</li>
                    <li>• Practice makes perfect!</li>
                  </>
                )}
                {type === 'drag-drop' && (
                  <>
                    <li>• Click and HOLD the mouse button</li>
                    <li>• Move the mouse while holding</li>
                    <li>• Release when over the target</li>
                  </>
                )}
                {type === 'file-copy' && (
                  <>
                    <li>• Right-click means use the RIGHT mouse button</li>
                    <li>• Copy files first, then paste in folder</li>
                    <li>• Watch for the green checkmark!</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex gap-3 md:gap-4">
              <Button
                variant="outline"
                className="flex-1 h-12 md:h-16"
                onClick={() => setStep('text')}
              >
                Back to Text
              </Button>
              <Button
                className="flex-1 h-12 md:h-16 text-white"
                onClick={handleStart}
              >
                Start Game!
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
