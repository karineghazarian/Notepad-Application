import React, { useState } from "react";
import styles from "./notepad.module.css";
import Note from "../note/Note";
import Input from "../input/Input";
import Button from "../button/Button";
import { maxCharacter255, isValid } from "../../utils/validation"

function Notepad()
{
    const [notepadTitle, setNotepadTitle] = useState("");
    const [isTitleInValid, setIsTitleInValid] = useState(false);

    function handleChangeTitle(e)
    {
        const { value } = e.target
        if (isValid(maxCharacter255, value) && (value || (notepadTitle && !value)))
        {
            setIsTitleInValid(false);
            setNotepadTitle(value);
            if (!value)
            {
                setIsTitleInValid(true)
            }
        }
        else
        {
            setIsTitleInValid(true)
        }
    }

    return (
        <div className={styles.notepadContainer}>
            <label name={"notepadTitle"} className={styles.notepadLabel}>Notepad Title</label>
            <div className={styles.titleContainer}>
                <Input
                    name={"notepadTitle"}
                    placeholder={"My notepad title..."}
                    value={notepadTitle}
                    handleChange={handleChangeTitle}
                    isInvalid={isTitleInValid}
                    errorMessage={notepadTitle ? "* Maximum 255 characters are allowed" : "*Title is not allowed to be empty!"}
                />
                <div className={styles.notepadButtonsSection}>
                    <Button className={styles.buttonContainer}
                        style={{ backgroundColor: "var(--blue)" }}>Save</Button>
                    <Button style={{ backgroundColor: "var(--red)" }}>Delete</Button>
                </div>
            </div>
            <span className={styles.myNotesSpan}>My Notes</span>
            <Note
                toCreate
                title={""}
                noteText={""}
            />
            <Note
                title={"note1"}
                noteText={"ha ha ha ha ha"}
            />
        </div>
    )
}
export default React.memo(Notepad)