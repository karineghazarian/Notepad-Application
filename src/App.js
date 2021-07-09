import './App.css';
import { getGists } from './services/gistsApi';

function App()
{
  getGists().then(console.log());
  return (
    <div className="App">
      Hey here is our basic react app, nice to see you :)
    </div>
  );
}

export default App;
