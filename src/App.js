import './App.css';
import {  Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  console.log("React component is being executed");
  return (
    <div className="App">
      <h1>Minimal React component</h1>
      <Routes>
        <Route exact path = '/' element = {<Home />} />
      </Routes>
    </div>
  );
}

export default App;