import React, { useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

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
  const {
    deleteButton,
    editButton,
    card,
    bullet,
    title,
    pos,
    buttons,
    editStudents,
    list
  } = classes;

  // REMOVE CLASS
  const removeClass = clickedId => {
    const newScheduleList = schedule.filter(x => x.classId !== clickedId);
    setSchedule(newScheduleList);
    // console.log(id);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        {isEditClassFormOn ? (
          <EditClassForm
            toggleForm={toggleClassForm}
            filteredClass={filteredClass}
          />
        ) : (
          <>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Period: {filteredClass.period}
            </Typography>
            <Typography variant="h5" component="h2">
              Subject: {filteredClass.subject}
            </Typography>
            <CardActions className={buttons}>
              <Button className={editButton} onClick={toggleClassForm}>
                Edit Class Details
              </Button>
              <Button
                aria-label="edit"
                variant="contained"
                className={editStudents}
                onClick={toggleAddStudentForm}
              >
                {isEditAddStudentFormOn ? `Go Back` : <EditIcon />}
              </Button>
              <Button
                className={deleteButton}
                onClick={() => removeClass(filteredClass.classId)}
              >
                Remove Class
              </Button>
            </CardActions>
          </>
        )}
        <div style={studentTitleContainer}>
          <Typography variant="body2" component="p">
            Students In Class
            <br />
          </Typography>
        </div>
        {isEditAddStudentFormOn ? (
          <EditStudentForm
            filteredClass={filteredClass}
            toggleForm={toggleAddStudentForm}
          />
        ) : (
          <List className={list}>{studentsInClass}</List>
        )}
      </CardContent>
    </Card>
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
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    minWidth: 1000,
    maxWidth: '100%'
  },
  editStudents: {
    height: '3em',
    marginTop: '1.5em',
    backgroundColor: 'green'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  list: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default withStyles(styles)(OneClass);
