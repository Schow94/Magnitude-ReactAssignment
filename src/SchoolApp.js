import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import TestAutoSuggestion from './TestAutoSuggestion';
import Navbar from './Navbar';

import Teacher from './Teacher';
import AddForm from './AddForm';
import useToggle from './hooks/useToggle';

function SchoolApp(props) {
  const [addNewClassFormOn, toggle] = useToggle(false);
  const { classes } = props;
  const { addClassButton, title } = classes;

  return (
    <>
      <CssBaseline />
      <Navbar />
      <div style={styles.main}>
        <Typography className={title} variant="h3">
          Manage your students
        </Typography>
        <Button className={addClassButton} onClick={toggle}>
          {addNewClassFormOn ? 'Close Form' : 'Add A New Class'}
        </Button>
        {addNewClassFormOn ? <AddForm /> : null}

        <Teacher />
      </div>
    </>
  );
}

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  addClassButton: {
    margin: '2em',
    backgroundColor: 'cyan'
  },
  title: { marginTop: '1em' }
};

export default withStyles(styles)(SchoolApp);
