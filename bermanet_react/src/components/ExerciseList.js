import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercise, onDelete, onEdit }) {

    // onEdit/onDelete passed down DOM tree from HomePage

    return(
        <table id='exercises'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Reps</td>
                    <td>Weight</td>
                    <td>Unit</td>
                    <td>Date</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {exercise.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;