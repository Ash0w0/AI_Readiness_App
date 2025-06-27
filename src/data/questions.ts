import { Question } from '../types';

export const questionBank: Question[] = [
  // Product Manager Questions
  {
    id: 'pm1',
    question: 'What is the primary benefit of using AI in product development?',
    options: [
      'Reducing development costs',
      'Automating user research and data analysis',
      'Eliminating the need for human designers',
      'Speeding up deployment processes'
    ],
    correctAnswer: 1,
    category: 'Product Management',
    difficulty: 'beginner'
  },
  {
    id: 'pm2',
    question: 'Which AI technique is most suitable for personalizing user experiences?',
    options: [
      'Natural Language Processing',
      'Computer Vision',
      'Recommendation Systems',
      'Reinforcement Learning'
    ],
    correctAnswer: 2,
    category: 'Product Management',
    difficulty: 'intermediate'
  },
  {
    id: 'pm3',
    question: 'What ethical consideration is most important when implementing AI in consumer products?',
    options: [
      'Cost optimization',
      'User privacy and data protection',
      'Feature completeness',
      'Market competitiveness'
    ],
    correctAnswer: 1,
    category: 'Product Management',
    difficulty: 'intermediate'
  },

  // Data Analyst Questions
  {
    id: 'da1',
    question: 'What is the main purpose of feature engineering in machine learning?',
    options: [
      'To reduce dataset size',
      'To improve model performance by creating relevant input variables',
      'To visualize data patterns',
      'To clean missing data'
    ],
    correctAnswer: 1,
    category: 'Data Analysis',
    difficulty: 'intermediate'
  },
  {
    id: 'da2',
    question: 'Which metric is best for evaluating a classification model with imbalanced classes?',
    options: [
      'Accuracy',
      'Precision',
      'F1-Score',
      'Mean Squared Error'
    ],
    correctAnswer: 2,
    category: 'Data Analysis',
    difficulty: 'advanced'
  },
  {
    id: 'da3',
    question: 'What does overfitting mean in machine learning?',
    options: [
      'The model performs well on both training and test data',
      'The model performs well on training data but poorly on new data',
      'The model has too few parameters',
      'The model takes too long to train'
    ],
    correctAnswer: 1,
    category: 'Data Analysis',
    difficulty: 'beginner'
  },

  // Digital Marketing Questions
  {
    id: 'dm1',
    question: 'How can AI improve email marketing campaigns?',
    options: [
      'By automatically writing all email content',
      'By personalizing content and optimizing send times',
      'By eliminating the need for A/B testing',
      'By reducing email frequency'
    ],
    correctAnswer: 1,
    category: 'Digital Marketing',
    difficulty: 'beginner'
  },
  {
    id: 'dm2',
    question: 'What is programmatic advertising?',
    options: [
      'Manual ad placement by marketers',
      'Automated buying and selling of ad inventory using AI',
      'Creating ads with programming languages',
      'Advertising software products'
    ],
    correctAnswer: 1,
    category: 'Digital Marketing',
    difficulty: 'intermediate'
  },
  {
    id: 'dm3',
    question: 'Which AI application is most effective for customer segmentation?',
    options: [
      'Natural Language Processing',
      'Computer Vision',
      'Clustering algorithms',
      'Speech recognition'
    ],
    correctAnswer: 2,
    category: 'Digital Marketing',
    difficulty: 'intermediate'
  },

  // Recruiter Questions
  {
    id: 'hr1',
    question: 'What is the main benefit of using AI in resume screening?',
    options: [
      'Eliminating human bias and increasing efficiency',
      'Completely replacing human recruiters',
      'Reducing candidate pool size',
      'Automating salary negotiations'
    ],
    correctAnswer: 0,
    category: 'Human Resources',
    difficulty: 'beginner'
  },
  {
    id: 'hr2',
    question: 'What ethical concern should recruiters consider when using AI for candidate assessment?',
    options: [
      'AI might work too quickly',
      'AI could perpetuate existing biases',
      'AI is too expensive to implement',
      'AI requires too much training data'
    ],
    correctAnswer: 1,
    category: 'Human Resources',
    difficulty: 'intermediate'
  },
  {
    id: 'hr3',
    question: 'How can AI assist in employee retention?',
    options: [
      'By automatically firing underperforming employees',
      'By predicting employee turnover and identifying risk factors',
      'By reducing employee salaries',
      'By eliminating employee feedback systems'
    ],
    correctAnswer: 1,
    category: 'Human Resources',
    difficulty: 'intermediate'
  },

  // Software Developer Questions
  {
    id: 'sd1',
    question: 'What is the primary use of GitHub Copilot in software development?',
    options: [
      'Automatic code deployment',
      'AI-powered code suggestions and completion',
      'Bug detection and fixing',
      'Database management'
    ],
    correctAnswer: 1,
    category: 'Software Development',
    difficulty: 'beginner'
  },
  {
    id: 'sd2',
    question: 'Which AI technique is commonly used for automated testing?',
    options: [
      'Deep Learning',
      'Natural Language Processing',
      'Machine Learning for pattern recognition',
      'Computer Vision'
    ],
    correctAnswer: 2,
    category: 'Software Development',
    difficulty: 'intermediate'
  },
  {
    id: 'sd3',
    question: 'What is the role of AI in DevOps?',
    options: [
      'Replacing all manual processes',
      'Monitoring, anomaly detection, and predictive maintenance',
      'Writing all documentation',
      'Managing team schedules'
    ],
    correctAnswer: 1,
    category: 'Software Development',
    difficulty: 'advanced'
  },

  // General AI Questions
  {
    id: 'gen1',
    question: 'What does "Large Language Model" (LLM) refer to?',
    options: [
      'A database with many languages',
      'An AI model trained on vast amounts of text data',
      'A programming language for AI',
      'A large computer server'
    ],
    correctAnswer: 1,
    category: 'General AI',
    difficulty: 'beginner'
  },
  {
    id: 'gen2',
    question: 'What is the difference between AI, Machine Learning, and Deep Learning?',
    options: [
      'They are all the same thing',
      'AI is the broadest concept, ML is a subset of AI, and DL is a subset of ML',
      'Deep Learning came first, then Machine Learning, then AI',
      'They are completely unrelated fields'
    ],
    correctAnswer: 1,
    category: 'General AI',
    difficulty: 'intermediate'
  },
  {
    id: 'gen3',
    question: 'What is prompt engineering?',
    options: [
      'Building AI hardware',
      'The practice of designing inputs to get desired outputs from AI models',
      'Engineering faster computer processors',
      'Creating user interfaces for AI applications'
    ],
    correctAnswer: 1,
    category: 'General AI',
    difficulty: 'intermediate'
  },
  {
    id: 'gen4',
    question: 'What is the main limitation of current AI systems?',
    options: [
      'They are too expensive',
      'They lack true understanding and can make errors with confidence',
      'They work too slowly',
      'They require too much electricity'
    ],
    correctAnswer: 1,
    category: 'General AI',
    difficulty: 'advanced'
  },
  {
    id: 'gen5',
    question: 'What does "AI hallucination" refer to?',
    options: [
      'AI systems becoming self-aware',
      'When AI generates false or misleading information confidently',
      'AI systems seeing images that aren\'t there',
      'AI systems working too fast'
    ],
    correctAnswer: 1,
    category: 'General AI',
    difficulty: 'intermediate'
  },

  // Additional questions for full test
  {
    id: 'pm4',
    question: 'What is A/B testing in the context of AI-powered features?',
    options: [
      'Testing two different AI models',
      'Comparing AI vs human performance',
      'Testing different versions of a feature with different user groups',
      'Testing AI on two different datasets'
    ],
    correctAnswer: 2,
    category: 'Product Management',
    difficulty: 'intermediate'
  },
  {
    id: 'da4',
    question: 'What is the purpose of cross-validation in machine learning?',
    options: [
      'To validate user inputs',
      'To assess how well a model generalizes to unseen data',
      'To cross-reference different datasets',
      'To validate data quality'
    ],
    correctAnswer: 1,
    category: 'Data Analysis',
    difficulty: 'intermediate'
  },
  {
    id: 'dm4',
    question: 'What is customer lifetime value (CLV) and how can AI help calculate it?',
    options: [
      'The total time a customer uses your product',
      'The total revenue expected from a customer relationship',
      'The number of products a customer buys',
      'The cost of acquiring a customer'
    ],
    correctAnswer: 1,
    category: 'Digital Marketing',
    difficulty: 'advanced'
  },
  {
    id: 'hr4',
    question: 'What is natural language processing (NLP) used for in HR?',
    options: [
      'Translating job descriptions',
      'Analyzing employee feedback and sentiment',
      'Teaching employees new languages',
      'Creating multilingual policies'
    ],
    correctAnswer: 1,
    category: 'Human Resources',
    difficulty: 'intermediate'
  },
  {
    id: 'sd4',
    question: 'What is the purpose of containerization in AI model deployment?',
    options: [
      'To store data efficiently',
      'To package applications with their dependencies for consistent deployment',
      'To create backups of AI models',
      'To compress AI models'
    ],
    correctAnswer: 1,
    category: 'Software Development',
    difficulty: 'advanced'
  }
];

export const jobRoles = [
  'Product Manager',
  'Data Analyst',
  'Digital Marketer',
  'Recruiter',
  'Software Developer',
  'General Professional'
];