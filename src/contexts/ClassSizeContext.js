import React, { createContext, useState } from 'react';

export const ClassSizeContext = createContext();

export function ClassSizeProvider(props) {
  const [num, setNum] = useState(1);

  return (
    <ClassSizeContext.Provider value={{ num, setNum }}>
      {props.children}
    </ClassSizeContext.Provider>
  );
}
