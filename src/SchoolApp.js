import React, { useContext } from 'react';

import SearchForm from './SearchForm';
import Teacher from './Teacher';
import AddForm from './AddForm';
import useToggle from './hooks/useToggle';

export default function SchoolApp() {
  const [addNewClassFormOn, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {addNewClassFormOn ? 'Close Form' : 'Add Something'}
      </button>
      {addNewClassFormOn ? <AddForm /> : null}
      <Teacher />
    </div>
  );
}
