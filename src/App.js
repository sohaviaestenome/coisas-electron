import './App.css';
import {  Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = '/' element = {<Navigate to = {'/coisas'} /> }/>
        <Route exact path = '/coisas' element = {<Home />} />
      </Routes>
    </div>
  );
}

export default App;