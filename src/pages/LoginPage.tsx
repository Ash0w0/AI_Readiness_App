import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronDown } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { useApp } from '../context/AppContext';
import { jobRoles } from '../data/questions';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const { setUser, state } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedRole) {
      setUser({ name: name.trim(), role: selectedRole });
      onLogin();
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 safe-area-top safe-area-bottom ${
      state.darkMode 
        ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' 
        : 'light-bg-primary'
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          state.darkMode ? 'bg-purple-500/20' : 'bg-white/30'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          state.darkMode ? 'bg-blue-500/20' : 'bg-white/20'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
          state.darkMode ? 'bg-indigo-500/10' : 'bg-white/10'
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            className="flex justify-center mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Brain className={`w-12 h-12 sm:w-16 sm:h-16 ${
              state.darkMode ? 'text-purple-400' : 'text-white'
            }`} />
          </motion.div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            state.darkMode ? 'text-white' : 'text-white'
          }`}>SkillScan AI</h1>
          <p className={`text-sm sm:text-base ${
            state.darkMode ? 'text-gray-300' : 'text-white/90'
          }`}>Assess your AI skills and unlock your potential</p>
        </motion.div>

        <GlassCard className={`p-6 sm:p-8 ${
          state.darkMode ? '' : 'card-light'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                state.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base ${
                  state.darkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white/30 border-white/40 text-gray-800 placeholder-gray-600 backdrop-blur-sm'
                }`}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="role" className={`block text-sm font-medium mb-2 ${
                state.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Current Job Role
              </label>
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all flex items-center justify-between text-base ${
                  state.darkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/30 border-white/40 text-gray-800 backdrop-blur-sm'
                }`}
              >
                <span className={selectedRole ? '' : (state.darkMode ? 'text-gray-400' : 'text-gray-600')}>
                  {selectedRole || 'Select your role'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRoleDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-20 max-h-60 overflow-y-auto shadow-2xl border ${
                    state.darkMode 
                      ? 'bg-gray-900/95 backdrop-blur-xl border-white/30' 
                      : 'bg-white/90 backdrop-blur-xl border-white/50'
                  }`}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: state.darkMode ? 'rgba(255, 255, 255, 0.3) transparent' : 'rgba(0, 0, 0, 0.3) transparent'
                  }}
                >
                  <div className="py-1">
                    {jobRoles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full px-4 py-3 sm:py-4 text-left transition-colors border-none bg-transparent focus:outline-none text-base ${
                          state.darkMode 
                            ? 'text-white hover:bg-white/15 focus:bg-white/20' 
                            : 'text-gray-800 hover:bg-white/30 focus:bg-white/40'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Journey Button Container */}
            <div>
              <AnimatedButton
                type="submit"
                size="lg"
                className="w-full journey-button btn-mobile"
                disabled={!name.trim() || !selectedRole}
                variant="journey"
              >
                Start Your AI Journey
              </AnimatedButton>
            </div>
          </form>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-center mt-6 text-sm ${
            state.darkMode ? 'text-gray-400' : 'text-white/80'
          }`}
        >
          Discover your AI readiness level with SkillScan AI
        </motion.div>
      </motion.div>
    </div>
  );
}