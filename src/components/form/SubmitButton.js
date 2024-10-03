import Button from "../layout/Button";
import styles from "./SubmitButton.module.css";

function SubmitButton({text, handleSubmit}) {
    return <Button type="submit" text={text} handleClick={handleSubmit} customClass={styles.submit_button}/>
}

export default SubmitButton;