# Interview Practice System - Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│               INTERVIEW PRACTICE SYSTEM                  │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   STAGE 1: SELECT MODE                    │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ Sequential Int. │  │  Technical   │  │  Aptitude   │ │
│  │  (All 4 in 1)   │  │  Interview   │  │  Interview  │ │
│  └─────────────────┘  └──────────────┘  └─────────────┘ │
│                                                            │
│  ┌─────────────────┐  ┌──────────────┐                  │
│  │   HR Interview  │  │  Communication│                 │
│  │   Interview     │  │  Interview   │                  │
│  └─────────────────┘  └──────────────┘                  │
│                                                            │
└──────────────────────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
              SEQUENTIAL            INDIVIDUAL
              
┌──────────────────────────────────────────────────────────┐
│         STAGE 2: SELECT DIFFICULTY (if Sequential)        │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │     EASY     │  │   MODERATE   │  │  DIFFICULT   │   │
│  │              │  │              │  │              │   │
│  │ Fundamentals │  │  Intermediate│  │  Advanced    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                            │
└──────────────────────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
           FOR SEQUENTIAL      FOR INDIVIDUAL
           (All 4 modules)     (Select language for Technical)
           
┌──────────────────────────────────────────────────────────┐
│                 STAGE 3: INTERVIEW MODE                    │
├──────────────────────────────────────────────────────────┤
│                                                            │
│   SEQUENTIAL MODE (20 Questions Total)                   │
│   ┌────────────────────────────────────────────────┐    │
│   │ Technical Interview          Q: 1-5 of 5      │    │
│   │ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │
│   │ Answer Question 1 / 5                          │    │
│   │ Next Question ──────→ (Auto: Technical Q2)    │    │
│   │                                                 │    │
│   │ [After Q5] Auto-switch to Aptitude             │    │
│   │                                                 │    │
│   │ Aptitude Interview           Q: 1-5 of 5      │    │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │
│   │ (Next questions: Aptitude 1-5)                │    │
│   │                                                 │    │
│   │ [After Q10] Auto-switch to HR                  │    │
│   │ HR Interview                 Q: 1-5 of 5      │    │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │
│   │                                                 │    │
│   │ [After Q15] Auto-switch to Communication       │    │
│   │ Communication Interview      Q: 1-5 of 5      │    │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │
│   │                                                 │    │
│   │ [Finish Interview] Show Results              │    │
│   └────────────────────────────────────────────────┘    │
│                                                            │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                STAGE 4: RESULTS & FEEDBACK                 │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  SEQUENTIAL MODE RESULTS:                                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Overall Score: 72 / 100                          │   │
│  │                                                   │   │
│  │ MODULE BREAKDOWN:                                │   │
│  │ ┌───────────────────────────────────────────┐   │   │
│  │ │ Technical Interview:      78/100 ✓        │   │   │
│  │ │ Aptitude Interview:       65/100 ✓        │   │   │
│  │ │ HR Interview:             70/100 ✓        │   │   │
│  │ │ Communication Interview:  75/100 ✓        │   │   │
│  │ └───────────────────────────────────────────┘   │   │
│  │                                                   │   │
│  │ YOUR RESPONSES:                                  │   │
│  │ ┌───────────────────────────────────────────┐   │   │
│  │ │ Q1: What is Python?                       │   │   │
│  │ │ Your Answer: Python is a... (shown)       │   │   │
│  │ │ Score: 85/100                             │   │   │
│  │ │                                            │   │   │
│  │ │ Q2: List and tuple difference             │   │   │
│  │ │ Your Answer: Lists are... (shown)         │   │   │
│  │ │ Score: 72/100                             │   │   │
│  │ │ [... more questions]                      │   │   │
│  │ └───────────────────────────────────────────┘   │   │
│  │                                                   │   │
│  │ [← Back to Practice] [Try Again] [Home]         │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

## Question Selection Flow

```
User starts interview
        ↓
Difficulty selected → Easy / Moderate / Difficult
        ↓
Random Questions Selected:
        ┌─────────────────────────────────────────┐
        │     Original Question Pool               │
        │                                          │
        │  Question 1                             │
        │  Question 2                             │
        │  Question 3 ← Shuffled Order            │
        │  ...                                     │
        │  Question N                             │
        └─────────────────────────────────────────┘
                ↓ shuffleArray()
        ┌─────────────────────────────────────────┐
        │     Shuffled Pool                        │
        │                                          │
        │  Question 7                             │
        │  Question 2 ← Random Order               │
        │  Question N                             │
        │  ...                                     │
        │  Question 4                             │
        └─────────────────────────────────────────┘
                ↓ slice(0, 5)
        ┌─────────────────────────────────────────┐
        │     Selected 5 Questions                 │
        │                                          │
        │  Question 7  ← Show to User             │
        │  Question 2                             │
        │  Question N                             │
        │  Question 4                             │
        │  Question 8                             │
        └─────────────────────────────────────────┘
                ↓
        User takes interview
```

## Data Structure

```
questionSets = {
  
  technical: {
    Python: {
      easy: [ Q1, Q2, Q3, ... Q10 ],
      moderate: [ Q1, Q2, Q3, ... Q10 ],
      difficult: [ Q1, Q2, Q3, ... Q10 ]
    },
    Java: { easy: [...], moderate: [...], difficult: [...] },
    JavaScript: { ... },
    // 8 languages total
  },
  
  aptitude: {
    easy: [ Q1, Q2, Q3, Q4, Q5 ],        // 5 questions
    moderate: [ Q1, Q2, Q3, Q4, Q5 ],    // 5 questions
    difficult: [ Q1, Q2, Q3, Q4, Q5 ]    // 5 questions
  },
  
  hr: {
    easy: [ Q1, Q2, Q3, Q4, Q5 ],
    moderate: [ Q1, Q2, Q3, Q4, Q5 ],
    difficult: [ Q1, Q2, Q3, Q4, Q5 ]
  },
  
  communication: {
    easy: [ Q1, Q2, Q3, Q4, Q5 ],
    moderate: [ Q1, Q2, Q3, Q4, Q5 ],
    difficult: [ Q1, Q2, Q3, Q4, Q5 ]
  }
  
}
```

## Sequential Mode Progression

```
START
  ↓
[User selects Sequential Interview]
  ↓
[User selects Difficulty Level]
  ↓
ROUND 1: TECHNICAL INTERVIEW
├─ Language selected: Python (default) or user choice
├─ 5 random questions from Technical[Python][difficulty]
├─ User answers all 5
├─ currentQuestionIndex resets to 0
└─ currentModuleIndex → 1 (Aptitude)
  ↓
ROUND 2: APTITUDE INTERVIEW
├─ 5 random questions from Aptitude[difficulty]
├─ User answers all 5
├─ currentQuestionIndex resets to 0
└─ currentModuleIndex → 2 (HR)
  ↓
ROUND 3: HR INTERVIEW
├─ 5 random questions from HR[difficulty]
├─ User answers all 5
├─ currentQuestionIndex resets to 0
└─ currentModuleIndex → 3 (Communication)
  ↓
ROUND 4: COMMUNICATION INTERVIEW
├─ 5 random questions from Communication[difficulty]
├─ User answers all 5
├─ currentQuestionIndex reaches max (5)
└─ No more modules (currentModuleIndex reaches max)
  ↓
[finished = true] → Show Results
  ↓
DISPLAY RESULTS
├─ Overall Score
├─ Module Breakdown (4 modules)
└─ Individual Question Results (20 answers)
  ↓
END
```

## Difficulty Color Coding

```
Score Ranges:
┌─────────────────────────────────────┐
│ ≥ 70  → GREEN ✓ (PASSED)           │
│ 50-69 → YELLOW ⚠ (BORDERLINE)      │
│ < 50  → RED ✗ (NEEDS IMPROVEMENT)  │
└─────────────────────────────────────┘

Each module in results shows:
- Color border based on score
- Score in format: XX/100
- Pass/Fail indicator
```

## Key Statistics

- **Total Questions Available**: 485
- **Questions per Interview**: 5
- **Sequential Mode Total**: 20 (5 × 4 modules)
- **Difficulty Levels**: 3 (Easy, Moderate, Difficult)
- **Interview Types**: 4 (Technical, Aptitude, HR, Communication)
- **Programming Languages**: 8
- **Randomization**: Every question set is shuffled before use
- **Uniqueness**: Never same sequence twice

## Features Working

✅ Sequential mode with 4 automatic module switches
✅ Difficulty-based question selection
✅ Random question shuffling each time
✅ Module-specific results tracking
✅ Automatic progression through all 4 rounds
✅ Comprehensive final results display
✅ Individual module scoring
✅ Back button navigation
✅ Question skip functionality
✅ Speech recognition integration (preserved)
✅ Score calculation system (preserved)
