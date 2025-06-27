import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Award, Home } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { LearningCompletionModal } from '../components/LearningCompletionModal';
import { learningTopics } from '../data/learningTopics';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  completed: boolean;
}

interface KnowledgeCheck {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const introAILessons: Lesson[] = [
  {
    id: 'what-is-ai',
    title: 'What is Artificial Intelligence?',
    duration: '15 min',
    content: `
# What is Artificial Intelligence?

Artificial Intelligence (AI) is a branch of computer science that aims to create machines capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.

## Key Concepts

### 1. Machine Intelligence
AI systems are designed to mimic cognitive functions that humans associate with the human mind, such as:
- **Learning**: Acquiring new information and skills
- **Reasoning**: Using logic to reach conclusions
- **Problem-solving**: Finding solutions to complex challenges
- **Perception**: Interpreting sensory information

### 2. Types of AI
- **Narrow AI (Weak AI)**: Designed for specific tasks (like voice assistants)
- **General AI (Strong AI)**: Hypothetical AI with human-level intelligence across all domains
- **Superintelligence**: AI that surpasses human intelligence (theoretical)

### 3. Real-World Applications
AI is already transforming industries:
- **Healthcare**: Medical diagnosis and drug discovery
- **Transportation**: Self-driving cars and traffic optimization
- **Finance**: Fraud detection and algorithmic trading
- **Entertainment**: Content recommendation systems

## Why AI Matters Today

AI is not just a futuristic concept—it's here now, reshaping how we work, communicate, and solve problems. Understanding AI fundamentals is crucial for professionals in every field.
    `,
    completed: false
  },
  {
    id: 'ai-vs-ml',
    title: 'AI vs Machine Learning vs Deep Learning',
    duration: '20 min',
    content: `
# AI vs Machine Learning vs Deep Learning

Understanding the relationship between these three concepts is fundamental to grasping modern AI.

## The Hierarchy

Think of these as nested concepts:
- **AI** is the broadest category
- **Machine Learning** is a subset of AI
- **Deep Learning** is a subset of Machine Learning

### Artificial Intelligence (AI)
The overarching field focused on creating intelligent machines. AI includes:
- Rule-based systems
- Expert systems
- Machine learning algorithms
- Natural language processing
- Computer vision

### Machine Learning (ML)
A method of achieving AI where machines learn patterns from data without being explicitly programmed for every scenario.

**Key characteristics:**
- Learns from data
- Improves performance over time
- Makes predictions or decisions
- Adapts to new information

### Deep Learning (DL)
A specialized subset of ML that uses neural networks with multiple layers (hence "deep") to model and understand complex patterns.

**Applications:**
- Image recognition
- Natural language processing
- Speech recognition
- Game playing (like AlphaGo)

## Practical Examples

- **AI**: A chess program that follows pre-programmed rules
- **ML**: A spam filter that learns from examples of spam and legitimate emails
- **DL**: A system that can identify objects in photos by learning from millions of labeled images

Understanding these distinctions helps you communicate more precisely about AI technologies and their capabilities.
    `,
    completed: false
  },
  {
    id: 'ai-in-workplace',
    title: 'AI in the Modern Workplace',
    duration: '25 min',
    content: `
# AI in the Modern Workplace

AI is revolutionizing how we work across every industry and role. Let's explore the current landscape and future implications.

## Current AI Applications by Role

### For Managers and Leaders
- **Decision Support**: AI analyzes data to provide insights for strategic decisions
- **Performance Analytics**: Track team productivity and identify improvement areas
- **Risk Assessment**: Predict potential issues before they become problems
- **Resource Optimization**: Allocate resources more efficiently

### For Creative Professionals
- **Content Generation**: AI assists with writing, design, and ideation
- **Personalization**: Create tailored content for different audiences
- **Workflow Automation**: Streamline repetitive creative tasks
- **Trend Analysis**: Identify emerging trends and opportunities

### For Analysts and Researchers
- **Data Processing**: Handle vast datasets quickly and accurately
- **Pattern Recognition**: Identify trends humans might miss
- **Predictive Modeling**: Forecast future outcomes
- **Report Generation**: Automate routine reporting tasks

## Benefits of AI Integration

### Efficiency Gains
- Automate repetitive tasks
- Reduce human error
- Speed up complex processes
- Enable 24/7 operations

### Enhanced Decision Making
- Process more information faster
- Identify patterns and correlations
- Provide data-driven recommendations
- Reduce bias in decision-making

### Innovation Opportunities
- Explore new business models
- Develop innovative products and services
- Improve customer experiences
- Create competitive advantages

## Preparing for an AI-Driven Future

### Essential Skills
1. **AI Literacy**: Understanding AI capabilities and limitations
2. **Data Interpretation**: Making sense of AI-generated insights
3. **Human-AI Collaboration**: Working effectively with AI systems
4. **Ethical Reasoning**: Navigating AI ethics and bias issues
5. **Continuous Learning**: Adapting to rapidly evolving technology

### Career Implications
- Some roles will be automated
- New roles will emerge
- Most roles will be augmented, not replaced
- Emphasis on uniquely human skills will increase

The key is not to fear AI, but to understand and leverage it as a powerful tool for enhancing human capabilities.
    `,
    completed: false
  }
];

const knowledgeChecks: { [key: string]: KnowledgeCheck } = {
  'what-is-ai': {
    question: 'Which of the following best describes Artificial Intelligence?',
    options: [
      'A computer program that follows pre-written instructions',
      'Machines capable of performing tasks that typically require human intelligence',
      'Any software that processes data quickly',
      'A type of advanced calculator'
    ],
    correctAnswer: 1,
    explanation: 'AI is specifically about creating machines that can perform tasks requiring human-like intelligence, such as learning, reasoning, and problem-solving.'
  },
  'ai-vs-ml': {
    question: 'What is the relationship between AI, Machine Learning, and Deep Learning?',
    options: [
      'They are completely separate fields',
      'Machine Learning and Deep Learning are subsets of AI',
      'AI is a subset of Machine Learning',
      'They are different names for the same thing'
    ],
    correctAnswer: 1,
    explanation: 'AI is the broadest category, Machine Learning is a subset of AI, and Deep Learning is a subset of Machine Learning. They form a hierarchy of increasingly specific approaches.'
  },
  'ai-in-workplace': {
    question: 'What is the most important skill for working with AI in the future?',
    options: [
      'Programming ability',
      'Mathematical expertise',
      'AI literacy and human-AI collaboration',
      'Hardware knowledge'
    ],
    correctAnswer: 2,
    explanation: 'While technical skills are valuable, AI literacy and the ability to collaborate effectively with AI systems will be crucial for most professionals, regardless of their technical background.'
  }
};

export function LearningTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessons, setLessons] = useState<Lesson[]>(introAILessons);
  const [showKnowledgeCheck, setShowKnowledgeCheck] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const topic = learningTopics.find(t => t.id === topicId);
  const currentLesson = lessons[currentLessonIndex];
  const knowledgeCheck = knowledgeChecks[currentLesson?.id];

  useEffect(() => {
    // Smooth scroll to top when lesson changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  const handleBack = () => {
    window.history.pushState(null, '', '/learning');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleHome = () => {
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleCompleteLesson = () => {
    setShowKnowledgeCheck(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNextLesson = () => {
    // Mark current lesson as completed
    const updatedLessons = lessons.map((lesson, index) => 
      index === currentLessonIndex ? { ...lesson, completed: true } : lesson
    );
    setLessons(updatedLessons);

    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Check if this is the last lesson
    const isLastLesson = currentLessonIndex === lessons.length - 1;

    // Move to next lesson or complete course after a delay
    setTimeout(() => {
      if (!isLastLesson) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setShowKnowledgeCheck(false);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Course completed - show completion modal
        setCourseCompleted(true);
        setShowCompletionModal(true);
      }
    }, 1500);
  };

  const handleContinueLearning = () => {
    setShowCompletionModal(false);
    window.history.pushState(null, '', '/learning');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleGoHome = () => {
    setShowCompletionModal(false);
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const completedLessons = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <AnimatedButton onClick={handleBack}>
            Go Back to Learning Hub
          </AnimatedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 pt-8"
        >
          <div className="flex items-center gap-4">
            <AnimatedButton
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2"
              glowing={true}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Learning Hub
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              onClick={handleHome}
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Home
            </AnimatedButton>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">
              {completedLessons} of {lessons.length} lessons completed
            </div>
            <div className="w-32 bg-white/10 rounded-full h-2 mt-1">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">{topic.title}</h2>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <motion.button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentLessonIndex(index);
                        setShowKnowledgeCheck(false);
                        setSelectedAnswer(null);
                        setShowResult(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        index === currentLessonIndex
                          ? 'bg-purple-500/20 border border-purple-500/30'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-green-500 text-white'
                            : index === currentLessonIndex
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            index === currentLessonIndex ? 'text-white' : 'text-gray-300'
                          }`}>
                            {lesson.title}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!showKnowledgeCheck ? (
                <motion.div
                  key="lesson-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">{currentLesson.title}</h1>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <div 
                        className="text-gray-300 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ 
                          __html: currentLesson.content
                            .split('\n')
                            .map(line => {
                              if (line.startsWith('# ')) {
                                return `<h1 class="text-3xl font-bold text-white mb-6 mt-8">${line.slice(2)}</h1>`;
                              } else if (line.startsWith('## ')) {
                                return `<h2 class="text-2xl font-semibold text-white mb-4 mt-6">${line.slice(3)}</h2>`;
                              } else if (line.startsWith('### ')) {
                                return `<h3 class="text-xl font-semibold text-purple-300 mb-3 mt-4">${line.slice(4)}</h3>`;
                              } else if (line.startsWith('- **')) {
                                const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                                if (match) {
                                  return `<div class="flex items-start gap-2 mb-2"><div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div><div><strong class="text-purple-300">${match[1]}</strong>: ${match[2]}</div></div>`;
                                }
                              } else if (line.startsWith('- ')) {
                                return `<div class="flex items-start gap-2 mb-2"><div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div><div>${line.slice(2)}</div></div>`;
                              } else if (line.trim() === '') {
                                return '<br>';
                              }
                              return `<p class="mb-4">${line}</p>`;
                            })
                            .join('')
                        }}
                      />
                    </div>

                    <div className="flex justify-end mt-8">
                      <AnimatedButton
                        onClick={handleCompleteLesson}
                        className="flex items-center gap-2"
                        glowing={true}
                        variant="highlight"
                      >
                        <Play className="w-5 h-5" />
                        Complete Lesson
                      </AnimatedButton>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="knowledge-check"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Award className="w-6 h-6 text-orange-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Knowledge Check</h2>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl text-white mb-6">{knowledgeCheck.question}</h3>
                      <div className="space-y-3">
                        {knowledgeCheck.options.map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                              showResult
                                ? index === knowledgeCheck.correctAnswer
                                  ? 'border-green-500 bg-green-500/20 text-green-300'
                                  : selectedAnswer === index
                                  ? 'border-red-500 bg-red-500/20 text-red-300'
                                  : 'border-gray-600 bg-gray-600/10 text-gray-400'
                                : selectedAnswer === index
                                ? 'border-purple-500 bg-purple-500/20 text-white'
                                : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
                            }`}
                            whileHover={!showResult ? { scale: 1.01 } : {}}
                            whileTap={!showResult ? { scale: 0.99 } : {}}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                showResult
                                  ? index === knowledgeCheck.correctAnswer
                                    ? 'border-green-500 bg-green-500'
                                    : selectedAnswer === index
                                    ? 'border-red-500 bg-red-500'
                                    : 'border-gray-600'
                                  : selectedAnswer === index
                                  ? 'border-purple-500 bg-purple-500'
                                  : 'border-gray-400'
                              }`}>
                                {showResult && index === knowledgeCheck.correctAnswer && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                                {showResult && selectedAnswer === index && index !== knowledgeCheck.correctAnswer && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                                {!showResult && selectedAnswer === index && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                      >
                        <div className={`p-4 rounded-xl ${
                          selectedAnswer === knowledgeCheck.correctAnswer
                            ? 'bg-green-500/20 border border-green-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30'
                        }`}>
                          <h4 className="font-semibold text-white mb-2">
                            {selectedAnswer === knowledgeCheck.correctAnswer ? '🎉 Correct!' : '💡 Explanation'}
                          </h4>
                          <p className="text-gray-300">{knowledgeCheck.explanation}</p>
                        </div>
                      </motion.div>
                    )}

                    {showResult && (
                      <div className="flex justify-end">
                        <AnimatedButton
                          onClick={handleNextLesson}
                          className="flex items-center gap-2"
                          glowing={true}
                          variant="highlight"
                        >
                          {currentLessonIndex < lessons.length - 1 ? 'Next Lesson' : 'Complete Course'}
                          <CheckCircle className="w-5 h-5" />
                        </AnimatedButton>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Learning Completion Modal */}
      <LearningCompletionModal
        isOpen={showCompletionModal}
        onContinueLearning={handleContinueLearning}
        onGoHome={handleGoHome}
        completedTopic={topic?.title || ''}
      />
    </div>
  );
}