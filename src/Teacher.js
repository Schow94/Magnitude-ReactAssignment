import React, { useContext, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { ScheduleContext } from './contexts/ScheduleContext';
import EditClassForm from './EditClassForm';
import OneClass from './OneClass';
import OneStudent from './OneStudent';

import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';

function Teacher(props) {
  const { classes } = props;
  const { container, textField, dense, menu } = classes;

  const { schedule, setSchedule } = useContext(ScheduleContext);

  const [search, handleSearchChange] = useInputState('');

  let filteredSchedule = schedule.filter(classX => {
    // SEARCH FOR A SUBJECT
    let subjectSearch =
      classX.subject.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    // SEARCH FOR A PERIOD
    // interacts with grade which also has numbers
    // let periodSearch =
    //   classX.period.toString().indexOf(search.toString()) !== -1;

    // SEARCH FOR A STUDENT BY FIRST/LAST NAME USING .INDEXOF()
    let studentSearch = classX.students.some(x => {
      // console.log(x.first);
      const firstName =
        x.first.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      const lastName =
        x.last.toLowerCase().indexOf(search.toLowerCase()) !== -1;

      //indexOf only works on strings
      const gradeSearch = x.grade.toString().indexOf(search.toString()) !== -1;

      return firstName || lastName || gradeSearch;
    });
    return studentSearch || subjectSearch;
  });

  return (
    //Search Bar goes here
    <>
      <form className={container} noValidate autoComplete="off">
        <TextField
          type="text"
          id="standard-name"
          label="Find a student by name, grade, class"
          className={textField}
          value={search}
          onChange={handleSearchChange}
          margin="normal"
        />
      </form>

      <ul>
        {filteredSchedule.map(x => {
          // console.log(x.subject, x.classId);
          //x is our a class object that we searched for
          const studentsInClass = x.students.map(y => {
            // console.log(y);
            return (
              <OneStudent
                filteredStudent={y}
                filteredClass={x}
                key={y.studentId}
              />
            );
          });
          return (
            <OneClass
              filteredClass={x}
              studentsInClass={studentsInClass}
              key={x.classId}
            />
          );
        })}
      </ul>
    </>
  );
}
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

export default withStyles(styles)(Teacher);
