import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ThemeToggle() {
  const { state, toggleDarkMode } = useApp();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg bg-white/10 dark:bg-white/5 light:bg-white/20 border border-white/20 dark:border-white/10 light:border-white/30 hover:bg-white/20 dark:hover:bg-white/10 light:hover:bg-white/30 transition-colors glow-border"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: state.darkMode ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {state.darkMode ? (
          <Moon className="w-5 h-5 text-blue-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
}