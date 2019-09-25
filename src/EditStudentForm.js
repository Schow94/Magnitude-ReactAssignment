import React, { useContext, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { ScheduleContext } from './contexts/ScheduleContext';
import uuid from 'uuid/v4';

function EditStudentForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);

  const { filteredClass, classes, toggleForm } = props;
  const {
    button,
    fab,
    extendedIcon,
    container,
    textField,
    dense,
    menu
  } = classes;

  const [students, setStudents] = useState(filteredClass.students);

  const handleStudentInputChange = i => e => {
    const newStudents = students.map((x, idx) => {
      // console.log(x);
      // Is index passed up from onChange same as index of this student object?

      //if not the same index, return that student
      if (i !== idx) {
        return x;
      }
      // if student is the one we want to modify, we iterate thru all its properties
      // and modify {first, last, grade} and overwrite that students first,
      // last,grade properties
      console.log('x', x);

      return {
        ...x,
        [e.target.name]: e.target.value
      };
    });
    console.log(newStudents);

    setStudents(newStudents);
  };

  // Render out an input (first, last, grade) for each student in students array
  // students can be empty objects if the input is empty
  const renderStudentInputs = () => {
    return students.map((x, i) => {
      return (
        <div key={i}>
          <form
            onSubmit={saveChanges}
            className={container}
            noValidate
            autoComplete="off"
          >
            <h4>{`Student ${i + 1}`}</h4>
            <TextField
              id="standard-name"
              type="text"
              placeholder={`First Name`}
              value={x.first}
              onChange={handleStudentInputChange(i)}
              name="first"
              margin="normal"
              className={textField}
            />
            <TextField
              id="standard-name"
              type="text"
              placeholder={`Last Name`}
              value={x.last}
              onChange={handleStudentInputChange(i)}
              name="last"
              margin="normal"
              className={textField}
            />
            <TextField
              id="standard-name"
              type="number"
              // label="Grade Level"
              value={Number(x.grade)}
              onChange={handleStudentInputChange(i)}
              name="grade"
              margin="normal"
              className={textField}
            />
          </form>
        </div>
      );
    });
  };

  //ADD EMPTY STUDENT INPUT
  const addAnotherStudent = e => {
    e.preventDefault();
    // Adds an empty student input to students array
    setStudents([
      ...students,
      { studentId: uuid(), first: '', last: '', grade: '' }
    ]);
    // console.log('students', students);
  };

  //REMOVE EMPTY STUDENT INPUT
  const removeStudentInput = e => {
    e.preventDefault();
    const newStudentList = students.filter((x, i) => i !== students.length - 1);
    // console.log(newStudentList);
    setStudents(newStudentList);
  };

  //ADD NEWLY ADDED/UPDATED STUDENTS TO CLASS & SCHEDULE
  const saveChanges = e => {
    e.preventDefault();

    const updateClass = schedule.map(x => {
      return x.classId === filteredClass.classId
        ? { ...x, students: students }
        : x;
    });
    console.log('updateclass', updateClass);

    setSchedule(updateClass);

    console.log('schedule', schedule);
    //Clearing Form
    toggleForm();
  };
  return (
    <>
      {renderStudentInputs()}
      <Fab
        color="primary"
        aria-label="add"
        onClick={addAnotherStudent}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>

      {students.length === 1 ? null : (
        <Fab
          color="secondary"
          aria-label="delete"
          onClick={removeStudentInput}
          className={classes.fab}
        >
          <Typography variant="h4">-</Typography>
        </Fab>
      )}
      <Button onClick={saveChanges} className={button} color="primary">
        <SaveIcon />
      </Button>
    </>
  );
}

const styles = theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

export default withStyles(styles)(EditStudentForm);
