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
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';

import uuid from 'uuid/v4';

function AddForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  // const { num } = useContext(ClassSizeContext);

  const [period, handlePeriodChange, resetPeriod] = useInputState('');
  const [subject, handleSubjectChange, resetSubject] = useInputState('');

  // Hook to keep track of multiple student inputs before submitting
  const [students, setStudents] = useState([
    {
      studentId: uuid(),
      first: '',
      last: '',
      grade: ''
    }
  ]);

  const { classes } = props;
  const { container, textField, dense, menu, addClassButton } = classes;

  // structure of students INPUT:
  // students = [
  //  {id:uuid(), first: '', last: '', grade: ''},
  // {id:uuid(), first: '', last: '', grade: ''}
  // ]

  // 2 callback fxns to get index that we're passing in from input and event object
  // map through array of student input objects
  // compare index that was passed up from onChange with the index/key from
  // each student object

  const handleStudentInputChange = i => e => {
    const newStudentList = students.map((x, idx) => {
      // console.log(x);
      // Is index passed up from onChange same as index of this student object?

      //if not the same index, return that student
      if (i !== idx) {
        return x;
      }
      // if student is the one we want to modify, we iterate thru all its properties
      // and modify {first, last, grade} and overwrite that students first,
      // last,grade properties
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
        <Container key={i}>
          <h4>{`Student ${i + 1}`}</h4>
          <TextField
            type="text"
            label={`First Name`}
            className={classes.textField}
            value={x.first}
            onChange={handleStudentInputChange(i)}
            name="first"
            margin="normal"
          />
          <TextField
            className={classes.textField}
            type="text"
            label={`Last Name`}
            value={x.last}
            onChange={handleStudentInputChange(i)}
            name="last"
            margin="normal"
          />
          <TextField
            className={classes.textField}
            type="number"
            label={`Grade Level`}
            value={x.grade}
            onChange={handleStudentInputChange(i)}
            name="grade"
            margin="normal"
          />
        </Container>
      );
    });
  };

  const addAnotherStudent = e => {
    e.preventDefault();
    // Adds an empty student input to students array
    setStudents([
      ...students,
      { studentId: uuid(), first: '', last: '', grade: '' }
    ]);
    // console.log('students', students);
  };

  const removeStudentInput = e => {
    e.preventDefault();
    const newStudentList = students.filter((x, i) => i !== students.length - 1);
    console.log(newStudentList);
    setStudents(newStudentList);
  };

  const addNewClass = e => {
    e.preventDefault();

    // console.log(students);

    let newClass = {
      classId: uuid(),
      subject: subject,
      period: period,
      students: students
    };

    // console.log(newClass);

    setSchedule([newClass, ...schedule]);
    // console.log(schedule);
    //Clearing Form
    setStudents([{ studentId: uuid(), first: '', last: '', grade: '' }]);
  };

  return (
    <Card className={container}>
      <h1>Add a new class</h1>
      <form onSubmit={addNewClass}>
        <Button className={addClassButton} aria-label="add-new-class">
          Add New Class
        </Button>

        <TextField
          autoComplete="off"
          onChange={handlePeriodChange}
          name="period"
          label="period"
          className={classes.textField}
          value={period}
          margin="normal"
        />
        <TextField
          autoComplete="off"
          onChange={handleSubjectChange}
          name="subject"
          label="subject"
          className={classes.textField}
          value={subject}
          margin="normal"
        />

        {renderStudentInputs()}
        <Fab
          onClick={addAnotherStudent}
          color="primary"
          aria-label="add-student-input"
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
      </form>
    </Card>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2em'
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
  },
  fab: {
    margin: theme.spacing(1)
  },
  addClassButton: {
    height: '3em',
    marginTop: '1.5em',
    backgroundColor: 'orange'
  }
});

export default withStyles(styles)(AddForm);
