import LVF from "./LoginValidationFunctions";

async function signUpSubmit(e, isLogin, user, users, navigate) {
    console.log(user);
    e.preventDefault();

    if (LVF.validateEmptyField(isLogin)) {
        console.log("campos vazios");
        return;
    }
    
    if (LVF.validateNameLength(user.name)) {
        console.log("nome muito longo");
        return;  
    }
    
    if (LVF.validateEmail(user.email)) {
        console.log("email incorreto");
        return;  
    }

    if (LVF.validatePhone(user.phone)) {
        console.log("telefone invalido");
        return;  
    }

    if (LVF.validatePassword(user.password)) {
        console.log("senha invalida");
        return;  
    }
    
    const userExists = await LVF.validateUserExistence(user, users);

    if (userExists) {
        console.log("usuario ja existe");
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
            // setUsers([...users, data]);
            // setUser(newUser);
            navigate("/");
        })
        .catch(err => console.log(err))
}

async function loginSubmit(e, isLogin, user, users, loginType, navigate) {
    console.log(user);
    e.preventDefault();
    
    if (LVF.validateEmptyField(isLogin)) {
        console.log("campos vazios");
        return;
    }
    
    const userMatch = await LVF.validateUserMatchLogin(user, users, loginType);
    
    console.log(userMatch);

    if (!userMatch) {
        console.log("Email ou senha incorretos.");
        return;
    }
    
    navigate("/");
}

const loginSubmitFunctions = {
    signUpSubmit,
    loginSubmit,
}

export default loginSubmitFunctions;