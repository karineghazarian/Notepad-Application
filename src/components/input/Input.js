import React from 'react';
import PropTypes from 'prop-types';
import styles from "./input.module.css";

function Input(props)
{
    const { type, placeholder, value, handleChange, isInvalid, errorMessage, disabled, name } = props;
    return (
        <div className={styles.inputContainer}>
            <input
                value={value}
                type={type}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                className={styles.input}
                disabled={disabled}
            />
            {isInvalid ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
        </div>
    );
}

Input.defaultPropTypes = {
    type: "text",
    placeholder: "Type a text",
    isInvalid: false,
    errorMessage: "Error",
    disabled: false,
    name: "input",
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string
}

export default React.memo(Input);

