import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, Settings, BookOpen, Target, TrendingUp, LogOut, Home } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { useApp } from '../context/AppContext';

export function ProfileButton() {
  const { state, resetTest, setUser } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  if (!state.user) return null;

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleLogout = () => {
    setIsExpanded(false);
    setUser(null);
    resetTest();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleNavigation = (path: string) => {
    setIsExpanded(false);
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleProfileClick = () => {
    setIsExpanded(!isExpanded);
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
      ref={profileRef}
      className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 safe-area-top safe-area-right"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Compact Profile Button */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleProfileClick}
      >
        <div className="flex items-center gap-2 p-2 sm:p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
          {/* User Initials */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm profile-glow">
            {getInitials(state.user.name)}
          </div>
          
          {/* Trophy Icon (if user has completed test) */}
          {state.testResult && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </motion.div>
          )}
        </div>

        {/* Expanded Profile Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-72 sm:w-80"
              style={{ zIndex: 60 }}
            >
              <GlassCard className="p-4 sm:p-6">
                {/* User Info Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl profile-glow">
                    {getInitials(state.user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg truncate">
                      {state.user.name}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm truncate">
                      {state.user.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs">
                        Active Learner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div className="text-white font-bold text-base sm:text-lg">
                      {stats.testsCompleted}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Tests
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    </div>
                    <div className="text-white font-bold text-base sm:text-lg">
                      {stats.lastScore}%
                    </div>
                    <div className="text-gray-400 text-xs">
                      Best Score
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div className="text-white font-bold text-base sm:text-lg">
                      {stats.learningProgress}%
                    </div>
                    <div className="text-gray-400 text-xs">
                      Learning
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
                    Quick Actions
                  </h4>
                  
                  <motion.button
                    onClick={() => handleNavigation('/test-selection')}
                    className="w-full flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium text-xs sm:text-sm">
                        Home
                      </div>
                      <div className="text-gray-400 text-xs">
                        Back to main page
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleNavigation('/learning')}
                    className="w-full flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium text-xs sm:text-sm">
                        Continue Learning
                      </div>
                      <div className="text-gray-400 text-xs">
                        Explore AI topics
                      </div>
                    </div>
                  </motion.button>

                  {state.testResult && (
                    <motion.button
                      onClick={() => handleNavigation('/results')}
                      className="w-full flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      <div>
                        <div className="text-white font-medium text-xs sm:text-sm">
                          View Results
                        </div>
                        <div className="text-gray-400 text-xs">
                          {stats.lastScore}% score
                        </div>
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Logout Button */}
                <div className="pt-3 sm:pt-4 border-t border-white/10">
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 text-xs sm:text-sm"
                    glowing={false}
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
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