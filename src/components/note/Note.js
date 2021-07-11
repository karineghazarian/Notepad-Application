import React from 'react';
import { useEffect, useState } from "react";
import styles from "./note.module.css";
import PropTypes from 'prop-types';
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";
import { maxCharacter255, maxCharacter1024, isValid } from "../../utils/validation";


function Note(props)
{
    const [inputValue, setInputValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const [isInputInvalid, setIsInputInvalid] = useState(false);
    const [isTextareaInvalid, setTextareaInvalid] = useState(false);
    const { title, noteText, toCreate } = props;

    useEffect(() =>
    {
        setInputValue(title)
    }, [title])

    useEffect(() =>
    {
        setTextareaValue(noteText)
    }, [noteText])

    function handleInputChange(e)
    {
        const { value } = e.target
        if (isValid(maxCharacter255, value) && (value || (inputValue && !value)))
        {
            setIsInputInvalid(false);
            setInputValue(e.target.value);
            if (!value)
            {
                setIsInputInvalid(true)
            }
        }
        else
        {
            setIsInputInvalid(true)
        }
    }

    function handleTextAreaChange(e)
    {
        const { value } = e.target
        if (isValid(maxCharacter1024, value) && (value || (textareaValue && !value)))
        {
            setTextareaInvalid(false);
            setTextareaValue(e.target.value);
            if (!value)
            {
                setTextareaInvalid(true)
            }
        }
        else
        {
            setTextareaInvalid(true)
        }
    }

    return (
        <div className={styles.noteContainer} style={toCreate && { flexDirection: "column" }}>
            <div className={styles.inputTextareaContainer}>
                <Input
                    placeholder={"Enter note title..."}
                    value={inputValue}
                    handleChange={handleInputChange}
                    isInvalid={isInputInvalid}
                    pattern={maxCharacter255}
                    errorMessage={inputValue ? "* Maximum 255 characters are allowed" : "*Title is not allowed to be empty!"}
                    disabled={!toCreate}>
                    {title}
                </Input>
                <Textarea
                    placeholder={"Enter a note..."}
                    value={textareaValue}
                    handleChange={handleTextAreaChange}
                    isInvalid={isTextareaInvalid}
                    pattern={maxCharacter1024}
                    errorMessage={textareaValue ? "*Maximum 1024 characters are allowed" : "*Title is not allowed to be empty!"}
                    disabled={!toCreate}

                />
            </div>
            {toCreate ?
                <Button style={{ backgroundColor: "var(--green)" }}>
                    Add
                </Button>
                :
                <Button style={{ backgroundColor: "var(--red)" }}
                    className={styles.buttonContainer}>
                    Delete
                </Button>
            }
        </div>
    )
}

Note.defaultPropTypes = {
    title: "",
    noteText: "",
    toCreate: false
}

Note.propTypes = {
    title: PropTypes.string,
    noteText: PropTypes.string,
    toCreate: PropTypes.bool
}

export default React.memo(Note);