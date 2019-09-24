import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

// import TestAutoSuggestion from './TestAutoSuggestion';
import Navbar from './Navbar';

import Teacher from './Teacher';
import AddForm from './AddForm';
import useToggle from './hooks/useToggle';

export default function SchoolApp() {
  const [addNewClassFormOn, toggle] = useToggle(false);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Typography variant="h3">Search for a Student or Class</Typography>

      <button onClick={toggle}>
        {addNewClassFormOn ? 'Close Form' : 'Add A New Class'}
      </button>
      {addNewClassFormOn ? <AddForm /> : null}
      <Teacher />
    </>
  );
}
