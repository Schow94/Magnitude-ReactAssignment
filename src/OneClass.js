import React, { useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { ScheduleContext } from './contexts/ScheduleContext';
import useToggle from './hooks/useToggle';
import EditClassForm from './EditClassForm';
import EditStudentForm from './EditStudentForm';

function OneClass(props) {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [isEditClassFormOn, toggleClassForm] = useToggle(false);
  const [isEditAddStudentFormOn, toggleAddStudentForm] = useToggle(false);

  const {
    subjectTitleContainer,
    subjectTitle,
    studentTitleContainer,
    studentTitle
  } = styles;

  const { filteredClass, studentsInClass, classes } = props;
  const { deleteButton, editButton } = classes;

  // REMOVE CLASS
  const removeClass = clickedId => {
    const newScheduleList = schedule.filter(x => x.classId !== clickedId);
    setSchedule(newScheduleList);
    // console.log(id);
  };

  const editClass = () => {
    toggleClassForm();
  };

  return (
    <div className="Subject">
      {isEditClassFormOn ? (
        <EditClassForm
          toggleForm={toggleClassForm}
          filteredClass={filteredClass}
        />
      ) : (
        <>
          <div style={subjectTitleContainer}>
            <h1 style={subjectTitle}>Subject: {filteredClass.subject}</h1>
            <h1 style={subjectTitle}>Period: {filteredClass.period}</h1>
            <Button className={editButton} onClick={() => editClass()}>
              Edit Class Details
            </Button>
            <Button
              className={deleteButton}
              onClick={() => removeClass(filteredClass.classId)}
            >
              Remove Class
            </Button>
          </div>
        </>
      )}
      <div style={studentTitleContainer}>
        <h3 style={studentTitle}>Students</h3>

        <Button
          aria-label="edit"
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={toggleAddStudentForm}
        >
          {isEditAddStudentFormOn ? `Go Back` : <EditIcon />}
        </Button>
      </div>
      {isEditAddStudentFormOn ? (
        <EditStudentForm
          filteredClass={filteredClass}
          toggleForm={toggleAddStudentForm}
        />
      ) : (
        <ul>{studentsInClass}</ul>
      )}
      <hr />
    </div>
  );
}

const styles = theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    backgroundColor: 'red',
    height: '3em',
    marginTop: '1.5em',
    marginLeft: '1em'
  },
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
  button: {
    margin: theme.spacing(1)
  }
});

export default withStyles(styles)(OneClass);
