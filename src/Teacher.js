import React, { useContext } from 'react';
import { ScheduleContext } from './contexts/ScheduleContext';

// ASSUMPTIONS
// A teacher may teach several classes at different grade levels.
// A teacher may teach several subjects.
// To simplify things, a student may only be in one class.

// FUNCTIONALITY
// - A teacher may view existing classes, modify details of an existing class
// (e.g., subject, period), create a new class, delete an existing class.
// - A teacher should be able to view existing students, edit a student’s
// details (e.g., name, grade level), add a new student, remove a student.
// - A teacher can search for students by first or last name.

function Teacher() {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const {
    subjectTitleContainer,
    subjectTitle,
    studentTitleContainer,
    studentTitle,
    button
  } = styles;

  // Fxn to map through all classes
  // Figure out how to map through students after mapping through the classes
  const renderClassList = () => {
    return schedule.map(x => {
      // console.log(x.classId);
      const studentsInClass = x.students.map(y => {
        // console.log(y.name.last);
        return <li key={y.studentId}>{y.name.last}</li>;
      });
      return (
        <div className="Subject" key={x.classId}>
          <div style={subjectTitleContainer}>
            <h1 style={subjectTitle}>Subject: {x.subject}</h1>
            <button style={button}>Edit Class</button>
          </div>
          <h3>Period: {x.period}</h3>
          <div style={studentTitleContainer}>
            <h3 style={studentTitle}>Students</h3>
            <button style={button}>Edit Students</button>
          </div>
          <ul>{studentsInClass}</ul>
          <hr />
        </div>
      );
    });
  };

  return <ul>{renderClassList()}</ul>;
}

const styles = {
  subjectTitleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  //not working for some reason
  subjectTitle: {
    marginRight: '1em'
  },
  studentTitleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  studentTitle: {
    marginRight: '1em'
  },
  button: {
    height: '3em',
    marginTop: '1.5em'
  }
};

export default Teacher;
