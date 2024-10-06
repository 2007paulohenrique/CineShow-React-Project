import styles from "./Input.module.css";

function Input({name, type, placeholder, text, value, handleOnChange, handleOnInput, img, altImg, idImg, handleOnClickImg, validationMessage}) {
    return (
        <div className={styles.input_container}>
            {text && <label htmlFor={name}>{text}</label>}
            <input name={name} id={name} type={type} placeholder={placeholder} value={value && value} onChange={handleOnChange} onInput={handleOnInput}/>
            {img && altImg && <img src={img} alt={altImg} id={idImg} onClick={handleOnClickImg}/>}
            <span className={styles.validationMessage} id={name + "ValidationMessage"}>{validationMessage}</span>
        </div>  
    );
}

export default Input;