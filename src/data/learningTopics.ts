import { LearningTopic } from '../types';

export const learningTopics: LearningTopic[] = [
  {
    id: 'intro-ai',
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, including key concepts, types of AI, and real-world applications.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    resources: [
      'AI Fundamentals Course',
      'Introduction to Machine Learning',
      'AI Ethics and Principles'
    ],
    available: true
  },
  {
    id: 'ml-basics',
    title: 'Machine Learning Fundamentals',
    description: 'Understand supervised, unsupervised, and reinforcement learning with practical examples.',
    difficulty: 'beginner',
    estimatedTime: '4-6 hours',
    resources: [
      'Machine Learning Crash Course',
      'Hands-on ML Examples',
      'ML Algorithm Comparison'
    ],
    available: false
  },
  {
    id: 'data-preprocessing',
    title: 'Data Preprocessing and Feature Engineering',
    description: 'Master data cleaning, transformation, and feature selection techniques.',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    resources: [
      'Data Cleaning Best Practices',
      'Feature Engineering Techniques',
      'Data Visualization Tools'
    ],
    available: false
  },
  {
    id: 'nlp-applications',
    title: 'Natural Language Processing Applications',
    description: 'Explore text analysis, sentiment analysis, and language model applications.',
    difficulty: 'intermediate',
    estimatedTime: '5-7 hours',
    resources: [
      'NLP with Python',
      'Text Mining Techniques',
      'Chatbot Development'
    ],
    available: false
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics and Responsible AI',
    description: 'Learn about bias, fairness, transparency, and ethical considerations in AI systems.',
    difficulty: 'intermediate',
    estimatedTime: '2-3 hours',
    resources: [
      'Ethical AI Guidelines',
      'Bias Detection and Mitigation',
      'AI Governance Frameworks'
    ],
    available: false
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering and LLMs',
    description: 'Master the art of crafting effective prompts for large language models.',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    resources: [
      'Prompt Engineering Guide',
      'LLM Best Practices',
      'Advanced Prompting Techniques'
    ],
    available: false
  },
  {
    id: 'ai-product-management',
    title: 'AI in Product Management',
    description: 'Learn how to integrate AI into product strategy, development, and user experience.',
    difficulty: 'intermediate',
    estimatedTime: '4-5 hours',
    resources: [
      'AI Product Strategy',
      'User Research with AI',
      'AI Feature Prioritization'
    ],
    available: false
  },
  {
    id: 'ai-marketing',
    title: 'AI-Powered Marketing',
    description: 'Discover personalization, customer segmentation, and automated marketing with AI.',
    difficulty: 'intermediate',
    estimatedTime: '4-6 hours',
    resources: [
      'Marketing Automation',
      'Customer Analytics',
      'Personalization Strategies'
    ],
    available: false
  },
  {
    id: 'ai-recruitment',
    title: 'AI in Talent Acquisition',
    description: 'Understand resume screening, candidate assessment, and bias-free hiring with AI.',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    resources: [
      'AI Recruiting Tools',
      'Bias-Free Hiring',
      'Candidate Experience Optimization'
    ],
    available: false
  },
  {
    id: 'ai-development',
    title: 'AI for Software Development',
    description: 'Learn about code generation, automated testing, and AI-assisted development.',
    difficulty: 'intermediate',
    estimatedTime: '5-7 hours',
    resources: [
      'AI Code Assistants',
      'Automated Testing with AI',
      'MLOps and Deployment'
    ],
    available: false
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision Basics',
    description: 'Introduction to image recognition, object detection, and visual AI applications.',
    difficulty: 'advanced',
    estimatedTime: '6-8 hours',
    resources: [
      'Image Processing Fundamentals',
      'Object Detection Models',
      'Computer Vision Applications'
    ],
    available: false
  },
  {
    id: 'ai-strategy',
    title: 'AI Strategy and Implementation',
    description: 'Develop organizational AI strategy, change management, and implementation roadmaps.',
    difficulty: 'advanced',
    estimatedTime: '4-6 hours',
    resources: [
      'AI Transformation Strategy',
      'Change Management for AI',
      'ROI Measurement in AI'
    ],
    available: false
  }
];