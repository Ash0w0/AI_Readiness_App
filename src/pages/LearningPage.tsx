import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Lock, Clock, Target } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { learningTopics, isTopicUnlocked } from '../data/learningTopics';

export function LearningPage() {
  const handleTopicClick = (topicId: string) => {
    const available = isTopicUnlocked(topicId);
    if (!available) return;
    window.history.pushState(null, '', `/learning/${topicId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 safe-area-top safe-area-bottom">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-6 sm:pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-4">
            <AnimatedButton
              variant="secondary"
              onClick={handleBackToHome}
              className="flex items-center gap-2"
              glowing={true}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </AnimatedButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">AI Learning Hub</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Enhance your AI knowledge with our curated learning paths. Start with the fundamentals and progress to advanced topics.
          </p>
        </motion.div>

        {/* Learning Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {learningTopics.map((topic, index) => {
            const available = isTopicUnlocked(topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <GlassCard
                  hover={available}
                  className={`p-4 sm:p-6 h-full flex flex-col relative ${
                    available 
                      ? 'cursor-pointer glow-border' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => handleTopicClick(topic.id)}
                >
                  {!available && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{available ? topic.estimatedTime : 'Available Soon'}</span>
                      </div>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${
                      available ? 'text-white' : 'text-gray-400'
                    }`}>
                      {topic.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      available ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-4">
                      <h4 className={`text-xs sm:text-sm font-medium mb-2 ${
                        available ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Learning Resources:
                      </h4>
                      <ul className="space-y-1">
                        {topic.resources.slice(0, 3).map((resource, idx) => (
                          <li key={idx} className={`text-xs flex items-center gap-2 ${
                            available ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                            <span className="truncate">{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`flex items-center justify-between text-xs sm:text-sm ${
                      available ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Interactive</span>
                      </div>
                      <span className="font-medium">
                        {available ? 'Start Learning' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-12 text-gray-400 text-sm sm:text-base"
        >
          <p>Complete courses to unlock new learning paths. Start with the fundamentals to build a strong foundation.</p>
        </motion.div>
      </div>
    </div>
  );
}