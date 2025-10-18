import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = percentage < 30;
  const isDanger = percentage < 10;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-700">Time Remaining:</span>
        <motion.span
          animate={{ scale: isDanger ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isDanger ? Infinity : 0, duration: 0.5 }}
          className={`${
            isDanger ? 'text-red-600' : isWarning ? 'text-orange-600' : 'text-green-600'
          }`}
        >
          {timeLeft}s
        </motion.span>
      </div>
      <div className="h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
        <motion.div
          className={`h-full ${
            isDanger ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-green-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
