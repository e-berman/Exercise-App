import * as exercise from './fitness_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

// Need for REST
app.use(express.json());


// Route handler for CREATE

app.post("/exercises", (req, res) => {
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        // If no error, 201 status provided and object sent as response in JSON format
        .then(exercise_obj => {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json(exercise_obj);
        })
        // In case of failed Promise, raise 404 status code
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: "Request Failed" });
        });
});

// Route handler for READ

app.get("/exercises", (req, res) => {
    let filter = {}

    exercise.readExercises(filter, '', 0)
        // If Promise is fulfilled, 200 status provided and all objects in collection are displayed in JSON format
        .then(exercise_obj => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(exercise_obj);
        })
        // In case of failed Promise, raise 400 status code
        .catch(error => {
            console.log(error)
            res.status(400).json(error);

        });
});

// Route handler for UPDATE

app.put("/exercises/:_id", (req, res) => {
    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        // if any fields were updated, returns the updated object in JSON format
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight:req.body.weight, unit: req.body.unit, date: req.body.date });
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        // In case of failed Promise, raise 400 status code
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Request Failed" });
        });
});

// Route handler for DELETE

app.delete("/exercises/:_id", (req, res) => {
    exercise.deleteExercise(req.params._id)
        // If deletedCount is at least 1, will send a 204 status confirming the removal
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.send({ Error: "Request Failed" });
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});