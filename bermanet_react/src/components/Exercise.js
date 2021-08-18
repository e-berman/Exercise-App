import React from 'react';
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";

function Exercise ({ exercise, onDelete, onEdit }){

    // onEdit/onDelete passed down the DOM tree from HomePage -> ExerciseList -> Exercise

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>< IoPencilSharp onClick={() => onEdit(exercise)}/></td>
            <td>< IoTrashBinSharp onClick={() => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise;