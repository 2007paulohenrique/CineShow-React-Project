import styles from "./SubmitButton.module.css";

function SubmitButton({text, handleSubmit}) {
    return <button type="submit" onClick={handleSubmit} className={styles.button}>{text}</button>
}

export default SubmitButton;