import React, { useContext, useState } from 'react';
import uuid from 'uuid/v4';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';

export default function EditForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);

  const [period, handlePeriodChange, resetPeriod] = useInputState('');
  const [subject, handleSubjectChange, resetSubject] = useInputState('');

  // Hook to keep track of multiple student inputs before submitting
  const [students, setStudents] = useState([
    {
      studentId: uuid(),
      first: '',
      last: '',
      grade: 9
    }
  ]);

  const handleStudentInputChange = i => e => {
    const newStudentList = students.map((x, idx) => {
      // console.log(x);
      // Is index passed up from onChange same as index of this student object?

      //if not the same index, return that student
      if (i !== idx) {
        return x;
      }
      return {
        ...x,
        [e.target.name]: e.target.value
      };
    });

    // add new/modified student to input student array/state
    setStudents(newStudentList);
  };

  // Render out an input (first, last, grade) for each student in students array
  // students can be empty objects if the input is empty
  const renderStudentInputs = () => {
    return students.map((x, i) => {
      return (
        <div key={i}>
          <h4>{`Student ${i + 1}`}</h4>
          <input
            type="text"
            placeholder={`First Name`}
            value={x.first}
            onChange={handleStudentInputChange(i)}
            name="first"
          />
          <input
            type="text"
            placeholder={`Last Name`}
            value={x.last}
            onChange={handleStudentInputChange(i)}
            name="last"
          />
          <input
            type="number"
            placeholder={`Grade Level`}
            value={x.grade}
            onChange={handleStudentInputChange(i)}
            name="grade"
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Add a new class</h1>
      <form>
        <button>Add New Class</button>

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
        <button>Add another student</button>

        {students.length === 1 ? null : <button>Remove extra student</button>}
      </form>
    </div>
  );
}
