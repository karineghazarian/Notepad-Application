import React from 'react';
import PropTypes from 'prop-types';
import styles from "./button.module.css";

function Button(props)
{
    const { disabled, children, className, style } = props;

    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${disabled ? styles.disabled : ""} ${className}`}
            style={style}>
            {children}
        </button>
    );
}

Button.defaultPropTypes = {
    disabled: false,
    className: "",
    style: {}
}
Button.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
}

export default React.memo(Button);