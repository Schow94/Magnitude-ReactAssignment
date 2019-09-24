import React, { useContext, useState } from "react";
import uuid from "uuid/v4";

import useInputState from "./hooks/useInputState";
import { ScheduleContext } from "./contexts/ScheduleContext";

export default function EditForm(props) {
	const { schedule, setSchedule } = useContext(ScheduleContext);
	const { filteredClass, toggleForm } = props;

	const [period, handlePeriodChange, resetPeriod] = useInputState(
		filteredClass.period
	);

	const [subject, handleSubjectChange, resetSubject] = useInputState(
		filteredClass.subject
	);

	//figure out which class was clicked on & filter through all classes to get ours
	const saveChange = e => {
		e.preventDefault();
		// Map through each class and if todo is unaltered, return that todo
		// If todo has been altered, updated period & subject properties with the new
		// values from the handleChange for the inputs
		const classToEdit = schedule.map(x => {
			return x.classId === filteredClass.classId
				? { ...x, period: Number(period), subject: subject }
				: x;
		});

		setSchedule(classToEdit);
		toggleForm();
	};

	return (
		<div>
			<h1>Edit {`${filteredClass.subject} Class`}</h1>
			<form onSubmit={saveChange}>
				<button>Save Updated Class</button>

				<input
					autoComplete="off"
					onChange={handlePeriodChange}
					name="period"
					placeholder="period"
					value={period}
				/>
				<input
					autoComplete="off"
					onChange={handleSubjectChange}
					name="subject"
					placeholder="subject"
					value={subject}
				/>

				<button>Add another student</button>

				{students.length === 1 ? null : <button>Remove extra student</button>}
			</form>
		</div>
	);
}
