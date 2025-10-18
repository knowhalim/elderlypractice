import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tutorial } from './Tutorial';
import { Timer } from './Timer';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, XCircle, FileText, Folder } from 'lucide-react';

interface Level5Props {
  onComplete: () => void;
  onBack: () => void;
}

const FILES = [
  { id: 1, name: 'Report.pdf', icon: FileText },
  { id: 2, name: 'Picture.png', icon: FileText },
  { id: 3, name: 'Invoice.doc', icon: FileText },
  { id: 4, name: 'Data.xls', icon: FileText },
  { id: 5, name: 'Music.mp3', icon: FileText },
  { id: 6, name: 'Movie.avi', icon: FileText },
  { id: 7, name: 'Email.txt', icon: FileText },
  { id: 8, name: 'Form.pdf', icon: FileText },
  { id: 9, name: 'Plan.doc', icon: FileText },
  { id: 10, name: 'Info.txt', icon: FileText },
];

interface FileItemProps {
  file: { id: number; name: string; icon: any };
}

function FileItem({ file }: FileItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'file',
    item: { id: file.id, name: file.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const Icon = file.icon;

  return (
    <div
      ref={drag}
      className={`bg-white border-4 border-blue-400 rounded-xl p-4 cursor-move hover:shadow-lg transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Icon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
      <p className="text-center text-gray-700 break-words">{file.name}</p>
    </div>
  );
}

function DropZone({ onDrop, fileCount }: { onDrop: (id: number) => void; fileCount: number }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'file',
    drop: (item: { id: number; name: string }) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`border-8 border-dashed rounded-3xl p-8 min-h-[400px] transition-all ${
        isOver ? 'border-green-500 bg-green-50' : 'border-blue-400 bg-blue-50'
      }`}
    >
      <div className="text-center mb-6">
        <Folder className="w-20 h-20 text-blue-600 mx-auto mb-4" />
        <h3 className="text-blue-900 mb-2">Important Files Folder</h3>
        <p className="text-gray-600">
          Drag files here quickly! ({fileCount}/10)
        </p>
      </div>
      {fileCount > 0 && (
        <div className="text-center">
          <div className="inline-block bg-green-100 border-2 border-green-500 rounded-lg px-6 py-3">
            <p className="text-green-700">
              {fileCount} file{fileCount !== 1 ? 's' : ''} added ✓
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Level5Content({ onComplete, onBack }: Level5Props) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setGameStarted(true);
  };

  const handleDrop = (fileId: number) => {
    const newDropped = new Set(droppedFiles);
    newDropped.add(fileId);
    setDroppedFiles(newDropped);

    if (newDropped.size === 10) {
      setSuccess(true);
      setGameOver(true);
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setSuccess(false);
  };

  const handleRestart = () => {
    setDroppedFiles(new Set());
    setGameOver(false);
    setSuccess(false);
    setGameStarted(true);
  };

  const remainingFiles = FILES.filter(file => !droppedFiles.has(file.id));

  if (showTutorial) {
    return <Tutorial type="drag-drop" level={5} onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="h-12 px-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-blue-900">Level 5: Speed Drag & Drop</h1>
          <div className="w-32" />
        </div>

        {!gameOver && (
          <div className="flex justify-center mb-8">
            <Timer duration={15} onTimeUp={handleTimeUp} isActive={gameStarted} />
          </div>
        )}

        {!gameOver ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-gray-700">Files to Move (Be Quick!):</h3>
              <div className="grid grid-cols-2 gap-4">
                {remainingFiles.map(file => (
                  <FileItem key={file.id} file={file} />
                ))}
              </div>
              {remainingFiles.length === 0 && (
                <div className="text-center p-12 bg-green-50 rounded-3xl border-4 border-green-500">
                  <p className="text-green-700">All files moved!</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-gray-700">Drop Zone:</h3>
              <DropZone onDrop={handleDrop} fileCount={droppedFiles.size} />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-3xl p-12 shadow-xl text-center border-4 ${
              success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}
          >
            {success ? (
              <>
                <Trophy className="w-24 h-24 text-green-600 mx-auto mb-6" />
                <h2 className="mb-4 text-green-900">Outstanding!</h2>
                <p className="mb-8 text-green-700">
                  You're incredibly fast at dragging and dropping!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="h-16 px-12 text-white" onClick={onComplete}>
                    Continue to Final Level
                  </Button>
                  <Button variant="outline" className="h-16 px-12" onClick={handleRestart}>
                    Play Again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-600 mx-auto mb-6" />
                <h2 className="mb-4 text-red-900">Time's Up!</h2>
                <p className="mb-8 text-red-700">
                  You moved {droppedFiles.size}/10 files. Keep practicing!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="h-16 px-12 text-white" onClick={handleRestart}>
                    Try Again
                  </Button>
                  <Button variant="outline" className="h-16 px-12" onClick={onBack}>
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

export function Level5(props: Level5Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Level5Content {...props} />
    </DndProvider>
  );
}
