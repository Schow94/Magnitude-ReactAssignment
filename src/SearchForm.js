import React from 'react';

export default function SearchForm() {
  const { schedule, setSchedule } = useContext(ScheduleContext);

  const [search, handleSearchChange] = useInputState('');

  let filteredSchedule = schedule.filter(classX => {
    // SEARCH FOR A SUBJECT
    let subjectSearch =
      classX.subject.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    // SEARCH FOR A PERIOD
    // interacts with grade which also has numbers
    // let periodSearch =
    //   classX.period.toString().indexOf(search.toString()) !== -1;

    // SEARCH FOR A STUDENT BY FIRST/LAST NAME USING .INDEXOF()
    let studentSearch = classX.students.some(x => {
      // console.log(x.first);
      const firstName =
        x.first.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      const lastName =
        x.last.toLowerCase().indexOf(search.toLowerCase()) !== -1;

      //indexOf only works on strings
      const gradeSearch = x.grade.toString().indexOf(search.toString()) !== -1;

      return firstName || lastName || gradeSearch;
    });
    return studentSearch || subjectSearch;
  });
  return (
    <form>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Find a student by name, grade, class"
      />
    </form>
  );
}
