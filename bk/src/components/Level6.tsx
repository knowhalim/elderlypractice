import { useState } from 'react';
import { Tutorial } from './Tutorial';
import { Timer } from './Timer';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, XCircle, FileText, Folder } from 'lucide-react';

interface Level6Props {
  onComplete: () => void;
  onBack: () => void;
}

const FILES = [
  { id: 1, name: 'Important.doc' },
  { id: 2, name: 'Family.jpg' },
  { id: 3, name: 'Contact.txt' },
];

export function Level6({ onComplete, onBack }: Level6Props) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [copiedFile, setCopiedFile] = useState<number | null>(null);
  const [pastedFiles, setPastedFiles] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: number } | null>(null);
  const [folderContextMenu, setFolderContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setGameStarted(true);
  };

  const handleFileClick = (fileId: number) => {
    setSelectedFile(fileId);
    setContextMenu(null);
    setFolderContextMenu(null);
  };

  const handleFileRightClick = (e: React.MouseEvent, fileId: number) => {
    e.preventDefault();
    setSelectedFile(fileId);
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
    setFolderContextMenu(null);
  };

  const handleFolderRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFolderContextMenu({ x: e.clientX, y: e.clientY });
    setContextMenu(null);
  };

  const handleCopy = (fileId: number) => {
    setCopiedFile(fileId);
    setContextMenu(null);
  };

  const handlePaste = () => {
    if (copiedFile !== null && !pastedFiles.has(copiedFile)) {
      const newPasted = new Set(pastedFiles);
      newPasted.add(copiedFile);
      setPastedFiles(newPasted);
      setCopiedFile(null);
      setSelectedFile(null);
      setFolderContextMenu(null);

      if (newPasted.size === 3) {
        setSuccess(true);
        setGameOver(true);
      }
    }
  };

  const handleClickOutside = () => {
    setContextMenu(null);
    setFolderContextMenu(null);
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setSuccess(false);
  };

  const handleRestart = () => {
    setSelectedFile(null);
    setCopiedFile(null);
    setPastedFiles(new Set());
    setGameOver(false);
    setSuccess(false);
    setGameStarted(true);
    setContextMenu(null);
    setFolderContextMenu(null);
  };

  if (showTutorial) {
    return <Tutorial type="file-copy" level={6} onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8" onClick={handleClickOutside}>
      <div className="max-w-6xl w-full">
        <div className="flex items-center justify-between mb-4 md:mb-8 gap-2">
          <Button variant="outline" onClick={onBack} className="h-10 md:h-12 px-3 md:px-6">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden sm:inline">Back to Menu</span>
          </Button>
          <h1 className="text-blue-900 text-center flex-1">Level 6: Copy Files</h1>
          <div className="w-10 md:w-32" />
        </div>

        {!gameOver && (
          <div className="flex justify-center mb-4 md:mb-8">
            <Timer duration={30} onTimeUp={handleTimeUp} isActive={gameStarted} />
          </div>
        )}

        {!gameOver ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div>
              <h3 className="mb-3 md:mb-4 text-gray-700">Original Files:</h3>
              <div className="bg-white border-4 border-blue-400 rounded-2xl md:rounded-3xl p-4 md:p-8">
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 md:p-4 mb-3 md:mb-4">
                  <p className="text-yellow-800 text-center text-sm md:text-base">
                    ⚠️ Right-click files to copy!
                  </p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {FILES.map(file => (
                    <div
                      key={file.id}
                      onClick={() => handleFileClick(file.id)}
                      onContextMenu={(e) => handleFileRightClick(e, file.id)}
                      className={`p-4 md:p-6 rounded-xl border-4 cursor-pointer transition-all ${
                        selectedFile === file.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-blue-400'
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base break-all">{file.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-xl">
                  <p className="text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                    {copiedFile
                      ? `✓ Copied: ${FILES.find(f => f.id === copiedFile)?.name}`
                      : selectedFile
                      ? `Selected: ${FILES.find(f => f.id === selectedFile)?.name} - Right-click!`
                      : 'Right-click a file'}
                  </p>
                  {copiedFile && (
                    <div className="text-center p-2 md:p-3 bg-green-100 border-2 border-green-500 rounded-lg">
                      <p className="text-green-700 text-sm md:text-base">
                        File copied! Right-click folder to paste.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 md:mb-4 text-gray-700">Destination Folder:</h3>
              <div 
                className="bg-blue-50 border-4 md:border-8 border-dashed border-blue-400 rounded-2xl md:rounded-3xl p-4 md:p-8 min-h-[300px] md:min-h-[400px] cursor-context-menu"
                onContextMenu={handleFolderRightClick}
              >
                <div className="text-center mb-4 md:mb-6">
                  <Folder className="w-16 h-16 md:w-20 md:h-20 text-blue-600 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-blue-900 mb-2">Backup Folder</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Right-click to paste ({pastedFiles.size}/3)
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {Array.from(pastedFiles).map(fileId => {
                    const file = FILES.find(f => f.id === fileId);
                    return (
                      <div
                        key={fileId}
                        className="bg-green-50 border-2 border-green-500 rounded-xl p-3 md:p-4"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <FileText className="w-6 h-6 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
                          <span className="text-green-700 text-sm md:text-base break-all flex-1">{file?.name}</span>
                          <span className="text-green-600 flex-shrink-0">✓</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl text-center border-4 ${
              success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}
          >
            {success ? (
              <>
                <Trophy className="w-16 h-16 md:w-24 md:h-24 text-green-600 mx-auto mb-4 md:mb-6" />
                <h2 className="mb-3 md:mb-4 text-green-900">Congratulations!</h2>
                <p className="mb-6 md:mb-8 text-green-700">
                  You've completed all levels! You're now a computer expert!
                </p>
                <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                  <Button className="h-12 md:h-16 px-6 md:px-12 text-white" onClick={onComplete}>
                    Back to Main Menu
                  </Button>
                  <Button variant="outline" className="h-12 md:h-16 px-6 md:px-12" onClick={handleRestart}>
                    Play Again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 md:w-24 md:h-24 text-red-600 mx-auto mb-4 md:mb-6" />
                <h2 className="mb-3 md:mb-4 text-red-900">Time's Up!</h2>
                <p className="mb-6 md:mb-8 text-red-700">
                  You copied {pastedFiles.size}/3 files. Try again!
                </p>
                <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                  <Button className="h-12 md:h-16 px-6 md:px-12 text-white" onClick={handleRestart}>
                    Try Again
                  </Button>
                  <Button variant="outline" className="h-12 md:h-16 px-6 md:px-12" onClick={onBack}>
                    Back to Menu
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Context Menu for Files */}
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'fixed',
              left: contextMenu.x,
              top: contextMenu.y,
              zIndex: 1000,
            }}
            className="bg-white border-2 md:border-4 border-gray-300 rounded-lg md:rounded-xl shadow-2xl overflow-hidden min-w-[200px] md:min-w-[250px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-4 md:px-6 py-3 md:py-4 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors border-b-2 border-gray-200"
              onClick={() => handleCopy(contextMenu.fileId)}
            >
              <p className="text-gray-800 hover:text-white text-sm md:text-base">
                📋 Copy
              </p>
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 text-gray-400 cursor-not-allowed">
              <p className="text-sm md:text-base">Delete (disabled)</p>
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 text-gray-400 cursor-not-allowed">
              <p className="text-sm md:text-base">Rename (disabled)</p>
            </div>
          </motion.div>
        )}

        {/* Context Menu for Folder */}
        {folderContextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'fixed',
              left: folderContextMenu.x,
              top: folderContextMenu.y,
              zIndex: 1000,
            }}
            className="bg-white border-2 md:border-4 border-gray-300 rounded-lg md:rounded-xl shadow-2xl overflow-hidden min-w-[200px] md:min-w-[250px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`px-4 md:px-6 py-3 md:py-4 transition-colors border-b-2 border-gray-200 ${
                copiedFile 
                  ? 'hover:bg-blue-500 hover:text-white cursor-pointer' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={copiedFile ? handlePaste : undefined}
            >
              <p className={`text-sm md:text-base ${copiedFile ? 'text-gray-800 hover:text-white' : ''}`}>
                📄 Paste
              </p>
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 text-gray-400 cursor-not-allowed">
              <p className="text-sm md:text-base">New Folder (disabled)</p>
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 text-gray-400 cursor-not-allowed">
              <p className="text-sm md:text-base">Properties (disabled)</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
