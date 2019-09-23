import React, { useContext, useState } from 'react';
import uuid from 'uuid/v4';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';

export default function EditForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { filteredClass } = props;

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

  return (
    <div>
      <h1>Edit {`${filteredClass.subject} Class`}</h1>
      <form>
        <button>Save Updated Class</button>

        <input
          autoComplete="off"
          onChange={handlePeriodChange}
          name="period"
          placeholder="period"
          value={filteredClass.period}
        />
        <input
          autoComplete="off"
          onChange={handleSubjectChange}
          name="subject"
          placeholder="subject"
          value={filteredClass.subject}
        />

        <button>Add another student</button>

        {students.length === 1 ? null : <button>Remove extra student</button>}
      </form>
    </div>
  );
}
