import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { useApp } from '../context/AppContext';
import { getQuestionsForTest, calculateTestResult } from '../utils/testLogic';
import { Question } from '../types';

interface TestPageProps {
  onTestComplete: () => void;
}

export function TestPage({ onTestComplete }: TestPageProps) {
  const { state, answerQuestion, nextQuestion, previousQuestion, finishTest } = useApp();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  useEffect(() => {
    if (state.currentTest && state.user) {
      const testQuestions = getQuestionsForTest(state.currentTest.type, state.user.role);
      setQuestions(testQuestions);
      setTimeRemaining(state.currentTest.timeLimit * 60); // Convert to seconds
    }
  }, [state.currentTest, state.user]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  useEffect(() => {
    // Update selected answer when question changes
    setSelectedAnswer(state.answers[state.currentQuestionIndex] ?? -1);
  }, [state.currentQuestionIndex, state.answers]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    answerQuestion(answerIndex);
  };

  const handleNextQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      handleFinishTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const handleFinishTest = () => {
    if (state.user && questions.length > 0) {
      const result = calculateTestResult(questions, state.answers, state.user.role);
      finishTest(result);
      onTestComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const answeredQuestions = state.answers.filter(a => a !== -1).length;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your personalized test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-black p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 pt-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              SkillScan AI Assessment
            </h1>
            <p className="text-gray-300">
              Question {state.currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5" />
              <span>{answeredQuestions}/{questions.length}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              <span className={timeRemaining < 300 ? 'text-red-400' : ''}>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mb-8"
        >
          <ProgressBar 
            current={state.currentQuestionIndex + 1} 
            total={questions.length} 
          />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8 mb-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {currentQuestion.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium capitalize">
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-400'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <AnimatedButton
            variant="secondary"
            onClick={handlePreviousQuestion}
            disabled={state.currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </AnimatedButton>

          <div className="text-gray-400 text-sm">
            {selectedAnswer === -1 ? 'Select an answer to continue' : 'Answer selected'}
          </div>

          <AnimatedButton
            onClick={handleNextQuestion}
            disabled={selectedAnswer === -1}
            className="flex items-center gap-2"
          >
            {isLastQuestion ? 'Finish Test' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}