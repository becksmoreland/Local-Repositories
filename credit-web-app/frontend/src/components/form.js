// src/components/Form.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Form.css';

const grades = ['9th', '10th', '11th', '12th'];

const Form = () => {
  const [formData, setFormData] = useState({
    community: '',
    grade: '',
    classes: Array(24).fill(null)
  });
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    if (formData.grade && formData.community) {
      fetchClasses(formData.grade.value, formData.community.value);
    }
  }, [formData.grade, formData.community]);

  const fetchClasses = async (grade, community) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/${grade}/${community}`);
      const data = await response.json();
      setClassOptions(data.map(c => ({ value: c.name, label: c.name })));
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const handleCommunityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      community: selectedOption
    }));
  };

  const handleGradeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      grade: selectedOption
    }));
  };

  const handleClassChange = (index, selectedOption) => {
    const updatedClasses = [...formData.classes];
    updatedClasses[index] = selectedOption;
    setFormData((prevData) => ({
      ...prevData,
      classes: updatedClasses
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="community">Small Learning Community:</label>
        <Select
          id="community"
          value={formData.community}
          onChange={handleCommunityChange}
          options={[
            { value: 'AC', label: 'AC' },
            { value: 'AHA', label: 'AHA' },
            { value: 'AMPS', label: 'AMPS' },
            { value: 'BIHS', label: 'BIHS' },
            { value: 'CAS', label: 'CAS' }
          ]}
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
        {grades.map((grade, index) => (
          <div key={index} className="classes-header">
            {grade}
          </div>
        ))}
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="class-label">Class {rowIndex + 1}</div>
            {grades.map((_, colIndex) => (
              <div key={colIndex} className="form-group">
                <Select
                  id={`class-${rowIndex}-${colIndex}`}
                  value={formData.classes[rowIndex * 4 + colIndex]}
                  onChange={(selectedOption) => handleClassChange(rowIndex * 4 + colIndex, selectedOption)}
                  options={classOptions}
                  isClearable
                  placeholder="Select Class"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;