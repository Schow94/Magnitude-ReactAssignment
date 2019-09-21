import { useState } from 'react';

export default function useInputState(initialVal) {
  const [val, setVal] = useState(initialVal);

  const handleChange = e => {
    setVal(e.target.value);
    // console.log(e.target.name, val);
  };

  const reset = () => {
    setVal('');
  };

  return [val, handleChange, reset];
}
