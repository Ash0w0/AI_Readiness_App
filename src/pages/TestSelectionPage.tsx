import { motion } from 'framer-motion';
import { Clock, Zap, Target, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { useApp } from '../context/AppContext';

interface TestSelectionPageProps {
  onTestSelect: (testType: 'quick' | 'full') => void;
}

export function TestSelectionPage({ onTestSelect }: TestSelectionPageProps) {
  const { state } = useApp();

  const testOptions = [
    {
      type: 'quick' as const,
      title: 'Quick Test',
      duration: '5 minutes',
      questions: 10,
      description: 'Get a rapid assessment of your core AI knowledge',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      features: ['Essential AI concepts', 'Basic terminology', 'Quick results']
    },
    {
      type: 'full' as const,
      title: 'Full Assessment',
      duration: '22 minutes',
      questions: 25,
      description: 'Comprehensive evaluation of your AI readiness',
      icon: Target,
      color: 'from-purple-500 to-blue-500',
      features: ['In-depth analysis', 'Role-specific questions', 'Detailed recommendations']
    }
  ];

  return (
    <div className={`min-h-screen p-4 safe-area-top safe-area-bottom ${
      state.darkMode 
        ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' 
        : 'light-bg-secondary'
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          state.darkMode ? 'bg-purple-500/20' : 'bg-white/30'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          state.darkMode ? 'bg-blue-500/20' : 'bg-white/20'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 pt-6 sm:pt-8"
        >
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            state.darkMode ? 'text-white' : 'text-white'
          }`}>
            Welcome, {state.user?.name}!
          </h1>
          <p className={`text-lg sm:text-xl mb-2 ${
            state.darkMode ? 'text-gray-300' : 'text-white/90'
          }`}>
            Ready to test your AI knowledge as a {state.user?.role}?
          </p>
          <p className={`text-sm sm:text-base ${
            state.darkMode ? 'text-gray-400' : 'text-white/80'
          }`}>
            Choose your assessment type below
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {testOptions.map((option, index) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="h-full"
            >
              <GlassCard 
                hover 
                className={`p-6 sm:p-8 h-full flex flex-col ${
                  state.darkMode ? '' : 'card-light'
                }`} 
                onClick={() => onTestSelect(option.type)}
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${option.color} mb-4`}>
                    <option.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                    state.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>{option.title}</h3>
                  <p className={`text-sm sm:text-base ${
                    state.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{option.description}</p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className={`flex items-center justify-between text-sm sm:text-base ${
                    state.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold">{option.duration}</span>
                  </div>
                  <div className={`flex items-center justify-between text-sm sm:text-base ${
                    state.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Questions</span>
                    </div>
                    <span className="font-semibold">{option.questions}</span>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8 flex-grow">
                  <h4 className={`font-semibold mb-3 text-sm sm:text-base ${
                    state.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>What's included:</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-sm sm:text-base ${
                        state.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <AnimatedButton
                    className="w-full btn-mobile"
                    onClick={() => onTestSelect(option.type)}
                    variant="primary"
                  >
                    <span>Start {option.title}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-center mt-8 sm:mt-12 text-sm sm:text-base ${
            state.darkMode ? 'text-gray-400' : 'text-white/80'
          }`}
        >
          <p>Your progress will be saved automatically. You can switch between questions freely.</p>
        </motion.div>
      </div>
    </div>
  );
}