import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Trophy, BookOpen, Target, TrendingUp, ChevronDown, LogOut } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { useApp } from '../context/AppContext';

export function ProfileSection() {
  const { state, resetTest, setUser } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!state.user) return null;

  const handleLogout = () => {
    setUser(null);
    resetTest();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfileStats = () => {
    const testsCompleted = state.testResult ? 1 : 0;
    const lastScore = state.testResult?.percentage || 0;
    const learningProgress = 15; // Mock data - could be calculated from completed lessons
    
    return { testsCompleted, lastScore, learningProgress };
  };

  const stats = getProfileStats();

  return (
    <motion.div
      className="fixed top-6 right-20 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      style={{ position: 'fixed' }} // Ensure it stays fixed during scroll
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Profile Avatar */}
        <motion.div
          className="profile-card rounded-2xl p-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg profile-glow">
                {getInitials(state.user.name)}
              </div>
              {state.testResult && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="min-w-0">
              <div className="text-white dark:text-white light:text-gray-800 font-semibold text-sm truncate">
                {state.user.name}
              </div>
              <div className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-xs truncate">
                {state.user.role}
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-400 light:text-gray-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Expanded Profile Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-80"
              style={{ position: 'absolute', zIndex: 60 }} // Ensure dropdown stays on top
            >
              <GlassCard className="p-6">
                {/* User Info Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl profile-glow">
                    {getInitials(state.user.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white dark:text-white light:text-gray-800 font-bold text-lg">
                      {state.user.name}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm">
                      {state.user.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 dark:text-green-400 light:text-green-600 text-xs">
                        Active Learner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-blue-400 dark:text-blue-400 light:text-blue-600" />
                    </div>
                    <div className="text-white dark:text-white light:text-gray-800 font-bold text-lg">
                      {stats.testsCompleted}
                    </div>
                    <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
                      Tests
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 dark:bg-green-500/20 light:bg-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" />
                    </div>
                    <div className="text-white dark:text-white light:text-gray-800 font-bold text-lg">
                      {stats.lastScore}%
                    </div>
                    <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
                      Best Score
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-6 h-6 text-purple-400 dark:text-purple-400 light:text-purple-600" />
                    </div>
                    <div className="text-white dark:text-white light:text-gray-800 font-bold text-lg">
                      {stats.learningProgress}%
                    </div>
                    <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
                      Learning
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-white dark:text-white light:text-gray-800 font-semibold text-sm mb-3">
                    Quick Actions
                  </h4>
                  
                  <motion.button
                    onClick={() => {
                      window.history.pushState(null, '', '/learning');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white/20 border border-white/10 dark:border-white/10 light:border-white/30 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-white/30 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-5 h-5 text-blue-400 dark:text-blue-400 light:text-blue-600" />
                    <div>
                      <div className="text-white dark:text-white light:text-gray-800 font-medium text-sm">
                        Continue Learning
                      </div>
                      <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
                        Explore AI topics
                      </div>
                    </div>
                  </motion.button>

                  {state.testResult && (
                    <motion.button
                      onClick={() => {
                        window.history.pushState(null, '', '/results');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white/20 border border-white/10 dark:border-white/10 light:border-white/30 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-white/30 transition-colors text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trophy className="w-5 h-5 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
                      <div>
                        <div className="text-white dark:text-white light:text-gray-800 font-medium text-sm">
                          View Results
                        </div>
                        <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
                          {stats.lastScore}% score
                        </div>
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-white/30">
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-400 dark:text-red-400 light:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-500/10 light:hover:bg-red-500/20"
                    glowing={false}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}