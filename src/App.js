import React from 'react';
import SchoolApp from './SchoolApp';
import { ScheduleProvider } from './contexts/ScheduleContext';
import { LogInProvider } from './contexts/LogInContext';

export default function App() {
  return (
    <LogInProvider>
      <ScheduleProvider>
        <SchoolApp />
      </ScheduleProvider>
    </LogInProvider>
  );
}
