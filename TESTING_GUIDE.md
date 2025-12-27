# Quick Reference - Testing Guide

## How to Test the Implementation

### Prerequisites
- Frontend installed: `npm install` in `/frontend` folder
- Backend running (optional for frontend testing)
- Browser with ES6 support

### Test Scenario 1: Sequential Interview (All 4 Modules)
**Steps:**
1. Navigate to Practice section
2. Click "Sequential Interview" button 🔄
3. Select "Easy" difficulty
4. Answer questions 1-5 (Technical - Python)
5. Continue to Aptitude round (auto-switch)
6. Answer 5 Aptitude questions (Math/Logic)
7. Continue to HR round (auto-switch)
8. Answer 5 HR questions (Behavioral)
9. Continue to Communication round (auto-switch)
10. Answer 5 Communication questions
11. **Verify**: Results show all 4 modules with individual scores

**Expected Result:**
- Questions 1-5: Technical (Python)
- Questions 6-10: Aptitude (Math/Logic)
- Questions 11-15: HR (Behavioral)
- Questions 16-20: Communication (Presentation)
- Final results show: Overall score + 4 module breakdowns

---

### Test Scenario 2: Aptitude Individual (Easy Difficulty)
**Steps:**
1. Navigate to Practice section
2. Click "Aptitude Interview" button 🧮
3. Select "Easy" difficulty
4. Answer 5 random questions
5. **Verify**: Questions are basic math/profit/equations

**Expected Questions Include:**
- Train speed/average calculation
- Profit percentage
- Simple equation solving
- Discount calculations
- Ratio proportions

**Result:** 5 random questions, fresh set each attempt

---

### Test Scenario 3: Aptitude Individual (Moderate Difficulty)
**Steps:**
1. Navigate to Practice section
2. Click "Aptitude Interview" button
3. Select "Moderate" difficulty
4. Answer 5 random questions
5. **Verify**: Questions are more complex

**Expected Questions Include:**
- Simple interest calculations
- Work rate problems
- Combined work scenarios
- Speed/distance calculations
- Set theory problems

---

### Test Scenario 4: Aptitude Individual (Difficult Difficulty)
**Steps:**
1. Navigate to Practice section
2. Click "Aptitude Interview" button
3. Select "Difficult" difficulty
4. Answer 5 random questions
5. **Verify**: Questions are advanced

**Expected Questions Include:**
- Weighted average calculations
- Complex proportions
- Interest rate equations
- Train crossing problems
- Mixture/dilution problems

---

### Test Scenario 5: HR Individual Interview
**Steps:**
1. Navigate to Practice section
2. Click "HR Interview" button 👔
3. Select "Moderate" difficulty
4. **Verify**: Questions are HR-focused, different from Aptitude

**Expected Questions Patterns:**
- Behavioral questions
- Conflict resolution
- Leadership scenarios
- Team dynamics

**Result:** Different questions from Aptitude, proper randomization

---

### Test Scenario 6: Communication Individual Interview
**Steps:**
1. Navigate to Practice section
2. Click "Communication Interview" button 🎤
3. Select "Difficult" difficulty
4. **Verify**: Questions focus on communication skills

**Expected Questions Patterns:**
- Presentation skills
- Team communication
- Cross-functional communication
- Difficult conversations

**Result:** Questions different from HR and Aptitude

---

### Test Scenario 7: Technical with Language Selection
**Steps:**
1. Navigate to Practice section
2. Click "Technical Interview" button 💻
3. Select "Python" language
4. Select "Easy" difficulty
5. **Verify**: Questions are Python-specific

**Expected Questions Include:**
- Python basics
- Data types
- Functions
- Loops
- Exception handling

**Steps to Repeat:**
- Try with Java instead → Different questions
- Try with JavaScript → Different questions
- All should have difficulty levels (Easy, Moderate, Difficult)

---

### Test Scenario 8: Question Randomization
**Steps:**
1. Complete "Easy" Aptitude Interview
2. Note the question order (Q1, Q3, Q5, Q2, Q4)
3. Go back to Practice
4. Start "Easy" Aptitude Interview again
5. **Verify**: Same 5 questions but DIFFERENT ORDER

**Expected:** Never see exact same sequence twice due to shuffling

---

### Test Scenario 9: Results Display - Sequential
**Steps:**
1. Complete full Sequential Interview
2. Check results page
3. **Verify the following:**
   - [ ] Overall score shown (e.g., 72/100)
   - [ ] Total questions answered (20/20)
   - [ ] Questions passed count (e.g., 16/20)
   - [ ] 4 module sections visible
   - [ ] Each module shows score (e.g., Technical: 78/100)
   - [ ] Color coding based on score (Green≥70, Yellow 50-69, Red<50)
   - [ ] All 20 questions listed with answers and scores
   - [ ] Module prefix in question list (e.g., "TECHNICAL - Q1")

---

### Test Scenario 10: Back Navigation
**Steps:**
1. Start Sequential Interview
2. Answer 2-3 questions
3. Click "← Back" button
4. **Verify**: Returns to main practice selection
5. All state resets (can start fresh interview)

---

## Verification Checklist

### Data Structure ✓
- [ ] Aptitude has easy/moderate/difficult keys
- [ ] HR has easy/moderate/difficult keys  
- [ ] Communication has easy/moderate/difficult keys
- [ ] Technical still has language structure
- [ ] Each difficulty level has 5 questions
- [ ] No syntax errors in file

### Sequential Mode ✓
- [ ] Starts with module selection for sequential
- [ ] Auto-switches after 5 questions
- [ ] Shows progress through all 4 modules
- [ ] Results show module breakdown
- [ ] Can skip questions and continue
- [ ] Module index increments correctly

### Question Selection ✓
- [ ] Questions are randomized each time
- [ ] Shuffling creates different order each attempt
- [ ] Exactly 5 questions per set
- [ ] Correct difficulty level questions shown
- [ ] No duplicates within single interview
- [ ] Different languages show different questions

### Scoring System ✓
- [ ] Score calculated correctly
- [ ] Module breakdown calculated
- [ ] Color coding applied
- [ ] Pass/fail markers shown
- [ ] Overall average calculated

### UI/UX ✓
- [ ] Clear stage progression
- [ ] Button labels match functionality
- [ ] Results formatted readably
- [ ] Back button works at all stages
- [ ] No broken links
- [ ] Responsive layout

---

## Quick Check Commands

### Check file syntax
```bash
cd frontend
node -c src/PracticeInterview.js
```

### Check React build
```bash
npm run build 2>&1 | grep -i error
```

### Run local server
```bash
npm start
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Questions not randomizing | Check `shuffleArray()` function, verify `getRandomQuestions()` called |
| Module doesn't switch | Check `currentModuleIndex` increment logic in `handleAnswerSubmit()` |
| Wrong difficulty questions | Verify questionSets structure matches new format |
| Null reference errors | Check difficulty state is set before `getQuestions()` called |
| Results not showing module breakdown | Verify `sequentialMode` flag is true and module tracking working |

---

## Sample Test Data

### Easy Aptitude Questions
1. "A train travels 120 km in 2 hours..." → Average speed
2. "A shopkeeper buys for Rs. 100..." → Profit percentage  
3. "A number multiplied by 3..." → Simple equation
4. "A shirt costs Rs. 500..." → Discount calculation
5. "Ratio of boys to girls..." → Proportion

### Moderate HR Questions
1. "Describe a conflict with a colleague..."
2. "Give an example of leadership..."
3. "How do you handle pressure..."
4. "When did you learn quickly..."
5. "What do you know about our company..."

### Difficult Communication Questions
1. "How do you keep team informed..."
2. "How do you adapt your communication..."
3. "How do you handle disagreements..."
4. "Tell about presentation to senior management..."
5. "How to deliver bad news..."

---

## Performance Notes
- ✅ Shuffling algorithm is O(n) complexity
- ✅ Question selection is O(n) due to array slice
- ✅ No database queries (all client-side)
- ✅ No noticeable lag on question display
- ✅ Results calculation is instant

---

## Success Criteria

**Implementation is successful when:**
1. ✅ Sequential interview completes all 4 modules
2. ✅ Questions change on every attempt (randomization)
3. ✅ Difficulty levels work for all modules
4. ✅ Results show individual module scores
5. ✅ No syntax/runtime errors
6. ✅ Back button navigation works
7. ✅ Score calculations are accurate
8. ✅ All UI elements display correctly
