import { useEffect } from 'react';
import './App.css';
import { getNotePads, createNotePad } from './services/notepadApi';

function App()
{
  useEffect(() =>
  {

    // createNotePad({
    //   title: {
    //     content: 'hi'
    //   }
    // }).then((data) =>
    // {
    //   console.log("createNotePad", data)
    // });
    getNotePads().then((data) =>
    {
      console.log("data", data)
    });
  }, []);

  return (
    <div className="App">
      Hey here is our basic react app, nice to see you :)
    </div>
  );
}

export default App;
