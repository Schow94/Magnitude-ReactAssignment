import React, { useContext } from "react";

import { ScheduleContext } from "./contexts/ScheduleContext";
import useToggle from "./hooks/useToggle";
import EditClassForm from "./EditClassForm";
import EditStudentForm from "./EditStudentForm";
import AddStudentToExistingClass from "./AddStudentToExistingClass";

export default function OneClass(props) {
	const { schedule, setSchedule } = useContext(ScheduleContext);
	const [isEditClassFormOn, toggleClassForm] = useToggle(false);
	const [isEditStudentFormOn, toggleStudentForm] = useToggle(false);
	const [isEditAddStudentFormOn, toggleAddStudentForm] = useToggle(false);

	const {
		subjectTitleContainer,
		subjectTitle,
		studentTitleContainer,
		studentTitle,
		deleteButton,
		editButton,
		button
	} = styles;

	const { filteredClass, studentsInClass } = props;

	// REMOVE CLASS
	const removeClass = clickedId => {
		const newScheduleList = schedule.filter(x => x.classId !== clickedId);
		setSchedule(newScheduleList);
		// console.log(id);
	};

	const editClass = (classId, subject) => {
		console.log(classId);
		console.log(subject);
		toggleClassForm();
	};

	return (
		<div className="Subject">
			{isEditClassFormOn ? (
				<EditClassForm
					toggleForm={toggleClassForm}
					filteredClass={filteredClass}
				/>
			) : (
				<>
					<div style={subjectTitleContainer}>
						<h1 style={subjectTitle}>Subject: {filteredClass.subject}</h1>
						<button
							style={editButton}
							onClick={() =>
								editClass(filteredClass.classId, filteredClass.subject)
							}
						>
							Edit Class
						</button>

						<button style={button} onClick={toggleStudentForm}>
							Edit Students
						</button>

						<button
							style={deleteButton}
							onClick={() => removeClass(filteredClass.classId)}
						>
							Remove Class
						</button>
					</div>
					<h3>Period: {filteredClass.period}</h3>
				</>
			)}
			<div style={studentTitleContainer}>
				<h3 style={studentTitle}>Students</h3>
				<button onClick={toggleAddStudentForm}>Add another student</button>
			</div>
			{isEditAddStudentFormOn ? <AddStudentToExistingClass /> : null}
			<ul>{studentsInClass}</ul>
			<hr />
		</div>
	);
}

const styles = {
	subjectTitleContainer: {
		display: "flex",
		flexDirection: "row"
	},
	//not working for some reason
	subjectTitle: {
		marginRight: "1em"
	},
	studentTitleContainer: {
		display: "flex",
		flexDirection: "row"
	},
	studentTitle: {
		marginRight: "1em"
	},
	editButton: {
		height: "3em",
		marginTop: "1.5em",
		backgroundColor: "orange"
	},
	deleteButton: {
		backgroundColor: "red",
		height: "3em",
		marginTop: "1.5em",
		marginLeft: "1em"
	},
	button: {
		height: "3em",
		marginTop: "1.5em",
		marginLeft: "1em",
		backgroundColor: "green"
	}
};
