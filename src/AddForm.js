import React, { useContext, useState } from 'react';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';
// import { ClassSizeContext } from './contexts/ClassSizeContext';
// import Select from './Select';
import uuid from 'uuid/v4';

export default function AddForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  // const { num } = useContext(ClassSizeContext);

  const [period, handlePeriodChange, resetPeriod] = useInputState('');
  const [subject, handleSubjectChange, resetSubject] = useInputState('');
  const [grade, handleGradeChange, resetGrade] = useInputState('');

  const [students, setStudents] = useState([
    {
      studentId: uuid(),
      studentName: { first: 'Kobe', last: 'Bryant' },
      grade: 9
    }
  ]);

  const handleStudentInputChange = i => e => {
    const newStudentList = students.map((x, idx) => {
      // console.log(prevInput);
      if (i !== idx) {
        return x;
      }

      const { studentName } = { ...x };
      const currentState = studentName;
      const { name, value } = e.target;
      currentState[name] = value;

      console.log('currState: ', currentState);

      return {
        ...x,
        studentName: currentState
      };
    });
    setStudents(newStudentList);
  };

  const renderStudentInputs = () => {
    return students.map((x, i) => {
      return (
        <div key={i}>
          <h4>{`Student ${i + 1}`}</h4>
          <input
            type="text"
            placeholder={`First Name`}
            value={x.studentName.first}
            onChange={handleStudentInputChange(i)}
            name="first"
          />
          <input
            type="text"
            placeholder={`Last Name`}
            value={x.studentName.last}
            onChange={handleStudentInputChange(i)}
            name="last"
          />
          <input
            type="number"
            placeholder={`Grade Level`}
            value={x.grade}
            onChange={handleGradeChange(i)}
            name="grade"
          />
        </div>
      );
    });
  };

  const addAnotherStudent = e => {
    e.preventDefault();
    setStudents([
      ...students,
      { studentId: uuid(), studentName: { first: '', last: '' }, grade: '' }
    ]);
    console.log('students', students);
  };

  const addNewClass = e => {
    e.preventDefault();

    console.log(students);

    let newClass = {
      classId: uuid(),
      subject: subject,
      period: period,
      students: students
    };

    console.log(newClass);

    setSchedule([newClass, ...schedule]);

    //Clearing Form
    resetPeriod();
    resetSubject();
    setStudents([
      { studentId: uuid(), studentName: { first: '', last: '' }, grade: '' }
    ]);
  };

  return (
    <div>
      <h1>Add a new class</h1>
      <form onSubmit={addNewClass}>
        <input
          autoComplete="off"
          onChange={handlePeriodChange}
          name="period"
          placeholder="period"
          value={period}
        />
        <input
          autoComplete="off"
          onChange={handleSubjectChange}
          name="subject"
          placeholder="subject"
          value={subject}
        />

        {renderStudentInputs()}
        <button onClick={addAnotherStudent}>Add another student</button>
        <button>Add New Class</button>
      </form>
    </div>
  );
}
