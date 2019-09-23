import React, { useContext } from 'react';
import { ScheduleContext } from './contexts/ScheduleContext';

export default function OneStudent(props) {
  const { filteredStudent, filteredClass } = props;
  const { deleteButton, editButton } = styles;
  const { schedule, setSchedule } = useContext(ScheduleContext);

  // REMOVE A STUDENT FROM A CLASS
  const removeStudent = (clickedClassId, clickedStudentId) => {
    //findIndex returns first array item that passes our callback fxn
    const classToRemove = schedule.findIndex(x => x.classId === clickedClassId);

    const newClass = schedule.filter((x, cIdx) => {
      return x.classId === clickedClassId;
    });
    // console.log('new class', newClass[0]);

    const newStudentList = newClass[0].students.filter((y, sIdx) => {
      // console.log(sIdx);
      return y.studentId !== clickedStudentId;
    });
    // console.log('New Student List', newStudentList);

    newClass[0].students = newStudentList;
    const updatedSchedule = [...schedule];
    // console.log('updated schedule', updatedSchedule);
    updatedSchedule[classToRemove] = newClass[0];
    setSchedule(updatedSchedule);
  };

  return (
    <li>
      {filteredStudent.first} {filteredStudent.last}
      <span style={{ marginLeft: '1em' }}>
        <strong>Grade: {filteredStudent.grade}</strong>
      </span>
      <button style={editButton}>Edit Students</button>
      <button
        style={deleteButton}
        onClick={() =>
          removeStudent(filteredClass.classId, filteredStudent.studentId)
        }
      >
        Remove Students
      </button>
    </li>
  );
}

const styles = {
  editButton: {
    height: '3em',
    marginTop: '1.5em',
    backgroundColor: 'orange'
  },
  deleteButton: {
    backgroundColor: 'red',
    height: '3em',
    marginTop: '1.5em',
    marginLeft: '1em'
  }
};
