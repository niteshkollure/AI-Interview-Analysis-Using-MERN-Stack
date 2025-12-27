import React from 'react';
import './Practice.css';

function Practice() {
  return (
    <div className="practice-page">
      <h2>Practice Interviews</h2>
      <div className="practice-list">
        <div className="practice-card" style={{ background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)', color: '#fff' }}>
          <h3>Technical Interview</h3>
          <p>Practice coding, algorithms, and technical questions.</p>
          <button>Start Technical</button>
        </div>
        <div className="practice-card" style={{ background: 'linear-gradient(90deg, #fc5c7d 0%, #fbc2eb 100%)', color: '#fff' }}>
          <h3>Aptitude Interview</h3>
          <p>Solve math and logic puzzles.</p>
          <button>Start Aptitude</button>
        </div>
        <div className="practice-card" style={{ background: 'linear-gradient(90deg, #56ccf2 0%, #2f80ed 100%)', color: '#fff' }}>
          <h3>HR Interview</h3>
          <p>Answer HR and behavioral questions.</p>
          <button>Start HR</button>
        </div>
        <div className="practice-card" style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#fff' }}>
          <h3>Communication Interview</h3>
          <p>Practice communication skills and fluency.</p>
          <button>Start Communication</button>
        </div>
        <div className="practice-card" style={{ background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)', color: '#fff', marginTop: '24px' }}>
          <h3>Sequential Interview</h3>
          <p>Complete all 4 interview types: Technical → Aptitude → HR → Communication</p>
          <button>Start Sequential</button>
        </div>
      </div>
    </div>
  );
}

export default Practice;
