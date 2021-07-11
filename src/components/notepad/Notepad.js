import React, { useEffect, useState } from "react";
import styles from "./notepad.module.css";
import Note from "../note/Note";
import Input from "../input/Input";
import Button from "../button/Button";
import { maxCharacter255, isValid } from "../../utils/validation"

function Notepad()
{
    const [notepad, setNotepad] = useState({
        title: "",
        notes: []
    })
    const [notepadTitle, setNotepadTitle] = useState("");
    const [isTitleInValid, setIsTitleInValid] = useState(false);
    const storage = window.localStorage;

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

    function titleUniqueChecker(title)
    {
        const note = notepad.notes.find((note) => note.title === title);
        return !note;
    }

    function addNote(note)
    {
        setNotepad((prevNotepad) => (
            {
                ...prevNotepad,
                notes: [...prevNotepad.notes, note]
            }
        ));
    }

    function deleteNote(id)
    {
        setNotepad((prevNotepad) => (
            {
                ...prevNotepad,
                notes: prevNotepad.notes.filter((note) => note.id !== id)
            }
        ));
    }

    function updateNote(noteToChange)
    {
        const foundNote = notepad.notes.find((note) => note.id === noteToChange.id);
        const index = notepad.notes.indexOf(foundNote);
        if (index !== -1)
        {
            setNotepad((prevNotepad) => (
                {
                    ...prevNotepad,
                    notes: [...prevNotepad].splice(index, 1, noteToChange)
                }
            ))
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
                key={"create"}
                toCreate
                addNote={addNote}
                titleUniqueChecker={titleUniqueChecker}
            />
            {
                notepad.notes.map((note) =>
                (
                    <Note
                        key={note.id}
                        title={note.title}
                        text={note.text}
                        id={note.id}
                        deleteNote={deleteNote}
                        titleUniqueChecker={titleUniqueChecker}
                    />
                ))
            }
        </div>
    )
}
export default Notepad