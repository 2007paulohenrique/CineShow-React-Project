import styles from "./Input.module.css";

function Input({name, type, placeholder, text, value, handleOnChange, handleOnInput}) {
    return (
        <div className={styles.input_container}>
            {text && <label htmlFor={name}>{text}</label>}
            <input name={name} id={name} type={type} placeholder={placeholder} value={value && value} onChange={handleOnChange} onInput={handleOnInput}/>
        </div>
    );
}

export default Input;