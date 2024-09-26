import styles from "./LinkButton.module.css";
import { Link } from "react-router-dom";

function LinkButton({to, text}) {
    return (
        <button type="button" className={styles.button}>
            <Link to={to}>{text}</Link>
        </button>
    );
}

export default LinkButton;