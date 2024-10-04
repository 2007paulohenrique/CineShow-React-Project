function handleChange(e, user, setUser) {
    setUser({...user, [e.target.name]: e.target.value.trim()});
}

function handlePasswordContainer(user, setUser) {
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
