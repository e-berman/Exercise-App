import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import { useState } from 'react';

function App() {

  // Initialize State hook to pass down data to EditExercisePage.
  // Due to being on the same level as HomePage, unable to access content.
  const [exerciseToEdit, setExerciseToEdit] = useState();
  
  return (
    <div className="App">
      <Router>
      <div className="App-header">
        <Route path="/" exact>
          <HomePage setExerciseToEdit={setExerciseToEdit}/>
        </Route>
        <Route path="/add-exercise">
          <CreateExercisePage />
        </Route>
        <Route path="/edit-exercise">
          <EditExercisePage exerciseToEdit={exerciseToEdit}/>
        </Route>
      </div>
      </Router>
    </div>
  );
}

export default App;
