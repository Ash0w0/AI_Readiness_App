import { motion } from 'framer-motion';

export function BoltCircle() {
  const handleClick = () => {
    window.open('https://bolt.new', '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <motion.img
        src="/src/assets/white_circle_360x360.png"
        alt="Powered by Bolt"
        className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}