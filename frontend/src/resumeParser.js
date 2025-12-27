// Resume Parser Utility - Extracts skills and generates interview questions

export const extractSkillsFromResume = (text) => {
  const skillKeywords = {
    'JavaScript': ['javascript', 'js', 'es6', 'node', 'nodejs', 'node.js', 'express', 'async', 'await'],
    'Python': ['python', 'django', 'flask', 'pandas', 'numpy', 'pytorch', 'scikit', 'pip'],
    'React': ['react', 'jsx', 'redux', 'hooks', 'recoil', 'context', 'useState', 'useEffect'],
    'Java': ['java', 'spring', 'junit', 'maven', 'gradle', 'servlet', 'jpa', 'hibernate'],
    'SQL': ['sql', 'mysql', 'postgresql', 'oracle', 'database', 'query', 'join', 'normalize'],
    'MongoDB': ['mongodb', 'nosql', 'mongoose', 'document', 'database', 'collection'],
    'Machine Learning': ['machine learning', 'ml', 'tensorflow', 'keras', 'sklearn', 'deep learning', 'neural', 'nlp', 'classification', 'regression'],
    'AWS': ['aws', 'amazon', 's3', 'ec2', 'lambda', 'cloud', 'rds', 'iam', 'cloudfront'],
    'Docker': ['docker', 'kubernetes', 'container', 'k8s', 'pod', 'deployment'],
    'Git': ['git', 'github', 'gitlab', 'version control', 'commit', 'branch', 'merge'],
    'HTML/CSS': ['html', 'css', 'bootstrap', 'tailwind', 'scss', 'sass', 'responsive'],
    'API': ['api', 'rest', 'graphql', 'endpoint', 'http', 'request', 'response'],
    'TypeScript': ['typescript', 'ts', 'type', 'interface', 'generic'],
    'Angular': ['angular', 'ng', 'rxjs', 'observable'],
    'Vue': ['vue', 'vuex', 'pinia'],
    'Data Science': ['data science', 'analytics', 'visualization', 'tableau', 'power bi', 'matplotlib', 'seaborn', 'excel'],
    'C++': ['c++', 'cpp', 'oop', 'stl', 'pointer', 'reference'],
    'DevOps': ['devops', 'ci/cd', 'jenkins', 'ansible', 'terraform', 'gitlab ci', 'github actions'],
    'Agile': ['agile', 'scrum', 'kanban', 'sprint', 'jira', 'confluence'],
    'Node.js': ['node', 'nodejs', 'express', 'npm', 'yarn', 'npm package'],
    'Web Development': ['web development', 'frontend', 'backend', 'fullstack', 'mern'],
    'Linux': ['linux', 'ubuntu', 'bash', 'shell', 'terminal', 'command line'],
    'Redis': ['redis', 'cache', 'session', 'memory store'],
    'Testing': ['test', 'jest', 'mocha', 'chai', 'testing library', 'unit test', 'integration test'],
    'GraphQL': ['graphql', 'apollo', 'query', 'mutation', 'subscription'],
    'Mobile': ['react native', 'flutter', 'ios', 'android', 'swift', 'kotlin'],
    'C#': ['c#', 'csharp', '.net', 'asp.net', 'unity'],
    'Go': ['golang', 'go language'],
    'PHP': ['php', 'laravel', 'wordpress', 'symfony'],
    'Ruby': ['ruby', 'rails', 'gem'],
  };

  const textLower = text.toLowerCase();
  const foundSkills = new Set();

  for (const [skill, keywords] of Object.entries(skillKeywords)) {
    for (const keyword of keywords) {
      // Use word boundary matching to avoid partial matches
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(textLower)) {
        foundSkills.add(skill);
        break;
      }
    }
  }

  return Array.from(foundSkills);
};

export const generateInterviewQuestions = (skills) => {
  const basicQuestions = [
    { type: 'Technical', question: 'Tell us about yourself and your professional background.', guidance: 'Highlight your experience, skills, and achievements.' },
    { type: 'Technical', question: 'What are your key strengths as a professional?', guidance: 'Mention 2-3 strengths with concrete examples.' },
    { type: 'Technical', question: 'Can you describe your most challenging project?', guidance: 'Use STAR method: Situation, Task, Action, Result.' },
    { type: 'HR', question: 'How do you handle tight deadlines?', guidance: 'Provide specific examples of prioritization and execution.' },
    { type: 'HR', question: 'Why are you interested in this position?', guidance: 'Show genuine interest and alignment with the company.' },
    { type: 'Technical', question: 'What is your approach to problem-solving?', guidance: 'Explain your methodology and critical thinking process.' },
    { type: 'HR', question: 'How do you stay updated with the latest technologies?', guidance: 'Mention courses, blogs, projects, communities.' }
  ];

  const skillSpecificQuestions = {
    'JavaScript': [
      { type: 'Technical', question: 'Explain the concept of closures in JavaScript.', guidance: 'Discuss lexical scoping and practical use cases.' },
      { type: 'Technical', question: 'What is the difference between var, let, and const?', guidance: 'Explain scope, hoisting, and temporal dead zone.' },
      { type: 'Technical', question: 'How does event bubbling work?', guidance: 'Explain event propagation, delegation, and preventDefault.' },
      { type: 'Technical', question: 'Explain callback functions and promises.', guidance: 'Discuss async patterns and promise states.' },
      { type: 'Technical', question: 'What are arrow functions and how do they differ from regular functions?', guidance: 'Explain this binding and arrow function syntax.' }
    ],
    'Python': [
      { type: 'Technical', question: 'Explain list comprehensions in Python.', guidance: 'Show syntax and practical examples.' },
      { type: 'Technical', question: 'What is the difference between mutable and immutable objects?', guidance: 'Provide examples like lists vs tuples.' },
      { type: 'Technical', question: 'How does garbage collection work in Python?', guidance: 'Discuss reference counting and cycles.' },
      { type: 'Technical', question: 'Explain decorators in Python.', guidance: 'Show use cases and implementation patterns.' },
      { type: 'Technical', question: 'What are generators and how do they differ from lists?', guidance: 'Discuss memory efficiency and lazy evaluation.' }
    ],
    'React': [
      { type: 'Technical', question: 'What is the virtual DOM and how does it work?', guidance: 'Explain React rendering and reconciliation.' },
      { type: 'Technical', question: 'Explain the difference between controlled and uncontrolled components.', guidance: 'Discuss state management and form handling.' },
      { type: 'Technical', question: 'What are React hooks and why are they useful?', guidance: 'Explain useState, useEffect, and custom hooks.' },
      { type: 'Technical', question: 'Explain the component lifecycle in React.', guidance: 'Discuss mounting, updating, and unmounting phases.' },
      { type: 'Technical', question: 'How does React handle state management?', guidance: 'Discuss props, state, and context API.' }
    ],
    'Machine Learning': [
      { type: 'Technical', question: 'Explain the difference between supervised and unsupervised learning.', guidance: 'Provide examples of each type.' },
      { type: 'Technical', question: 'What is overfitting and how do you prevent it?', guidance: 'Discuss regularization and cross-validation.' },
      { type: 'Technical', question: 'Describe the steps in a typical ML project workflow.', guidance: 'From data collection to model deployment.' },
      { type: 'Technical', question: 'What are common evaluation metrics for ML models?', guidance: 'Discuss accuracy, precision, recall, F1-score.' },
      { type: 'Technical', question: 'Explain the concept of feature engineering.', guidance: 'Discuss feature selection and transformation.' }
    ],
    'SQL': [
      { type: 'Technical', question: 'Explain different types of SQL joins.', guidance: 'Discuss INNER, LEFT, RIGHT, FULL joins.' },
      { type: 'Technical', question: 'What is normalization and why is it important?', guidance: 'Explain database design principles.' },
      { type: 'Technical', question: 'How do you optimize database queries?', guidance: 'Discuss indexing, query optimization, and execution plans.' },
      { type: 'Technical', question: 'Explain the difference between WHERE and HAVING.', guidance: 'Discuss filtering logic and aggregate functions.' },
      { type: 'Technical', question: 'What are indexes and how do they improve performance?', guidance: 'Explain index types and trade-offs.' }
    ],
    'AWS': [
      { type: 'Technical', question: 'What are the main AWS services you\'ve worked with?', guidance: 'Discuss specific services and use cases.' },
      { type: 'Technical', question: 'Explain the difference between EC2 and Lambda.', guidance: 'Compare compute models and use cases.' },
      { type: 'Technical', question: 'How do you ensure security in AWS?', guidance: 'Discuss IAM, VPC, encryption, and compliance.' },
      { type: 'Technical', question: 'What is S3 and how is it used?', guidance: 'Discuss object storage and use cases.' },
      { type: 'Technical', question: 'Explain auto-scaling in AWS.', guidance: 'Discuss scaling policies and triggers.' }
    ],
    'Docker': [
      { type: 'Technical', question: 'What is Docker and why is containerization important?', guidance: 'Discuss portability and consistency.' },
      { type: 'Technical', question: 'Explain the difference between images and containers.', guidance: 'Discuss templates and instances.' },
      { type: 'Technical', question: 'How do you create a Docker image?', guidance: 'Discuss Dockerfile and best practices.' },
      { type: 'Technical', question: 'What are Docker volumes and networks?', guidance: 'Discuss data persistence and communication.' },
      { type: 'Technical', question: 'Explain Docker Compose and its use cases.', guidance: 'Discuss multi-container applications.' }
    ],
    'Data Science': [
      { type: 'Technical', question: 'Walk me through your data analysis process.', guidance: 'Discuss steps from data cleaning to insights.' },
      { type: 'Technical', question: 'How do you handle missing data?', guidance: 'Discuss imputation strategies and trade-offs.' },
      { type: 'Technical', question: 'Explain different data visualization techniques.', guidance: 'Discuss charts, graphs, and best practices.' },
      { type: 'Technical', question: 'What statistical concepts are most important in data science?', guidance: 'Discuss hypothesis testing, distributions, correlation.' },
      { type: 'Technical', question: 'How do you validate your data analysis results?', guidance: 'Discuss verification and statistical testing.' }
    ],
    'Agile': [
      { type: 'HR', question: 'Explain Agile methodology and its principles.', guidance: 'Discuss iterative development and flexibility.' },
      { type: 'HR', question: 'What is the difference between Agile and Waterfall?', guidance: 'Compare approaches and their contexts.' },
      { type: 'HR', question: 'How do you handle changing requirements in Agile?', guidance: 'Discuss adaptability and communication.' },
      { type: 'HR', question: 'Explain sprint planning and retrospectives.', guidance: 'Discuss ceremonies and team collaboration.' },
      { type: 'HR', question: 'What are your experiences with Scrum ceremonies?', guidance: 'Discuss daily standups, reviews, and planning.' }
    ]
  };

  let questions = [...basicQuestions];

  // Add skill-specific questions
  skills.forEach(skill => {
    if (skillSpecificQuestions[skill]) {
      questions.push(...skillSpecificQuestions[skill]);
    }
  });

  return questions;
};

export const parseResumeFile = async (file) => {
  try {
    let text = '';

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF files, read as text (works for text-based PDFs)
      try {
        text = await file.text();
      } catch (e) {
        console.warn('Could not extract text from PDF. Using filename for analysis.');
        text = file.name;
      }
    } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      // For DOCX files, try to read as text
      try {
        text = await file.text();
      } catch (e) {
        console.warn('Could not extract text from DOCX. Using filename for analysis.');
        text = file.name;
      }
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      text = await file.text();
    } else {
      // Try to read as text for any other format
      try {
        text = await file.text();
      } catch (e) {
        console.warn('Could not read file. Using filename for analysis.');
        text = file.name;
      }
    }

    // If text is empty, try to extract keywords from filename
    if (!text || text.trim().length === 0) {
      text = file.name;
    }

    return text;
  } catch (error) {
    console.error('Error parsing resume:', error);
    return file.name;
  }
};
