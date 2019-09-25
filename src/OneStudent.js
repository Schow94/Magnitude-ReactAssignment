import React, { useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ScheduleContext } from './contexts/ScheduleContext';

function OneStudent(props) {
  const { filteredStudent, filteredClass, classes } = props;
  const { deleteButton } = styles;
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
    <ListItem key={filteredStudent.id}>
      {filteredStudent.first} {filteredStudent.last}
      <span style={{ marginLeft: '1em' }}>
        <strong>Grade: {filteredStudent.grade}</strong>
      </span>
      <IconButton
        aria-label="delete"
        color="secondary"
        className={classes.margin}
        onClick={() =>
          removeStudent(filteredClass.classId, filteredStudent.studentId)
        }
      >
        <DeleteIcon fontSize="large" />
      </IconButton>
    </ListItem>
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
  }
});

export default withStyles(styles)(OneStudent);
