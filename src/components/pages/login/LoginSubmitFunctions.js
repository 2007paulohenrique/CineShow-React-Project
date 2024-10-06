import LVF from "./LoginValidationFunctions";
import LTF from "./LoginTransitionFunctions";

async function signUpSubmit(e, isLogin, user, users, navigate, setMessage) {
    console.log(user);
    e.preventDefault();

    setMessage(null);

    LTF.changeValidationMessageVisibility("name", "hidden");
    LTF.changeValidationMessageVisibility("email", "hidden");
    LTF.changeValidationMessageVisibility("phone", "hidden");
    LTF.changeValidationMessageVisibility("confirmedPassword", "hidden");

    if (LVF.validateEmptyField(isLogin)) {
        if (timer) clearTimeout(timer);
        
        const newMessage = {type: "error", message: "Preencha todos os campos."};
        setMessage(newMessage);
        
        timer = setTimeout(() => {
            setMessage(null);
            timer = null
        }, 3000);

        return;
    }
    
    if (LVF.validateNameLength(user.name)) {
        LTF.changeValidationMessageVisibility("name", "visible");
        return;  
    }
    
    if (LVF.validateEmail(user.email)) {
        LTF.changeValidationMessageVisibility("email", "visible");
        return;  
    }

    if (LVF.validatePhone(user.phone)) {
        LTF.changeValidationMessageVisibility("phone", "visible");
        return;  
    }

    if (LVF.validatePassword(user.password)) {
        if (user.password) {
            LTF.changeValidationMessageVisibility("confirmedPassword", "visible");
        }

        return;  
    }
    
    const userExists = await LVF.validateUserExistence(user, users);

    if (userExists) {
        if (timer) clearTimeout(timer);
        
        const newMessage = {type: "error", message: "Um usuário já utiliza esse e-mail ou número de celular."};
        setMessage(newMessage);
        
        timer = setTimeout(() => {
            setMessage(null);
            timer = null
        }, 3000);

        return;  
    }

    const hashedPassword = await LVF.hashData(user.password);
    const hashedEmail = await LVF.hashData(user.email);
    const hashedPhone = await LVF.hashData(user.phone);

    const newUser = {...user, "password": hashedPassword, "email": hashedEmail, "phone": hashedPhone};
    
    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(resp => resp.json())
        .then(data => {
            navigate("/");
        })
        .catch(err => console.log(err))
}

let timer;

async function loginSubmit(e, isLogin, user, users, loginType, navigate, setMessage) {
    console.log(user);
    e.preventDefault();

    setMessage(null);
    
    if (LVF.validateEmptyField(isLogin)) {    
        if (timer) clearTimeout(timer);
        
        const newMessage = {type: "error", message: "Preencha todos os campos."};
        setMessage(newMessage);
        
        timer = setTimeout(() => {
            setMessage(null);
            timer = null
        }, 3000);
        
        return;
    }
    
    const userMatch = await LVF.validateUserMatchLogin(user, users, loginType);
    
    if (!userMatch) {
        LTF.changeValidationMessageVisibility("passwordLogin", "visible");
        return;
    }
    
    navigate("/");
}

const loginSubmitFunctions = {
    signUpSubmit,
    loginSubmit,
}

export default loginSubmitFunctions;