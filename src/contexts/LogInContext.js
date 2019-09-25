import React, { createContext, useState } from 'react';

export const LogInContext = createContext();

export function LogInProvider(props) {
  const [name, setName] = useState('');

  //setName
  const changeName = val => setName(val);

  //Clear input from useInputState hook inside <Form />

  return (
    <LogInContext.Provider value={{ name, changeName }}>
      {props.children}
    </LogInContext.Provider>
  );
}
