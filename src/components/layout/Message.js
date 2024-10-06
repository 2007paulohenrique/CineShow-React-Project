import styles from "./Message.module.css";
import successIcon from "../../img/successIcon.svg";
import errorIcon from "../../img/errorIcon.svg";
import alertIcon from "../../img/alertIcon.svg";

function Message({type, message, handleOnConfirm, handleOnCancel}) {
    const icon = type === "success" ? successIcon : type === "error" ? errorIcon : type === "alert" ? alertIcon : null;
    const alt = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className={styles.message}>
            {type !== "alert" ? (
                <>
                    <img src={icon} alt={alt}/>
                    {message}
                </>
            ) : (
                <>
                    <img src={icon} alt={alt}/>
                    {message}
                    <div className={styles.buttons}>
                        <button type="button" onClick={handleOnConfirm}>Confirmar</button>
                        <button type="button" onClick={handleOnCancel}>Cancelar</button> 
                    </div>
                </>
            )}
        </div>
    );
}

export default Message;