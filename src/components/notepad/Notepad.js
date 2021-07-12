import React, { useState, useEffect, useRef } from "react";
import { isEqual } from "lodash-es";
import styles from "./notepad.module.css";
import Note from "../note/Note";
import Input from "../input/Input";
import Button from "../button/Button";
import { maxCharacter255, isValid } from "../../utils/validation"
import { createNotePad, deleteNotePad, getNotePad, updateNotePad } from "../../services/notepadApi";

function Notepad()
{
    const initialNotepad = {
        title: "",
        id: "",
        notes: []
    }
    const [notepad, setNotepad] = useState(initialNotepad);
    const [isTitleInValid, setIsTitleInValid] = useState(false);
    const initialNotepadRef = useRef({ ...initialNotepad });

    useEffect(() =>
    {
        const notepadId = window.localStorage.getItem("notepadId");
        if (notepadId)
        {
            getNotePad(notepadId).then(setNewNotepadData);
        }
    }, []);

    function handleChangeTitle(e)
    {
        const { value } = e.target
        if (isValid(maxCharacter255, value) && (value || (notepad.title && !value)))
        {
            setNotepad((prevNotepad) => ({
                ...prevNotepad,
                title: value,
            }))
            setIsTitleInValid(false);
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
        const note = notepad.notes.find((note) => note.filename === title);
        return !note;
    }

    //* Note Actions *//
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
            setNotepad((prevNotepad) =>
            {
                const notes = [...prevNotepad.notes];
                notes.splice(index, 1, noteToChange)
                return {
                    ...prevNotepad,
                    notes
                };
            })
        }
    }
    //* Notepad Actions *//
    function saveNotepad()
    {
        const notepadId = window.localStorage.getItem("notepadId")
        if (notepadId)
        {
            updateNotePad(notepadId, notepad).then(setNewNotepadData)
        }
        else
        {
            createNotePad(notepad).then(data =>
            {
                setNewNotepadData(data)
                window.localStorage.setItem("notepadId", data.id);
            })
        }
    }

    function removeNotePad()
    {
        deleteNotePad(notepad.id).then(data =>
        {
            setNotepad({
                title: "",
                notes: []
            })
        });
        window.localStorage.removeItem("notepadId");
    }

    function setNewNotepadData(data)
    {
        let notes = [];
        Object.keys(data.files).forEach((fileKey) =>
        {
            const note = data.files[fileKey];
            notes.push({
                filename: note.filename,
                content: note.content,
                id: note.filename
            })
        })
        const initialData = {
            title: data.description,
            id: data.id,
            notes
        }
        initialNotepadRef.current = { ...initialData };
        setNotepad(initialData);
    }
    return (
        <div className={styles.notepadContainer}>
            <label name={"notepadTitle"} className={styles.notepadLabel}>Notepad Title</label>
            <div className={styles.titleContainer}>
                <Input
                    name={"notepadTitle"}
                    placeholder={"My notepad title..."}
                    value={notepad.title}
                    handleChange={handleChangeTitle}
                    isInvalid={isTitleInValid}
                    errorMessage={notepad.title ? "* Maximum 255 characters are allowed" : "*Title is not allowed to be empty!"}
                />
                <div className={styles.notepadButtonsSection}>
                    <Button
                        className={styles.buttonContainer}
                        style={{ backgroundColor: "var(--blue)" }}
                        onClick={saveNotepad}
                        disabled={isEqual(notepad, initialNotepadRef.current) || !notepad.title || !notepad.notes.length || isTitleInValid}>
                        Save
                    </Button>
                    <Button
                        style={{ backgroundColor: "var(--red)" }}
                        onClick={removeNotePad}>
                        Delete
                    </Button>
                </div>
            </div>
            <span className={styles.myNotesSpan}>My Notes</span>
            <Note
                key={"create"}
                toCreate={true}
                addNote={addNote}
                titleUniqueChecker={titleUniqueChecker}
            />
            {
                notepad?.notes?.map((note) =>
                (
                    <Note
                        key={note.id}
                        toCreate={false}
                        filename={note.filename}
                        content={note.content}
                        id={note.id}
                        deleteNote={deleteNote}
                        titleUniqueChecker={titleUniqueChecker}
                        updateNote={updateNote}
                    />
                ))
            }
        </div>
    )
}
export default Notepad