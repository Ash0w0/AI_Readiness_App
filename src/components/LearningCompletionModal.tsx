import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, ArrowRight, Home, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';

interface LearningCompletionModalProps {
  isOpen: boolean;
  onContinueLearning: () => void;
  onGoHome: () => void;
  completedTopic: string;
}

export function LearningCompletionModal({ 
  isOpen, 
  onContinueLearning, 
  onGoHome, 
  completedTopic 
}: LearningCompletionModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        {/* Celebration particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-yellow-400' :
                i % 3 === 1 ? 'bg-purple-500' : 'bg-blue-500'
              }`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                scale: 0,
                rotate: 0
              }}
              animate={{
                y: -20,
                scale: [0, 1, 0],
                rotate: 360,
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8 text-center relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-2xl" />
            
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="relative z-10 mb-6"
            >
              <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                🎉 Congratulations!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                You've completed
              </p>
              <p className="text-purple-600 dark:text-purple-300 font-semibold text-xl mb-4">
                "{completedTopic}"
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                You're building strong AI foundations! 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 mb-8"
            >
              <div className="bg-white/20 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10">
                <h3 className="text-gray-800 dark:text-white font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  Want to learn more?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Continue your AI journey with more advanced topics and specialized learning paths.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative z-10 space-y-3"
            >
              <AnimatedButton
                onClick={onContinueLearning}
                className="w-full flex items-center justify-center gap-2"
                size="lg"
                glowing={true}
                variant="highlight"
              >
                <BookOpen className="w-5 h-5" />
                Yes, Continue Learning!
                <ArrowRight className="w-5 h-5" />
              </AnimatedButton>
              
              <AnimatedButton
                variant="secondary"
                onClick={onGoHome}
                className="w-full flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                No, Go to Main Page
              </AnimatedButton>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm" />
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500/20 rounded-full blur-sm" />
            <div className="absolute top-1/2 right-8 w-4 h-4 bg-green-500/20 rounded-full blur-sm" />
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}