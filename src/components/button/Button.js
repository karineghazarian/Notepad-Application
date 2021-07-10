import PropTypes from 'prop-types';
import styles from "./button.module.css";

function Button(props)
{
    const { backgroundColor, disabled, children } = props;

    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${disabled ? styles.disabled : ""}`}
            style={{ backgroundColor }}>
            {children}
        </button>
    );
}

Button.defaultPropTypes = {
    backgroundColor: "var(--green)",
    disabled: false
}
Button.propTypes = {
    backgroundColor: PropTypes.string,
    disabled: PropTypes.bool
}

export default Button;