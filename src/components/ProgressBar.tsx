import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className={`w-full bg-white/10 dark:bg-white/5 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}