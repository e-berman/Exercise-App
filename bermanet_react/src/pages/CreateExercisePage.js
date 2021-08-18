import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateExercisePage() {

    // Initialize State and History hooks

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    // creates an exercise and adds to database

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST', 
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // error handling with response status check

        if (response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert(`Failed to add the exercise. Status code = ${response.status}`);
        }
        history.push("/");
    }

    return (
        <div> 
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Exercise name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                placeholder="Total reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                placeholder="Total weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="lbs or kgs"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;