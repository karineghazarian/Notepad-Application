import React from 'react';
import { useEffect, useState } from "react";
import styles from "./note.module.css";
import PropTypes from 'prop-types';
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";
import { maxCharacter255, maxCharacter1000, isValid } from "../../utils/validation";

function Note(props)
{
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
    const [isTitleUnique, setIsTitleUnique] = useState(false);
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isNoteTextInvalid, setIsNoteTextInvalid] = useState(false);
    const { title, text, toCreate, addNote, titleUniqueChecker, deleteNote, id, updateNote } = props;

    useEffect(() =>
    {
        setNoteTitle(title)
    }, [title])

    useEffect(() =>
    {
        setNoteText(text)
    }, [text])

    function handleTitleChange(e)
    {
        const { value } = e.target
        const isUniqueTitle = titleUniqueChecker(value);
        if (isValid(maxCharacter255, value) && (value || (noteTitle && !value)))
        {
            setNoteTitle(value);
            setIsTitleInvalid(false);
            if (!value || !isUniqueTitle)
            {
                setIsTitleInvalid(true)
            }
        }
        else
        {
            setIsTitleInvalid(true)
        }
        setIsTitleUnique(isUniqueTitle)
    }

    function handleNoteTextChange(e)
    {
        const { value } = e.target
        if (isValid(maxCharacter1000, value) && (value || (noteText && !value)))
        {
            setIsNoteTextInvalid(false);
            setNoteText(value);
            if (!value)
            {
                setIsNoteTextInvalid(true)
            }
        }
        else
        {
            setIsNoteTextInvalid(true)
        }
    }

    function handleAddNote()
    {
        if (noteTitle && noteText && typeof addNote === "function")
        {
            addNote({
                title: noteTitle,
                text: noteText,
                id: Date.now()
            });
            setNoteTitle("");
            setNoteText("");
            setIsNoteTextInvalid(false);
            setIsTitleInvalid(false);
        }
    }

    return (
        <div className={styles.noteContainer} style={toCreate && { flexDirection: "column" }}>
            <div className={styles.inputTextareaContainer}>
                <Input
                    placeholder={"Enter note title..."}
                    value={noteTitle}
                    handleChange={handleTitleChange}
                    isInvalid={isTitleInvalid}
                    errorMessage={noteTitle ? (!isTitleUnique ? "*Note title must be unique" : "* Maximum 255 characters are allowed") : "*Title is not allowed to be empty!"}
                    name={"note title"}
                    id={id}
                />
                <Textarea
                    placeholder={"Enter a note..."}
                    value={noteText}
                    handleChange={handleNoteTextChange}
                    isInvalid={isNoteTextInvalid}
                    errorMessage={noteText ? "*Maximum 1024 characters are allowed" : "*Title is not allowed to be empty!"}
                    name={"note text"}
                    id={id}
                />
            </div>
            {toCreate ?
                <Button
                    style={{ backgroundColor: "var(--green)" }}
                    onClick={handleAddNote}
                    disabled={!noteTitle || !noteText || isTitleInvalid || isNoteTextInvalid}>
                    Add
                </Button>
                :
                <Button style={{ backgroundColor: "var(--red)" }}
                    className={styles.buttonContainer}
                    onClick={() => deleteNote(id)}>
                    Delete
                </Button>
            }
        </div>
    )
}

Note.defaultPropTypes = {
    title: "",
    text: "",
    toCreate: false,
    deleteNote: () => { },
    id: Date.now(),
    updateNote: () => { }
}

Note.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    toCreate: PropTypes.bool,
    addNote: PropTypes.func,
    titleUniqueChecker: PropTypes.func.isRequired,
    deleteNote: PropTypes.func,
    id: PropTypes.number,
    updateNote: PropTypes.func
}

export default React.memo(Note);