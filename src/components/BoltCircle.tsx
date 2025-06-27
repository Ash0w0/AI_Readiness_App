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
      <motion.div
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-lg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-800"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}