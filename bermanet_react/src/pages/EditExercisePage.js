import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    // edits an object based on id parameter. PUT request method. 

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT', 
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // error handling and response status check

        if (response.status === 200) {
            alert('Successfully edited the exercise');
        } else {
            alert(`Failed to edit the exercise. Status code = ${response.status}`);
        }
        history.push("/");
    }

    return (
        <div> 
            <h1>Edit Exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Confirm</button>
        </div>
    );

}

export default EditExercisePage;