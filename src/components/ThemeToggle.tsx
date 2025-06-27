import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';

export function ThemeToggle() {
  return (
    <motion.div
      className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 opacity-50 cursor-not-allowed"
      title="Dark mode only"
    >
      <Moon className="w-5 h-5 text-gray-400" />
    </motion.div>
  );
}