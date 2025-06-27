import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, BookOpen, RotateCcw, Share2, Lock } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ShareModal } from '../components/ShareModal';
import { useApp } from '../context/AppContext';

interface ResultsPageProps {
  onRestart: () => void;
}

export function ResultsPage({ onRestart }: ResultsPageProps) {
  const { state, resetTest } = useApp();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const result = state.testResult;
  if (!result) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = result.percentage / 50;
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= result.percentage) {
            clearInterval(interval);
            return result.percentage;
          }
          return Math.min(prev + increment, result.percentage);
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [result.percentage]);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! You have strong AI knowledge.';
    if (score >= 60) return 'Good job! You have solid AI fundamentals.';
    if (score >= 40) return 'Not bad! There\'s room for improvement.';
    return 'Keep learning! AI skills will benefit your career.';
  };

  const handleNewTest = () => {
    resetTest();
    onRestart();
  };

  const handleLearningClick = (topicId: string, available: boolean) => {
    if (!available) return;
    window.history.pushState(null, '', `/learning/${topicId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Only allow intro-ai to be clickable, grey out others
  const isTopicAvailable = (topicId: string) => {
    return topicId === 'intro-ai';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4" data-results-page>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Assessment Complete!</h1>
          <p className="text-gray-300 text-lg">Here are your SkillScan AI results</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Score Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="mb-6"
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${getScoreColor(result.percentage)} mb-4`}>
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    className="text-6xl font-bold text-white mb-2"
                  >
                    {Math.round(animatedScore)}%
                  </motion.div>
                  <p className="text-gray-300 text-lg mb-2">
                    {result.score} out of {result.totalQuestions} correct
                  </p>
                  <p className="text-gray-400">
                    {getScoreMessage(result.percentage)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {result.strengths.length}
                    </div>
                    <div className="text-gray-400 text-sm">Strengths</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">
                      {result.weaknesses.length}
                    </div>
                    <div className="text-gray-400 text-sm">Areas to Improve</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: showDetails ? 1 : 0, x: showDetails ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Your Strengths</h3>
                </div>
                {result.strengths.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.strengths.map((strength, index) => (
                      <motion.span
                        key={strength}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium"
                      >
                        {strength}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Keep learning to identify your strengths!</p>
                )}
              </GlassCard>
            </motion.div>

            {/* Areas to Improve */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: showDetails ? 1 : 0, x: showDetails ? 0 : 20 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Target className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Areas to Focus On</h3>
                </div>
                {result.weaknesses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.weaknesses.map((weakness, index) => (
                      <motion.span
                        key={weakness}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium"
                      >
                        {weakness}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Great! No major weak areas identified.</p>
                )}
              </GlassCard>
            </motion.div>

            {/* Learning Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: showDetails ? 1 : 0, x: showDetails ? 0 : 20 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Recommended Learning</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.suggestedTopics.map((topic, index) => {
                    const available = isTopicAvailable(topic.id);
                    return (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className={`p-4 rounded-xl border transition-colors relative ${
                          available 
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer group' 
                            : 'bg-gray-600/20 border-gray-600/30 opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => handleLearningClick(topic.id, available)}
                      >
                        {!available && (
                          <div className="absolute top-3 right-3">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <h4 className={`font-semibold mb-2 transition-colors ${
                          available 
                            ? 'text-white group-hover:text-purple-300' 
                            : 'text-gray-400'
                        }`}>
                          {topic.title}
                        </h4>
                        <p className={`text-sm mb-3 ${
                          available ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {topic.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded-full ${
                            available ? (
                              topic.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                              topic.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            ) : 'bg-gray-600/20 text-gray-500'
                          }`}>
                            {topic.difficulty}
                          </span>
                          <span className={available ? 'text-gray-400' : 'text-gray-500'}>
                            {available ? topic.estimatedTime : 'Available Soon'}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4 mt-12 mb-8"
        >
          <AnimatedButton
            variant="secondary"
            onClick={handleNewTest}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Take Another Test
          </AnimatedButton>
          <AnimatedButton
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2"
            glowing={true}
            variant="highlight"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </AnimatedButton>
        </motion.div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        result={result}
        userName={state.user?.name || 'User'}
      />
    </div>
  );
}