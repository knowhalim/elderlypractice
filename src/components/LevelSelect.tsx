import { Check, Copy, Mouse } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LevelSelectProps {
  onLevelSelect: (level: number) => void;
  completedLevels: Set<number>;
}

export function LevelSelect({ onLevelSelect, completedLevels }: LevelSelectProps) {
  const levels = [
    { id: 1, title: 'Level 1: Copy & Paste Basics', time: '60 seconds', icon: Copy, description: 'Learn to copy and paste text' },
    { id: 2, title: 'Level 2: Copy & Paste Practice', time: '30 seconds', icon: Copy, description: 'Get faster at copying' },
    { id: 3, title: 'Level 3: Copy & Paste Expert', time: '15 seconds', icon: Copy, description: 'Master copy and paste' },
    { id: 4, title: 'Level 4: Drag & Drop Basics', time: '30 seconds', icon: Mouse, description: 'Learn to drag and drop files' },
    { id: 5, title: 'Level 5: Drag & Drop Practice', time: '15 seconds', icon: Mouse, description: 'Get faster at dragging' },
    { id: 6, title: 'Level 6: Copy & Paste Files', time: '30 seconds', icon: Copy, description: 'Copy files like a pro' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-center mb-4 text-blue-900">
          Computer Skills Training
        </h1>
        <p className="text-center mb-12 text-blue-700">
          Learn basic computer skills step by step
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => {
            const isCompleted = completedLevels.has(level.id);
            const Icon = level.icon;
            
            return (
              <Card
                key={level.id}
                className="p-8 hover:shadow-lg transition-shadow cursor-pointer bg-white border-4 border-blue-300"
                onClick={() => onLevelSelect(level.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-8 h-8 text-white" />
                      ) : (
                        <Icon className="w-8 h-8 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-blue-900">
                      {level.title}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {level.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                        Time: {level.time}
                      </span>
                      {isCompleted && (
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 h-14 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLevelSelect(level.id);
                  }}
                >
                  {isCompleted ? 'Play Again' : 'Start Level'}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
