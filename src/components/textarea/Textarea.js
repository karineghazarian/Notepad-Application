import styles from "./textarea.module.css";
import PropTypes from 'prop-types';

function Textarea(props)
{
    const { placeholder, handleChange, value, pattern, isInvalid, errorMessage } = props;

    return (
        <div className={styles.textare}>
            <textarea
                value={value}
                className={styles.textarea}
                placeholder={placeholder}
                onChange={handleChange}
                pattern={pattern}
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
    placeholder: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    pattern: PropTypes.string,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string
}

export default Textarea;