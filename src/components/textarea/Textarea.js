import React from 'react';
import styles from "./textarea.module.css";
import PropTypes from 'prop-types';

function Textarea(props)
{
    const { placeholder, handleChange, value, pattern, isInvalid, errorMessage, disabled } = props;

    return (
        <div className={styles.textareaContainer}>
            <textarea
                value={value}
                className={styles.textarea}
                placeholder={placeholder}
                onChange={handleChange}
                pattern={pattern}
                disabled={disabled}
            />
            {isInvalid ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
        </div>
    )
}

Textarea.defaultPropTypes = {
    placeholder: "Type a text",
    pattern: "",
    isInvalid: false,
    errorMessage: "Error"
}

Textarea.propTypes = {
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    pattern: PropTypes.string,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string
}

export default React.memo(Textarea);