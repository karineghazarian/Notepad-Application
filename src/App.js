import { useEffect } from 'react';
import './App.css';
import { getNotePads } from './services/notepadApi';
import Notepad from './components/notepad/Notepad';

function App()
{
  useEffect(() =>
  {
    getNotePads().then((data) =>
    {
      console.log("data", data)
    });
  }, []);

  return (
    <div className="App">
      <h1 className="mainTitle">Notepad Application</h1>
      <Notepad />
    </div>
  );
}

export default App;
