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
      {
        studentId: uuid(),
        studentName: { first: 'Kylie', last: 'Jenner' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Stephen', last: 'Chow' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Jacob', last: 'Mandel' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Rogelio', last: 'Alonso' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Benjamin', last: 'Liu' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Karen', last: 'Wong' },
        grade: 9
      }
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
        studentName: { first: 'Anika', last: 'Mandel' },
        grade: 11
      },
      {
        studentId: uuid(),
        studentName: { first: 'Samuel', last: 'Mandel' },
        grade: 11
      },
      {
        studentId: uuid(),
        studentName: { first: 'Michal', last: 'Sakin' },
        grade: 11
      },
      {
        studentId: uuid(),
        studentName: { first: 'Yulia', last: 'Mostovoy' },
        grade: 11
      },
      {
        studentId: uuid(),
        studentName: { first: 'Walfred', last: 'Ma' },
        grade: 11
      },
      {
        studentId: uuid(),
        studentName: { first: 'Evan', last: 'Lee' },
        grade: 11
      }
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
        studentName: { first: 'Ukina', last: 'Sanford' },
        grade: 10
      },
      {
        studentId: uuid(),
        studentName: { first: 'Misako', last: 'Stillion' },
        grade: 10
      },
      {
        studentId: uuid(),
        studentName: { first: 'Mort', last: 'Cowan' },
        grade: 10
      },
      {
        studentId: uuid(),
        studentName: { first: 'Jennifer', last: 'Puck' },
        grade: 10
      },
      {
        studentId: uuid(),
        studentName: { first: 'Shivali', last: 'Chag' },
        grade: 10
      },
      {
        studentId: uuid(),
        studentName: { first: 'Jason', last: 'Yu' },
        grade: 10
      }
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
        studentName: {
          first: 'Stephen',
          last: 'Chow'
        },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Cory', last: 'Gehr' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Austin', last: 'Bogar' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Greg', last: 'Vogt' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Matt', last: 'Perchman' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Michael', last: 'Sosa' },
        grade: 9
      }
    ]
  },
  //CLASS 5
  {
    classId: uuid(),
    subject: 'Art',
    period: 5,
    students: [
      //might be wise to store name:
      {
        studentId: uuid(),
        studentName: { first: 'Kobe', last: 'Bryant' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Shaquille', last: 'Oneill' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Derek', last: 'Fisher' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Pau', last: 'Gasol' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Andrew', last: 'Bynum' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Steve', last: 'Blake' },
        grade: 9
      }
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
        studentName: { first: 'Dwight', last: 'Howard' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Matt', last: 'Barnes' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Phil', last: 'Jackson' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Jeremy', last: 'Lin' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Lonzo', last: 'Ball' },
        grade: 9
      },
      {
        studentId: uuid(),
        studentName: { first: 'Kentavious', last: 'Caldwell-Pope' },
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
