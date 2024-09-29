import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../img/Google_Icon.png";
import { useEffect, useState } from "react";

function Login() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => console.log(err))
    }, [])

    function validateUserExistence(user) {
        return users.some((us) => (us.email === user.email) || (us.phone === user.phone));
    }

    function validateEmptyField() {
        const inputs = document.getElementsByTagName("input");
        const inputsArray = Array.from(inputs);
        
        return inputsArray.some((input) => !input.value);  
    }

    function validateNameLength(name) {
        return name.length > 50;
    }

    function formatName(name) {
        return name.trim().replace(/\s+/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (validateEmptyField()) {
            console.log("campos vazios");
            return;
        }

        setUser({...user, "name": formatName(user.name)});
        
        if (validateNameLength(user.name) || validateUserExistence(user)) {
            console.log("usuario ja existe ou nome muito longo");
            return;
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                setUsers([...users, data])
            })
            .catch(err => console.log(err))
    }

    function handlePasswordContainer() {
        setUser({...user, "password": null})

        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("confirmedPassword").value;

        if (password === confirmedPassword) {
            setUser({...user, "password": confirmedPassword});
        }
    }

    return (
        <main className={styles.login}>
            <div className={styles.login_container}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input name="name" type="text" placeholder="Insira seu nome" text="Nome" handleOnChange={handleChange}/>
                    <Input name="email" type="email" placeholder="Insira seu e-mail" text="E-mail" handleOnChange={handleChange}/>
                    <Input name="phone" type="tel" placeholder="XX 9XXXX-XXXX" text="Telefone" handleOnChange={handleChange}/>
                    <div className={styles.password_container}>
                        <Input name="password" type="password" placeholder="Insira sua senha" text="Senha" handleOnChange={handlePasswordContainer}/>
                        <Input name="confirmedPassword" type="password" placeholder="Confirme sua senha" handleOnChange={handlePasswordContainer}/>
                    </div>
                    <div className={styles.buttons}>
                        <SubmitButton  text="Criar conta"/>
                        <span>ou</span>
                        <button type="button" className={styles.sign_in_google}><img src={GoogleIcon} alt="Google Icon"/>Criar com Google</button>
                    </div>
                </form>
                <div className={styles.cta}>
                    <div className={styles.cta_title}>
                        <h2>Cine<span>Show</span></h2>
                        <hr/>
                    </div>
                    <div className={styles.cta_text}>
                        <p>Prepare-se para voar pelo universo dos filmes e ter experiências inesquecíveis com CineShow!</p>
                        <p>Crie uma conta e aproveite todos os nossos serviços.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;