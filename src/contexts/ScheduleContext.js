import React, { createContext, useState } from 'react';
import uuid from 'uuid/v4';

export const ScheduleContext = createContext();

const initialVal = [
  // teacher is an array of 6 classes represented as objects

  // CLASS 1
  {
    classId: uuid(),
    subject: 'Math',
    period: 1,
    students: [
      //might be wise to store name:
      { studentId: uuid(), name: { first: 'Kylie', last: 'Jenner' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Stephen', last: 'Chow' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Jacob', last: 'Mandel' }, grade: 9 },
      {
        studentId: uuid(),
        name: { first: 'Rogelio', last: 'Alonso' },
        grade: 9
      },
      { studentId: uuid(), name: { first: 'Benjamin', last: 'Liu' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Karen', last: 'Wong' }, grade: 9 }
    ]
  },

  // CLASS 2
  {
    classId: uuid(),
    subject: 'Science',
    period: 2,
    students: [
      {
        studentId: uuid(),
        name: { first: 'Anika', last: 'Mandel' },
        grade: 11
      },
      {
        studentId: uuid(),
        name: { first: 'Samuel', last: 'Mandel' },
        grade: 11
      },
      {
        studentId: uuid(),
        name: { first: 'Michal', last: 'Sakin' },
        grade: 11
      },
      {
        studentId: uuid(),
        name: { first: 'Yulia', last: 'Mostovoy' },
        grade: 11
      },
      { studentId: uuid(), name: { first: 'Walfred', last: 'Ma' }, grade: 11 },
      { studentId: uuid(), name: { first: 'Evan', last: 'Lee' }, grade: 11 }
    ]
  },

  // CLASS 3
  {
    classId: uuid(),
    subject: 'History',
    period: 3,
    students: [
      {
        studentId: uuid(),
        name: { first: 'Ukina', last: 'Sanford' },
        grade: 10
      },
      {
        studentId: uuid(),
        name: { first: 'Misako', last: 'Stillion' },
        grade: 10
      },
      { studentId: uuid(), name: { first: 'Mort', last: 'Cowan' }, grade: 10 },
      {
        studentId: uuid(),
        name: { first: 'Jennifer', last: 'Puck' },
        grade: 10
      },
      {
        studentId: uuid(),
        name: { first: 'Shivali', last: 'Chag' },
        grade: 10
      },
      { studentId: uuid(), name: { first: 'Jason', last: 'Yu' }, grade: 10 }
    ]
  },
  // CLASS 4
  {
    classId: uuid(),
    subject: 'Music',
    period: 1,
    students: [
      //might be wise to store name:
      {
        studentId: uuid(),
        name: {
          first: 'Stephen',
          last: 'Chow'
        },
        grade: 9
      },
      { studentId: uuid(), name: { first: 'Cory', last: 'Gehr' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Austin', last: 'Bogar' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Greg', last: 'Vogt' }, grade: 9 },
      {
        studentId: uuid(),
        name: { first: 'Matt', last: 'Perchman' },
        grade: 9
      },
      { studentId: uuid(), name: { first: 'Michael', last: 'Sosa' }, grade: 9 }
    ]
  },
  //CLASS 5
  {
    classId: uuid(),
    subject: 'Art',
    period: 5,
    students: [
      //might be wise to store name:
      { studentId: uuid(), name: { first: 'Kobe', last: 'Bryant' }, grade: 9 },
      {
        studentId: uuid(),
        name: { first: 'Shaquille', last: 'Oneill' },
        grade: 9
      },
      { studentId: uuid(), name: { first: 'Derek', last: 'Fisher' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Pau', last: 'Gasol' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Andrew', last: 'Bynum' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Steve', last: 'Blake' }, grade: 9 }
    ]
  },
  // CLASS 6
  {
    classId: uuid(),
    subject: 'PE',
    period: 6,
    students: [
      //might be wise to store name:
      {
        studentId: uuid(),
        name: { first: 'Dwight', last: 'Howard' },
        grade: 9
      },
      { studentId: uuid(), name: { first: 'Matt', last: 'Barnes' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Phil', last: 'Jackson' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Jeremy', last: 'Lin' }, grade: 9 },
      { studentId: uuid(), name: { first: 'Lonzo', last: 'Ball' }, grade: 9 },
      {
        studentId: uuid(),
        name: { first: 'Kentavious', last: 'Caldwell-Pope' },
        grade: 9
      }
    ]
  }
];

export function ScheduleProvider(props) {
  const [schedule, setSchedule] = useState(initialVal);

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule }}>
      {props.children}
    </ScheduleContext.Provider>
  );
}
