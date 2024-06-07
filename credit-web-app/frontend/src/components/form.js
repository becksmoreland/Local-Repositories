// src/components/Form.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Form.css';

// Define grades
const grades = ['9th', '10th', '11th', '12th'];

// Define communities
const communities = [
  { value: 'AC', label: 'AC' },
  { value: 'AHA', label: 'AHA' },
  { value: 'AMPS', label: 'AMPS' },
  { value: 'BIHS', label: 'BIHS' },
  { value: 'CAS', label: 'CAS' }
];

const Form = () => {
  const [formData, setFormData] = useState({
    community: '',
    grade: '',
    classes: Array(24).fill(null)
  });

  // State to hold class options organized by grade
  const [classOptions, setClassOptions] = useState({
    '9th': [],
    '10th': [],
    '11th': [],
    '12th': []
  });

  // Fetch classes when community changes
  useEffect(() => {
    if (formData.community) {
      fetchClasses(formData.community.value);
    }
  }, [formData.community]);

  const fetchClasses = async (community) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/${community}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Fetched data:', data);

      // Organize classes by grade
      const organizedClasses = {
        '9th': [],
        '10th': [],
        '11th': [],
        '12th': []
      };
      data.forEach((c) => {
        if (organizedClasses[c.Grade]) {
          organizedClasses[c.Grade].push({ value: c.Class, label: c.Class });
        }
      });
      setClassOptions(organizedClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  // Handle community change
  const handleCommunityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      community: selectedOption,
      classes: Array(24).fill(null) // Reset classes on community change
    }));
  };

  // Handle grade change
  const handleGradeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      grade: selectedOption
    }));
  };

  // Handle class change
  const handleClassChange = (index, selectedOption) => {
    const updatedClasses = [...formData.classes];
    updatedClasses[index] = selectedOption;
    setFormData((prevData) => ({
      ...prevData,
      classes: updatedClasses
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Render class options for each grade
  const renderClassOptions = () => {
    return grades.map((grade, gradeIndex) => (
      <div key={gradeIndex} className="classes-column">
        <div className="classes-header">{grade}</div>
        {Array.from({ length: 6 }).map((_, classIndex) => (
          <div key={classIndex} className="form-group">
            <Select
              id={`class-${grade}-${classIndex}`}
              value={formData.classes[gradeIndex * 6 + classIndex]}
              onChange={(selectedOption) => handleClassChange(gradeIndex * 6 + classIndex, selectedOption)}
              options={classOptions[grade]}
              isClearable
              placeholder="Select Class"
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="community">Small Learning Community:</label>
        <Select
          id="community"
          value={formData.community}
          onChange={handleCommunityChange}
          options={communities}
          isClearable
          placeholder="Select Community"
        />
      </div>
      <div className="form-group">
        <label htmlFor="grade">Current Grade:</label>
        <Select
          id="grade"
          value={formData.grade}
          onChange={handleGradeChange}
          options={grades.map(grade => ({ value: grade, label: grade }))}
          isClearable
          placeholder="Select Grade"
        />
      </div>
      <div className="classes-grid">
        <div className="classes-header"></div>
        {renderClassOptions()}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
