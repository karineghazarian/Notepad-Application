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
    const [noteFilename, setNoteFilename] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [isTitleUnique, setIsTitleUnique] = useState(false);
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isNoteTextInvalid, setIsNoteTextInvalid] = useState(false);
    const { filename, content, toCreate, addNote, titleUniqueChecker, deleteNote, id, updateNote } = props;

    useEffect(() =>
    {
        if (!toCreate)
        {
            setNoteFilename(filename)
        }
    }, [filename, toCreate])

    useEffect(() =>
    {
        if (!toCreate)
        {
            setNoteContent(content)
        }
    }, [content, toCreate])


    function handleTitleChange(e)
    {
        const { value } = e.target
        const isUniqueTitle = titleUniqueChecker(value);
        if (isValid(maxCharacter255, value) && (value || (noteFilename && !value)))
        {
            setNoteFilename(value);
            setIsTitleInvalid(false);
            if (!value || !isUniqueTitle)
            {
                setIsTitleInvalid(true)
            }
            else if (!toCreate && id)
            {
                updateNote({
                    id,
                    title: value,
                    content
                })
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
        if (isValid(maxCharacter1000, value) && (value || (noteContent && !value)))
        {
            setIsNoteTextInvalid(false);
            setNoteContent(value);
            if (!value)
            {
                setIsNoteTextInvalid(true)
            }
            else if (!toCreate && id)
            {
                updateNote({
                    id,
                    filename,
                    content: value
                })
            }
        }
        else
        {
            setIsNoteTextInvalid(true)
        }
    }

    function handleAddNote()
    {
        if (noteFilename && noteContent && typeof addNote === "function")
        {
            addNote({
                filename: noteFilename,
                content: noteContent,
                id: noteFilename
            });
            setNoteFilename("");
            setNoteContent("");
            setIsNoteTextInvalid(false);
            setIsTitleInvalid(false);
        }
    }

    return (
        <div className={styles.noteContainer} style={toCreate ? { flexDirection: "column" } : {}}>
            <div className={styles.inputTextareaContainer}>
                <Input
                    placeholder={"Enter note title..."}
                    value={noteFilename}
                    handleChange={handleTitleChange}
                    isInvalid={isTitleInvalid}
                    errorMessage={noteFilename ? (!isTitleUnique ? "*Note title must be unique" : "* Maximum 255 characters are allowed") : "*Title is not allowed to be empty!"}
                    name={"note title"}
                    id={id}
                />
                <Textarea
                    placeholder={"Enter a note..."}
                    value={noteContent}
                    handleChange={handleNoteTextChange}
                    isInvalid={isNoteTextInvalid}
                    errorMessage={noteContent ? "*Maximum 1024 characters are allowed" : "*Title is not allowed to be empty!"}
                    name={"note text"}
                    id={id}
                />
            </div>
            {toCreate ?
                <Button
                    style={{ backgroundColor: "var(--green)" }}
                    onClick={handleAddNote}
                    disabled={!noteFilename || !noteContent || isTitleInvalid || isNoteTextInvalid}>
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
    fileName: "",
    content: "",
    deleteNote: () => { },
    updateNote: () => { },
    id: ""
}

Note.propTypes = {
    fileName: PropTypes.string,
    content: PropTypes.string,
    toCreate: PropTypes.bool.isRequired,
    addNote: PropTypes.func,
    titleUniqueChecker: PropTypes.func.isRequired,
    deleteNote: PropTypes.func,
    id: PropTypes.string,
    updateNote: PropTypes.func
}

export default React.memo(Note);