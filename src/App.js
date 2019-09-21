import React from 'react';
import SchoolApp from './SchoolApp';
import { ScheduleProvider } from './contexts/ScheduleContext';
import { ClassSizeProvider } from './contexts/ClassSizeContext';

export default function App() {
  return (
    <ScheduleProvider>
      <ClassSizeProvider>
        <SchoolApp />
      </ClassSizeProvider>
    </ScheduleProvider>
  );
}
