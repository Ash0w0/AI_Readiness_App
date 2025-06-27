import { motion } from 'framer-motion';
import { useState } from 'react';

export function BoltCircle() {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    window.open('https://bolt.new', '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {!imageError ? (
        <motion.img
          src="/white_circle_360x360 copy copy copy.png"
          alt="Powered by Bolt"
          className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
          onError={handleImageError}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}
        />
      ) : (
        <motion.div
          className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-white/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="text-white text-xs font-bold">BOLT</span>
        </motion.div>
      )}
    </motion.div>
  );
}