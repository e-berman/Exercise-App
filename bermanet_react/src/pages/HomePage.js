import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {

    // Initialize State and History hooks
    const [exercise, setExercise] = useState([]);
    const history = useHistory();

    // async function that will delete an object based on id

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newExercise = exercise.filter(m => m._id !== _id);
            setExercise(newExercise);
        } else {
            console.error(`Failed to delete the exercise with _id: = ${_id}, status code = ${response.status}`);
        };
    };

    // async function that will edit the parameters of an object. Returns to homepage after successful edit.

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    };

    // async function that will load all created objects

    const loadExercise = async () => {
        // loads the data from the database - ensure path name is the same as the db name
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercise(data);
    }
    
    // Effect hook to use fetch api to retrieve HTTP request
    // *useEffect cannot take an async function as first parameter*
    useEffect(() => {
        loadExercise();
    }, []);

    return (
        <>
            <h1>Exercise Tracker</h1>
            <ExerciseList exercise={exercise} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link className="App-link" to="/add-exercise">Add Exercise</Link>
            <br />
        </>
    );
}

export default HomePage;