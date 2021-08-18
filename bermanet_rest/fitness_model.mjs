import mongoose from 'mongoose';

// Connect to the exercise collection in the MongoDB server. Runs on port 27017.
mongoose.connect(
    'mongodb://localhost:27017/exercises',
    { useNewUrlParser: true }
)

const db = mongoose.connection;

// Validate db connection
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose.');
});

mongoose.set('useCreateIndex', true);

// Define schema for the exercise object
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

// Compile the model from the schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Creates an Exercise object
 * 
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns Promise - resolved to JSON after .save
 */

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

/**
 * Reads Exercise object(s)
 * 
 * No params
 * 
 * @returns all JSON objects in the collection
 */

const readExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Updates a single Exercise object
 * 
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns Promise - resolves to 1 if properties were updated
 */

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({ _id: _id}, { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.nModified;
}

/**
 * Deletes a single Exercise object
 *
 * @param {String} _id 
 * @returns Promise - number of deleted documents
 */

const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

export { createExercise, readExercises, updateExercise, deleteExercise };