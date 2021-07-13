import React from 'react';
import PropTypes from 'prop-types';
import styles from "./button.module.css";

function Button(props)
{
    const { disabled, children, className, style, onClick } = props;
    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${disabled ? styles.disabled : ""} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultPropTypes = {
    disabled: false,
    className: "",
    style: {},
    onClick: () => { }
}
Button.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default React.memo(Button);