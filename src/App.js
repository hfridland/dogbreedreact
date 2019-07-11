import React from 'react';
import classes from './App.module.css';
import Header from './components/Header/Header';
import BreedList from './components/BreedList/BreedList';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <BreedList />
    </div>
  );
}

export default App;
