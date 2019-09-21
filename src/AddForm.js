import React, { useContext } from 'react';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';
import { ClassSizeContext } from './contexts/ClassSizeContext';
import Select from './Select';
import uuid from 'uuid/v4';

export default function AddForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { num } = useContext(ClassSizeContext);

  const [period, handlePeriodChange, resetPeriod] = useInputState('');
  const [subject, handleSubjectChange, resetSubject] = useInputState('');

  // const [students, setStudents] = useInputState();
  const [last, handleLastNameChange, resetLast] = useInputState('');
  const [first, handleFirstNameChange, resetFirst] = useInputState('');

  // const handleStudentInputChange = () => {
  //   const newStudentList = [
  //     ...students,
  //     [{ name: { first: '', last: '' }, grade: '' }]
  //   ];
  //   setStudents(newStudentList);
  // };

  const renderStudentInputs = () => {
    var numInputs = [];
    // var numInputs = [{ name: { first: '', last: '' }, grade: '' }];

    for (let i = 1; i <= num; i++) {
      numInputs.push(
        <div key={i}>
          <input
            autoComplete="off"
            onChange={handleFirstNameChange}
            name="first"
            placeholder="first"
            value={first}
          />
          <input
            autoComplete="off"
            onChange={handleLastNameChange}
            name="last"
            placeholder="last"
            value={last}
          />
        </div>
      );
    }
    return numInputs;
  };

  const addNewClass = e => {
    e.preventDefault();

    // let studentList = [];

    // for (let i = 0; i < num; i++){
    //   studentList.push()
    // }

    let newClass = {
      classId: uuid(),
      subject: subject,
      period: period,
      students: [
        //might be wise to store name:
        {
          studentId: uuid(),
          name: { first: first, last: last },
          grade: 9
        }
      ]
    };
    console.log(newClass);
    setSchedule([newClass, ...schedule]);

    resetPeriod();
    resetSubject();
    resetFirst();
    resetLast();
  };

  return (
    <div>
      <h1>Add a new class</h1>
      <h5>How many students are in this class?</h5>
      <Select />
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
        {/* <input
            onChange={this.handleChange}
            name="first"
            placeholder="first"
            value={this.state.first}
          />

          <input
            onChange={this.handleChange}
            name="last"
            placeholder="last"
            value={this.state.last}
          /> */}
        <button>Add New Class</button>
      </form>
    </div>
  );
}
