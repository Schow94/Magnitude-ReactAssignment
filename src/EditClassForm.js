import React, { useContext, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import useInputState from './hooks/useInputState';
import { ScheduleContext } from './contexts/ScheduleContext';

function EditClassForm(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { filteredClass, toggleForm } = props;

  const [period, handlePeriodChange] = useInputState(filteredClass.period);

  const [subject, handleSubjectChange] = useInputState(filteredClass.subject);

  const { classes } = props;
  const {
    container,
    textField,
    dense,
    menu,
    SaveClassButton,
    GoBackButton,
    title
  } = classes;

  // Hook to keep track of multiple student inputs before submitting

  const saveChange = () => {
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
    <>
      <Typography className={title}>
        Edit {`${filteredClass.subject} Class`}
      </Typography>
      <Button className={GoBackButton} onClick={toggleForm}>
        Go back
      </Button>
      <form onSubmit={saveChange} className={container}>
        <Button onClick={saveChange} className={SaveClassButton}>
          Save Class Details
        </Button>

        <TextField
          autoComplete="off"
          onChange={handlePeriodChange}
          name="period"
          label="period"
          value={period}
          margin="normal"
          className={textField}
        />
        <TextField
          autoComplete="off"
          onChange={handleSubjectChange}
          name="subject"
          label="subject"
          value={subject}
          margin="normal"
          className={textField}
        />
      </form>
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
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  SaveClassButton: {
    backgroundColor: 'green',
    height: '3em',
    marginTop: '1.5em',
    marginLeft: '1em'
  },
  GoBackButton: {
    backgroundColor: 'blue',
    height: '3em',
    marginTop: '1.5em',
    marginLeft: '1em'
  },
  title: {
    fontWeight: '400',
    fontSize: '2em'
  }
});

export default withStyles(styles)(EditClassForm);
