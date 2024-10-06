function loginTypeTransition(setUser, setLoginType, loginType) {
    const loginForm = document.getElementById("login");
    const changingField = document.getElementById("changingField");
    
    changingField.style.setProperty("transition", "opacity 0.4s ease-in-out");
    changingField.style.setProperty("opacity", "0");
    
    setTimeout(() => {
        changingField.style.setProperty("opacity", "1");
        setLoginType(!loginType);
    }, 600);
    
    setUser({});
    loginForm.reset();
}

function loginFormTransition(isLogin, setIsLogin, setUser, openEyePassword) {
    const cta = document.getElementById("cta");
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");
    const ctaText = document.getElementById("cta_text");
    const windowWidth = window.innerWidth;
    
    ctaText.style.setProperty("opacity", "0");

    changePasswordVisibility(isLogin, true, openEyePassword);

    if (isLogin) {
        signupForm.reset();
        signupForm.style.setProperty("opacity", "0");
        loginForm.style.setProperty("display", "flex");            
        
        if (windowWidth > 650) {
            signupForm.style.setProperty("transform", "translateY(40%)");
            loginForm.style.setProperty("transform", "none");
            cta.style.setProperty("left", "0");
            cta.style.setProperty("box-shadow", "inset 20px 0 40px black");
            loginForm.style.setProperty("opacity", "1");
        } else {
            setTimeout(() => {
                signupForm.style.setProperty("display", "none");
                loginForm.style.setProperty("opacity", "1");
            }, 1000);
        }
    } else {
        loginForm.reset();
        loginForm.style.setProperty("opacity", "0");
        
        if (windowWidth > 650) {
            loginForm.style.setProperty("transform", "translateY(40%)");
            signupForm.style.setProperty("transform", "none");
            cta.style.setProperty("left", "46.2%");
            cta.style.setProperty("box-shadow", "inset -20px 0 40px black");
            signupForm.style.setProperty("opacity", "1");
        } else {
            setTimeout(() => {
                loginForm.style.setProperty("display", "none");            
                signupForm.style.setProperty("display", "flex");
                setTimeout(() => {
                    signupForm.style.setProperty("opacity", "1");
                }, 500);
            }, 1000);
        }
    }

    setTimeout(() => {
        ctaText.style.setProperty("opacity", "1")
        setIsLogin(!isLogin);
    }, 1200);

    setUser({});
}

function changePasswordVisibility(isLogin, toHidden, openEye, closedEye) {
    const passwordInputSignup = document.getElementById("password");
    const confirmedPasswordInputSignup = document.getElementById("confirmedPassword");
    const passwordInputLogin = document.getElementById("passwordLogin");
    const eyeIconSignup = document.getElementById("eyeIconSignup");
    const eyeIconLogin = document.getElementById("eyeIconLogin");

    if (isLogin) {
        if (toHidden) {
            passwordInputSignup.setAttribute("type", "password")
            confirmedPasswordInputSignup.setAttribute("type", "password");
            eyeIconSignup.setAttribute("src", openEye); 
            return;
        }

        if (passwordInputSignup.getAttribute("type") === "password") {
            passwordInputSignup.setAttribute("type", "text");
            confirmedPasswordInputSignup.setAttribute("type", "text");
            eyeIconSignup.setAttribute("src", closedEye);
        } else {
            passwordInputSignup.setAttribute("type", "password")
            confirmedPasswordInputSignup.setAttribute("type", "password");
            eyeIconSignup.setAttribute("src", openEye);
        } 
    } else {
        if (toHidden) {
            passwordInputLogin.setAttribute("type", "password")
            eyeIconLogin.setAttribute("src", openEye);
            return;
        }

        if (passwordInputLogin.getAttribute("type") === "password") {
            passwordInputLogin.setAttribute("type", "text");
            eyeIconLogin.setAttribute("src", closedEye);
        } else {
            passwordInputLogin.setAttribute("type", "password")
            eyeIconLogin.setAttribute("src", openEye);
        } 
    }
}

function changeValidationMessageVisibility(field, visibility) {
    const message = document.getElementById(field + "ValidationMessage");

    message.style.setProperty("visibility", visibility);
}

const loginTransitionFunctions = {
    loginTypeTransition,
    loginFormTransition,
    changePasswordVisibility,
    changeValidationMessageVisibility,
}

export default loginTransitionFunctions;