import LTF from "./LoginTransitionFunctions";

function handleChange(e, user, setUser) {
    LTF.changeValidationMessageVisibility(e.target.name, "hidden");
    setUser({...user, [e.target.name]: e.target.value.trim()});
}

function handlePasswordContainer(user, setUser) {
    LTF.changeValidationMessageVisibility("confirmedPassword", "hidden");
    setUser({...user, "password": null})

    const password = document.getElementById("password").value;
    const confirmedPassword = document.getElementById("confirmedPassword").value;

    if (password === confirmedPassword) {
        setUser({...user, "password": confirmedPassword});
        return;
    }

    console.log("confirme a senha");
}

const loginChangingFunctions = {
    handleChange,
    handlePasswordContainer,
};

export default loginChangingFunctions;
