import React, { useContext, useState } from 'react';

import { ScheduleContext } from './contexts/ScheduleContext';
import EditClassForm from './EditClassForm';

import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';

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
  const [isEditClassFormOn, toggleClassForm] = useToggle(false);
  const [isEditStudentFormOn, toggleStudentForm] = useToggle(false);

  const [search, handleSearchChange] = useInputState('');

  const {
    subjectTitleContainer,
    subjectTitle,
    studentTitleContainer,
    studentTitle,
    deleteButton,
    editButton
  } = styles;

  // REMOVE CLASS
  const removeClass = clickedId => {
    const newScheduleList = schedule.filter(x => x.classId !== clickedId);
    setSchedule(newScheduleList);
    // console.log(id);
  };

  // REMOVE A STUDENT FROM A CLASS
  const removeStudent = (clickedClassId, clickedStudentId) => {
    //findIndex returns first array item that passes our callback fxn
    const classToRemove = schedule.findIndex(x => x.classId === clickedClassId);
    // console.log('class to remove', classToRemove);

    // const studentToRemove = schedule[classToRemove].students.findIndex(
    //   y => y.studentId === clickedStudentId
    // );
    // console.log('studentToRemove', studentToRemove);

    const newClass = schedule.filter((x, cIdx) => {
      return x.classId === clickedClassId;
    });
    // console.log('new class', newClass[0]);

    const newStudentList = newClass[0].students.filter((y, sIdx) => {
      console.log(sIdx);
      return y.studentId !== clickedStudentId;
    });
    // console.log('New Student List', newStudentList);

    newClass[0].students = newStudentList;
    const updatedSchedule = [...schedule];
    // console.log('updated schedule', updatedSchedule);
    updatedSchedule[classToRemove] = newClass[0];
    setSchedule(updatedSchedule);
  };

  // EDIT
  // Editing a class and a student are essentially the same functionality
  // In order to edit a student, you need to edit a class
  const editClass = (classId, subject) => {
    // console.log(classId);
    // console.log(subject);
    toggleClassForm();
  };

  // Fxn to map through all classes
  // Figure out how to map through students after mapping through the classes
  // const renderClassList = () => {
  //   return schedule.map(x => {
  //     // console.log(x.classId);
  //     const studentsInClass = x.students.map(y => {
  //       // console.log(y.name.last);
  //       return (
  //         <li key={y.studentId}>
  //           {y.first} {y.last}
  //           <span style={{ marginLeft: '1em' }}>
  //             <strong>Grade: {y.grade}</strong>
  //           </span>
  //           <button style={editButton}>Edit Students</button>
  //           <button
  //             style={deleteButton}
  //             onClick={() => removeStudent(x.classId, y.studentId)}
  //           >
  //             Remove Students
  //           </button>
  //         </li>
  //       );
  //     });
  //     return (
  //       <div className="Subject" key={x.classId}>
  //         <div style={subjectTitleContainer}>
  //           <h1 style={subjectTitle}>Subject: {x.subject}</h1>
  //           <button
  //             style={editButton}
  //             onClick={() => editClass(x.classId, x.subject)}
  //           >
  //             Edit Class
  //           </button>
  //           <button style={deleteButton} onClick={() => removeClass(x.classId)}>
  //             Remove Class
  //           </button>
  //         </div>
  //         <h3>Period: {x.period}</h3>
  //         <div style={studentTitleContainer}>
  //           <h3 style={studentTitle}>Students</h3>
  //         </div>
  //         <ul>{studentsInClass}</ul>
  //         <hr />
  //       </div>
  //     );
  //   });
  // };
  // let filteredSchedule = schedule.filter(classX => {
  //   console.log(classX);
  //   let studentSearch = classX.students.filter(x => {
  //     let searchedStudent = x.first.indexOf(search) !== -1;
  //     // console.log('searched student', searchedStudent);
  //     return searchedStudent;
  //   });

  //   // console.log('classX', classX);

  //   return studentSearch;
  // });

  return (
    //Search Bar goes here
    <>
      <form>
        <input type="text" value={search} onChange={handleSearchChange} />
      </form>

      <ul>
        {schedule.map(x => {
          // console.log('x', x);
          //x is our a class object that we searched for
          const studentsInClass = x.students.map(y => {
            return (
              <li key={y.studentId}>
                {y.first} {y.last}
                <span style={{ marginLeft: '1em' }}>
                  <strong>Grade: {y.grade}</strong>
                </span>
                <button style={editButton}>Edit Students</button>
                <button
                  style={deleteButton}
                  onClick={() => removeStudent(x.classId, y.studentId)}
                >
                  Remove Students
                </button>
              </li>
            );
          });
          return (
            <div className="Subject" key={x.classId}>
              <div style={subjectTitleContainer}>
                <h1 style={subjectTitle}>Subject: {x.subject}</h1>
                <button
                  style={editButton}
                  onClick={() => editClass(x.classId, x.subject)}
                >
                  Edit Class
                </button>
                <button
                  style={deleteButton}
                  onClick={() => removeClass(x.classId)}
                >
                  Remove Class
                </button>
              </div>
              <h3>Period: {x.period}</h3>
              <div style={studentTitleContainer}>
                <h3 style={studentTitle}>Students</h3>
              </div>
              <ul>{studentsInClass}</ul>
              <hr />
            </div>
          );
        })}
      </ul>
    </>
  );
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

export default Teacher;
