import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Gift, BookOpen, X, Check, Sparkles, Crown } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';

interface EmailCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string) => void;
  completedCourse: string;
}

export function EmailCollectionModal({ 
  isOpen, 
  onClose, 
  onEmailSubmit, 
  completedCourse 
}: EmailCollectionModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    onEmailSubmit(email);
    
    // Close modal after success animation
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  const handleSkip = () => {
    onClose();
    setEmail('');
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-yellow-400' :
                i % 4 === 1 ? 'bg-purple-500' :
                i % 4 === 2 ? 'bg-blue-500' : 'bg-green-500'
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
          className="w-full max-w-lg"
        >
          <GlassCard className="p-8 text-center relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-2xl" />
            
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-xl transition-colors group z-20"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10"
                >
                  {/* Success animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="mb-6"
                  >
                    <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 relative">
                      <Crown className="w-12 h-12 text-white" />
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-3">
                      🎉 Course Complete!
                    </h2>
                    <p className="text-gray-300 text-lg mb-2">
                      Amazing work completing
                    </p>
                    <p className="text-purple-300 font-semibold text-xl mb-4">
                      "{completedCourse}"
                    </p>
                  </motion.div>

                  {/* Special Offer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30 mb-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Gift className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-white font-bold text-xl">Special Offer!</h3>
                      </div>
                      <p className="text-yellow-200 font-semibold text-lg mb-2">
                        Get ONE MORE COURSE FREE! 🚀
                      </p>
                      <p className="text-gray-300 text-sm">
                        Enter your email to unlock "Machine Learning Fundamentals" and continue your AI journey at no cost.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <AnimatedButton
                        type="submit"
                        className="w-full flex items-center justify-center gap-2"
                        size="lg"
                        loading={isSubmitting}
                        disabled={!email.trim() || isSubmitting}
                        glowing={!!email.trim() && !isSubmitting}
                        variant="highlight"
                      >
                        {isSubmitting ? (
                          <>Unlocking Your Free Course...</>
                        ) : (
                          <>
                            <Gift className="w-5 h-5" />
                            Claim My Free Course!
                          </>
                        )}
                      </AnimatedButton>
                    </form>
                  </motion.div>

                  {/* Skip option */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <button
                      onClick={handleSkip}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Maybe later, continue to learning hub
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="mb-6"
                  >
                    <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                      <Check className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-3">
                    🎊 Success!
                  </h2>
                  <p className="text-gray-300 text-lg mb-4">
                    Your free course has been unlocked!
                  </p>
                  <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 text-green-300">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-semibold">Machine Learning Fundamentals</span>
                    </div>
                    <p className="text-green-200 text-sm mt-1">
                      Now available in your learning hub!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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