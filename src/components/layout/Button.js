import styles from "./Button.module.css";

function Button({handleClick, children, type, text, customClass}) {
    return (
        <button type={type} onClick={handleClick} className={`${styles.button} ${customClass}`}>
            {text ? text : children}
        </button>
    );
}

export default Button;