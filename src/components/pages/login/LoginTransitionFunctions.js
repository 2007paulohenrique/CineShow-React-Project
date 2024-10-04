function loginTypeTransition(setUser, setLoginType, loginType) {
    setUser({});
    setLoginType(!loginType);
    const loginForm = document.getElementById("login");
    loginForm.reset();
}

function loginFormTransition(isLogin, setIsLogin, setUser) {
    const cta = document.getElementById("cta");
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");

    if (isLogin) {
        signupForm.reset();
        loginForm.style.setProperty("opacity", "1");
        signupForm.style.setProperty("opacity", "0");
        signupForm.style.setProperty("transform", "translateY(40%)");
        loginForm.style.setProperty("transform", "none");
        cta.style.setProperty("left", "0");
        cta.style.setProperty("box-shadow", "inset 20px 0 40px black");
    } else {
        loginForm.reset();
        loginForm.style.setProperty("opacity", "0");
        signupForm.style.setProperty("opacity", "1");
        loginForm.style.setProperty("transform", "translateY(40%)");
        signupForm.style.setProperty("transform", "none");
        cta.style.setProperty("left", "46.2%");
        cta.style.setProperty("box-shadow", "inset -20px 0 40px black");
    }

    setIsLogin(!isLogin);
    setUser({});
}

const loginTransitionFunctions = {
    loginTypeTransition,
    loginFormTransition,
}

export default loginTransitionFunctions;