import React, { useState, useRef } from 'react';
import './InterviewSession.css';

function InterviewSession({ resumeFile, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [finished, setFinished] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const recognitionRef = React.useRef(null);
  const synthRef = React.useRef(window.speechSynthesis);

  // Get questions from localStorage (extracted from resume) or use defaults
  const defaultQuestions = [
    { type: 'Technical', question: 'What are your core technical skills and expertise?', guidance: 'Mention specific technologies, languages, and frameworks. Give concrete examples of tools you\'ve used.' },
    { type: 'Technical', question: 'Describe a complex project you worked on and your role in it.', guidance: 'Use STAR method: Situation, Task, Action, Result. Be specific about your contributions.' },
    { type: 'Technical', question: 'How do you approach problem-solving when faced with a challenging technical issue?', guidance: 'Explain your methodology: analyze, research, implement, test. Show critical thinking.' },
    { type: 'Technical', question: 'Tell me about your experience with databases and data management.', guidance: 'Discuss database types (SQL/NoSQL), optimization, and real-world applications.' },
    { type: 'Technical', question: 'What is your experience with cloud platforms and deployment?', guidance: 'Mention AWS, Azure, or Google Cloud. Describe deployment pipelines or DevOps practices.' },
    { type: 'HR', question: 'Tell me about yourself and your career journey.', guidance: 'Keep it brief (1-2 minutes). Highlight education, experience, and what excites you about tech.' },
    { type: 'HR', question: 'Why are you interested in this position?', guidance: 'Research the company. Show genuine interest. Connect your skills to their needs.' },
    { type: 'HR', question: 'How do you handle conflicts or disagreements with team members?', guidance: 'Provide a specific example. Show communication, empathy, and resolution skills.' },
    { type: 'HR', question: 'Describe a time you failed and what you learned from it.', guidance: 'Be honest. Focus on lessons learned and how you improved. Show growth mindset.' },
    { type: 'HR', question: 'What are your career goals and how does this role fit into them?', guidance: 'Be ambitious but realistic. Show long-term vision and alignment with the company.' },
    { type: 'HR', question: 'How do you stay updated with new technologies and industry trends?', guidance: 'Mention courses, blogs, projects, communities. Show commitment to continuous learning.' },
  ];

  const extractedQuestions = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('interviewQuestions');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error parsing stored questions:', e);
    }
    return defaultQuestions;
  }, []);

  const questions = extractedQuestions.length > 0 ? extractedQuestions : defaultQuestions;

  // Get skills from localStorage
  const skills = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('interviewSkills');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }, []);

  React.useEffect(() => {
    return () => {
      // Clean up localStorage when component unmounts
      localStorage.removeItem('interviewQuestions');
      localStorage.removeItem('interviewSkills');
    };
  }, []);

  const calculateScore = (answer) => {
    if (answer === 'Skipped' || answer.trim() === '') return 0;
    const wordCount = answer.trim().split(/\s+/).length;
    const hasKeywords = /example|experience|project|learned|improved/.test(answer.toLowerCase());
    const isDetailed = wordCount >= 30;
    
    let score = 50;
    if (isDetailed) score += 20;
    if (hasKeywords) score += 15;
    if (wordCount > 100) score += 15;
    
    return Math.min(score, 100);
  };

  const startListening = () => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      alert('Speech Recognition not supported. Type your answer instead.');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentAnswer(transcript);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const text = `Question: ${currentQuestion.question}`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const handleAnswerSubmit = () => {
    const score = calculateScore(currentAnswer);
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer: currentAnswer, score }]);
    setCurrentAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleSkip = () => {
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer: 'Skipped', score: 0 }]);
    setCurrentAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0) / answers.length;
    const passedQuestions = answers.filter(ans => ans.score >= 50).length;
    
    return (
      <div className="interview-container">
        <div className="interview-complete">
          <h2>Interview Completed!</h2>
          <p>File: {resumeFile.name}</p>
          <div className="score-summary">
            <h3>Overall Score: {totalScore.toFixed(2)} / 100</h3>
            <p>Questions Answered: {answers.length} / {questions.length}</p>
            <p>Questions Passed (≥50): {passedQuestions} / {answers.length}</p>
          </div>
          <div className="answers-summary">
            <h3>Your Responses:</h3>
            {answers.map((ans, idx) => (
              <div key={idx} className={`answer-item score-${Math.round(ans.score / 20)}`}>
                <p><strong>Q{idx + 1}: {ans.question}</strong></p>
                <p>{ans.answer || 'No answer provided'}</p>
                <p className="score-badge">Score: {ans.score}/100</p>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="btn btn-primary">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="interview-container">
      <div className="interview-header">
        <h2>Interview Session</h2>
        <p>Resume: {resumeFile.name}</p>
        {skills && skills.length > 0 && (
          <p style={{fontSize: '13px', color: '#666', marginTop: '8px'}}>
            🎯 Questions based on detected skills: {skills.join(', ')}
          </p>
        )}
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div className="interview-content">
        <div className="question-box">
          <p className="question-type">{currentQuestion.type} Interview</p>
          <div className="question-header">
            <h3 className="question">{currentQuestion.question}</h3>
            <button onClick={speakQuestion} className="speak-btn" disabled={isSpeaking}>
              {isSpeaking ? '🔊 Speaking...' : '🔊 Hear Question'}
            </button>
          </div>
        </div>

        <div className="guidance-box">
          <p><strong>💡 Tips:</strong> {currentQuestion.guidance}</p>
        </div>

        <div className="answer-box">
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here or use voice input..."
            rows="6"
          />
          <p className="char-count">{currentAnswer.length} characters</p>
        </div>

        <div className="voice-controls">
          {!isListening ? (
            <button onClick={startListening} className="btn btn-voice">
              🎤 Start Speaking
            </button>
          ) : (
            <button onClick={stopListening} className="btn btn-stop">
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        <div className="button-group">
          <button onClick={handleSkip} className="btn btn-secondary">Skip</button>
          <button onClick={handleAnswerSubmit} className="btn btn-primary" disabled={!currentAnswer.trim()}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSession;
