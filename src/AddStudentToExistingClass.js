import React, { useContext, useState } from "react";

import useInputState from "./hooks/useInputState";
import { ScheduleContext } from "./contexts/ScheduleContext";
// import { ClassSizeContext } from './contexts/ClassSizeContext';
// import Select from './Select';
import uuid from "uuid/v4";

export default function AddStudentToExistingClass(props) {
	const { schedule, setSchedule } = useContext(ScheduleContext);
	// const { num } = useContext(ClassSizeContext);

	// Hook to keep track of multiple student inputs before submitting
	const [students, setStudents] = useState([
		{
			studentId: uuid(),
			first: "",
			last: "",
			grade: ""
		}
	]);

	// structure of students INPUT:
	// students = [
	//  {id:uuid(), first: '', last: '', grade: ''},
	// {id:uuid(), first: '', last: '', grade: ''}
	// ]

	// 2 callback fxns to get index that we're passing in from input and event object
	// map through array of student input objects
	// compare index that was passed up from onChange with the index/key from
	// each student object

	const handleStudentInputChange = i => e => {
		const newStudentList = students.map((x, idx) => {
			// console.log(x);
			// Is index passed up from onChange same as index of this student object?

			//if not the same index, return that student
			if (i !== idx) {
				return x;
			}
			// if student is the one we want to modify, we iterate thru all its properties
			// and modify {first, last, grade} and overwrite that students first,
			// last,grade properties
			return {
				...x,
				[e.target.name]: e.target.value
			};
		});

		// add new/modified student to input student array/state
		setStudents(newStudentList);
	};

	// Render out an input (first, last, grade) for each student in students array
	// students can be empty objects if the input is empty
	const renderStudentInputs = () => {
		return students.map((x, i) => {
			return (
				<div key={i}>
					<h4>{`Student ${i + 1}`}</h4>
					<input
						type="text"
						placeholder={`First Name`}
						value={x.first}
						onChange={handleStudentInputChange(i)}
						name="first"
					/>
					<input
						type="text"
						placeholder={`Last Name`}
						value={x.last}
						onChange={handleStudentInputChange(i)}
						name="last"
					/>
					<input
						type="number"
						placeholder={`Grade Level`}
						value={x.grade}
						onChange={handleStudentInputChange(i)}
						name="grade"
					/>
				</div>
			);
		});
	};

	const addAnotherStudent = e => {
		e.preventDefault();
		// Adds an empty student input to students array
		setStudents([
			...students,
			{ studentId: uuid(), first: "", last: "", grade: "" }
		]);
		// console.log('students', students);
	};

	const removeStudentInput = e => {
		e.preventDefault();
		const newStudentList = students.filter((x, i) => i !== students.length - 2);
		console.log(newStudentList);
		setStudents(newStudentList);
	};

	const addNewClass = e => {
		e.preventDefault();

		// console.log(students);

		let newClass = {
			classId: uuid(),
			students: students
		};

		// console.log(newClass);

		setSchedule([newClass, ...schedule]);
		// console.log(schedule);
		//Clearing Form

		setStudents([{ studentId: uuid(), first: "", last: "", grade: "" }]);
	};

	return (
		<div>
			<h1>Save new class updates</h1>
			<form onSubmit={addNewClass}>
				<button>Save</button>

				{renderStudentInputs()}
				<button onClick={addAnotherStudent}>Add another student</button>

				{students.length === 1 ? null : (
					<button onClick={removeStudentInput}>Remove extra student</button>
				)}
			</form>
		</div>
	);
}
