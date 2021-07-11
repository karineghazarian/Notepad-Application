import './App.css';
import Notepad from './components/notepad/Notepad';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App()
{
  // useEffect(() =>
  // {
  //   getNotePads().then((data) =>
  //   {
  //     console.log("data", data)
  //   });
  // }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <h1 className="mainTitle">Notepad Application</h1>
        <Notepad />
      </div>
    </ErrorBoundary>
  );
}

export default App;
