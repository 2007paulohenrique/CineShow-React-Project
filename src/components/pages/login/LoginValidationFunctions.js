import bcrypt from "bcryptjs";

function validateEmptyField(isLogin) {
    const inputs = !isLogin ? document.querySelectorAll("#login input") : document.querySelectorAll("#signup input");
    console.log(inputs);
    const inputsArray = Array.from(inputs);
    
    return inputsArray.some((input) => !input.value);  
}

function validateNameLength(name) {
    return name.length > 50;
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    return !emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return !phoneRegex.test(phone);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    return !passwordRegex.test(password);
}

async function validateUserExistence(user, users) {
    for (const us of users) {
        const emailMatch = await validateDataMatch(user.email, us.email);
        const phoneMatch = await validateDataMatch(user.phone, us.phone);

        if (emailMatch || phoneMatch) {
            return true;
        }
    }

    return false;
}

async function hashData(data) {
    const saltRounds = 12;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(data, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error(error);
    }
}

async function validateDataMatch(data, hashedData) {
    try {
        const match = await bcrypt.compare(data, hashedData)
        return match;
    } catch (error) {
        throw new Error(error);
    }
}

async function validateUserMatchLogin(userLogin, users, isLoginEmail) {
    let loginData;
    let userData;
    
    if (isLoginEmail) {
        loginData = userLogin.emailLogin;
        userData = "email";
    } else {
        loginData = userLogin.phoneLogin;
        userData = "phone";   
    }
    
    for (const us of users) {
        const passwordMatch = await validateDataMatch(userLogin.passwordLogin, us.password);
        const dataMatch = await validateDataMatch(loginData, us[userData]);
                      
        if (dataMatch && passwordMatch) {
            // setUser(us);
            return true;
        }
    }

    return false;
}

const loginValidationFunctions = {
    validateEmptyField,
    validateNameLength,
    validateEmail,
    validatePhone,
    validatePassword,
    validateUserExistence,
    hashData,
    validateUserMatchLogin,
}

export default loginValidationFunctions;