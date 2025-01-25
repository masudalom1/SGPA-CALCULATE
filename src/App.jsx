import React, { useState } from 'react';
import './app.css'

const App = () => {
  const gradePoints = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'F': 0
  };

  const [subject, setSubject] = useState(''); 
  const [credit, setCredit] = useState(1); 
  const [grade, setGrade] = useState('A');
  const [courses, setCourses] = useState([]);
  const [sgpa, setSgpa] = useState(null);

  const handleSubmit = () => {
    // Calculate SGPA
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(({ grade, credit }) => {
      totalGradePoints += gradePoints[grade] * credit;
      totalCredits += credit;
    });

    const calculatedSgpa = totalGradePoints / totalCredits;
    setSgpa(calculatedSgpa);
  };

  const handleAddCourse = () => {
    if (subject.trim() === '') {
      alert('Please enter a subject name.');
      return;
    }

    setCourses([
      ...courses,
      { subject, grade, credit }
    ]);

    // Reset the subject field after adding the course
    setSubject('');
  };

  return (
    <div className="sgpa-box">
      <h1 className='title'>Cu Connect</h1>
      <h2>SGPA Calculator</h2>
      <div className="inputs">
        <div className="input-group">
          <label>Subject Name</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject name"
          />
        </div>

        <div className="input-group">
          <label>Credits</label>
          <select value={credit} onChange={(e) => setCredit(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        <div className="input-group">
          <label>Grade</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            {Object.keys(gradePoints).map((gradeKey) => (
              <option key={gradeKey} value={gradeKey}>
                {gradeKey}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleAddCourse}>Add Course</button>

    <div className="course-list">
  <h3>Courses:</h3>
  {courses.map(({ subject, grade, credit }, index) => (
    <div key={index}>
      <p><strong>Subject:</strong> {subject} | <strong>Your Grade:</strong> {grade} | <strong>Credit:</strong> {credit}</p>
    </div>
  ))}
</div>



      <button onClick={handleSubmit}>Calculate SGPA</button>

      {sgpa !== null && (
        <div className="sgpa-result">
          <h3>Your SGPA: {sgpa.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
