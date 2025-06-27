import { Question, TestResult, LearningTopic } from '../types';
import { questionBank } from '../data/questions';
import { learningTopics } from '../data/learningTopics';

export function getQuestionsForTest(testType: 'quick' | 'full', userRole: string): Question[] {
  const questionCount = testType === 'quick' ? 10 : 25;
  
  // Filter questions relevant to user role
  let relevantQuestions = questionBank.filter(q => {
    if (userRole === 'General Professional') return true;
    
    const roleMapping: { [key: string]: string[] } = {
      'Product Manager': ['Product Management', 'General AI'],
      'Data Analyst': ['Data Analysis', 'General AI'],
      'Digital Marketer': ['Digital Marketing', 'General AI'],
      'Recruiter': ['Human Resources', 'General AI'],
      'Software Developer': ['Software Development', 'General AI']
    };
    
    return roleMapping[userRole]?.includes(q.category) || q.category === 'General AI';
  });

  // If we don't have enough questions, add from general pool
  if (relevantQuestions.length < questionCount) {
    const additionalQuestions = questionBank.filter(q => 
      !relevantQuestions.some(rq => rq.id === q.id)
    );
    relevantQuestions = [...relevantQuestions, ...additionalQuestions];
  }

  // Shuffle and select required number of questions
  const shuffled = relevantQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, questionCount);
}

export function calculateTestResult(
  questions: Question[],
  answers: number[],
  userRole: string
): TestResult {
  let correctCount = 0;
  const categoryScores: { [key: string]: { correct: number; total: number } } = {};
  
  questions.forEach((question, index) => {
    const isCorrect = answers[index] === question.correctAnswer;
    if (isCorrect) correctCount++;
    
    if (!categoryScores[question.category]) {
      categoryScores[question.category] = { correct: 0, total: 0 };
    }
    categoryScores[question.category].total++;
    if (isCorrect) categoryScores[question.category].correct++;
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  
  // Determine strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  Object.entries(categoryScores).forEach(([category, scores]) => {
    const categoryPercentage = (scores.correct / scores.total) * 100;
    if (categoryPercentage >= 70) {
      strengths.push(category);
    } else if (categoryPercentage < 50) {
      weaknesses.push(category);
    }
  });

  // Generate suggested learning topics based on weaknesses and role
  const suggestedTopics = getSuggestedLearningTopics(weaknesses, userRole, percentage);

  return {
    score: correctCount,
    totalQuestions: questions.length,
    percentage,
    strengths,
    weaknesses,
    suggestedTopics,
    completedAt: new Date()
  };
}

function getSuggestedLearningTopics(
  weaknesses: string[],
  userRole: string,
  overallPercentage: number
): LearningTopic[] {
  let suggested: LearningTopic[] = [];

  // ALWAYS include the basic AI course as the first suggestion
  const introAI = learningTopics.find(t => t.id === 'intro-ai');
  if (introAI) {
    suggested.push(introAI);
  }

  // If overall score is low, suggest machine learning basics
  if (overallPercentage < 60) {
    const mlBasics = learningTopics.find(t => t.id === 'ml-basics');
    if (mlBasics && !suggested.some(s => s.id === mlBasics.id)) {
      suggested.push(mlBasics);
    }
  }

  // Add role-specific topics based on weaknesses
  const roleTopicMapping: { [key: string]: string[] } = {
    'Product Manager': ['ai-product-management', 'ai-ethics', 'prompt-engineering'],
    'Data Analyst': ['data-preprocessing', 'ml-basics', 'ai-strategy'],
    'Digital Marketer': ['ai-marketing', 'nlp-applications', 'prompt-engineering'],
    'Recruiter': ['ai-recruitment', 'ai-ethics', 'nlp-applications'],
    'Software Developer': ['ai-development', 'prompt-engineering', 'computer-vision']
  };

  const roleTopics = roleTopicMapping[userRole] || ['ai-ethics'];
  roleTopics.forEach(topicId => {
    const topic = learningTopics.find(t => t.id === topicId);
    if (topic && !suggested.some(s => s.id === topic.id)) {
      suggested.push(topic);
    }
  });

  // Add ethics if not already included and score is decent
  if (overallPercentage >= 60 && !suggested.some(t => t.id === 'ai-ethics')) {
    const ethicsTopic = learningTopics.find(t => t.id === 'ai-ethics');
    if (ethicsTopic) suggested.push(ethicsTopic);
  }

  return suggested.slice(0, 4); // Limit to 4 suggestions
}