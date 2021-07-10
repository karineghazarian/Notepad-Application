import { useEffect, useState } from 'react';
import isValid, { maxCharacter255 } from './utils/validation';
import './App.css';
import Button from './components/button/Button';
import Input from './components/input/Input';
import Textarea from './components/textarea/Textarea';
import { getNotePads, createNotePad } from './services/notepadApi';

function App()
{
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() =>
  {
    // createNotePad({
    //   title: {S
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

  function handleChange(e)
  {
    if (isValid(maxCharacter255, e.target.value))
    {
      setIsInvalid(false);
      setInputValue(e.target.value);
    }
    else
    {
      setIsInvalid(true)
    }
  }

  return (
    <div className="App">
      <Button backgroundColor={"var(--red)"} disabled={disabled}>
        Save
      </Button>
      <Input
        placeholder={"Type a title..."}
        handleChange={handleChange}
        value={inputValue}
        pattern={maxCharacter255}
        isInvalid={isInvalid}
        errorMessage={"* Maximum 255 character is allowed"}
      />
      <Textarea placeholder={"Enter note..."} />
    </div>
  );
}

export default App;
