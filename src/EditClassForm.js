import React, { useContext, useState } from 'react';
import uuid from 'uuid/v4';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';

export default function EditForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { filteredClass, toggleForm } = props;

  const [period, handlePeriodChange, resetPeriod] = useInputState(
    filteredClass.period
  );

  const [subject, handleSubjectChange, resetSubject] = useInputState(
    filteredClass.subject
  );

  // Hook to keep track of multiple student inputs before submitting

  const saveChange = e => {
    e.preventDefault();
    // Map through each class and if todo is unaltered, return that todo
    // If todo has been altered, updated period & subject properties with the new
    // values from the handleChange for the inputs
    const classToEdit = schedule.map(x => {
      return x.classId === filteredClass.classId
        ? { ...x, period: Number(period), subject: subject }
        : x;
    });

    setSchedule(classToEdit);
    toggleForm();
  };

  return (
    <div>
      <h1>Edit {`${filteredClass.subject} Class`}</h1>
      <form onSubmit={saveChange}>
        <button>Save Class Details</button>
        <button onClick={toggleForm}>Go back</button>
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
      </form>
    </div>
  );
}
