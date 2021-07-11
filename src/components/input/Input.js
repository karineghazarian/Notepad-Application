import React from 'react';
import PropTypes from 'prop-types';
import styles from "./input.module.css";

function Input(props)
{
    const { type, placeholder, value, handleChange, pattern, isInvalid, errorMessage, disabled } = props;
    return (
        <div className={styles.inputContainer}>
            <input
                value={value}
                type={type}
                name="input-form"
                onChange={handleChange}
                placeholder={placeholder}
                className={styles.input}
                pattern={pattern}
                disabled={disabled}
            />
            {isInvalid ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
        </div>
    );
}

Input.defaultPropTypes = {
    type: "text",
    placeholder: "Type a text",
    pattern: "",
    isInvalid: false,
    errorMessage: "Error",
    disabled: false
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    pattern: PropTypes.string,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
}

export default React.memo(Input);

