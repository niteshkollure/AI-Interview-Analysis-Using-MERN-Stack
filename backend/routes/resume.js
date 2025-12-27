const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const allowedExts = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) || allowedExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload PDF, DOCX, DOC, or TXT files.'));
    }
  }
});

// Skill extraction patterns
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
  'C++': ['cpp', 'cplusplus', 'c plus plus', 'oop', 'stl', 'pointer', 'reference'],
  'DevOps': ['devops', 'ci/cd', 'jenkins', 'ansible', 'terraform', 'gitlab ci', 'github actions'],
  'Agile': ['agile', 'scrum', 'kanban', 'sprint', 'jira', 'confluence'],
  'Node.js': ['node', 'nodejs', 'express', 'npm', 'yarn', 'npm package'],
  'Web Development': ['web development', 'frontend', 'backend', 'fullstack', 'mern'],
  'Linux': ['linux', 'ubuntu', 'bash', 'shell', 'terminal', 'command line'],
  'Redis': ['redis', 'cache', 'session', 'memory store'],
  'Testing': ['test', 'jest', 'mocha', 'chai', 'testing library', 'unit test', 'integration test'],
  'GraphQL': ['graphql', 'apollo', 'query', 'mutation', 'subscription'],
  'Mobile': ['react native', 'flutter', 'ios', 'android', 'swift', 'kotlin'],
  'C#': ['csharp', 'c#', '.net', 'asp.net', 'unity'],
  'Go': ['golang', 'go language'],
  'PHP': ['php', 'laravel', 'wordpress', 'symfony'],
  'Ruby': ['ruby', 'rails', 'gem'],
};

// Extract skills from text
const extractSkills = (text) => {
  if (!text) return [];
  
  const textLower = text.toLowerCase();
  const foundSkills = new Set();

  for (const [skill, keywords] of Object.entries(skillKeywords)) {
    for (const keyword of keywords) {
      try {
        // Simple string matching without regex for reliability
        if (textLower.includes(keyword)) {
          foundSkills.add(skill);
          break;
        }
      } catch (e) {
        continue;
      }
    }
  }

  return Array.from(foundSkills);
};

// Extract text from buffer
const extractTextFromBuffer = (buffer) => {
  try {
    // Convert buffer to string and clean up
    let text = buffer.toString('utf8');
    
    // Remove common binary markers and clean up text
    text = text
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return text;
  } catch (error) {
    console.error('Error converting buffer:', error);
    return '';
  }
};

// POST /api/resume/parse
router.post('/parse', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        success: false 
      });
    }

    // Extract text from file buffer
    let resumeText = extractTextFromBuffer(req.file.buffer);

    // If no text extracted, use filename for skill extraction
    if (!resumeText || resumeText.trim().length === 0) {
      resumeText = req.file.originalname;
    }

    // Extract skills
    const skills = extractSkills(resumeText);

    // Extract contact info using simple string matching
    const emailMatch = resumeText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const phoneMatch = resumeText.match(/(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);

    const response = {
      success: true,
      resumeText: resumeText.substring(0, 2000), // Send first 2000 chars
      skills: skills,
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? `${phoneMatch[1]}-${phoneMatch[2]}-${phoneMatch[3]}` : null,
      fileName: req.file.originalname,
      message: 'Resume parsed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error processing resume file',
      details: error.message 
    });
  }
});

module.exports = router;
