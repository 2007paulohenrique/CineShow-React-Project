import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../img/Google_Icon.png";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

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

    async function validateUserExistence(user) {
        for (const us of users) {
            const emailMatch = await verifyDataMatch(user.email, us.email);
            const phoneMatch = us.phone === user.phone;
    
            if (emailMatch || phoneMatch) {
                return true;
            }
        }

        return false;
    }

    function validateEmptyField() {
        const inputs = document.getElementsByTagName("input");
        const inputsArray = Array.from(inputs);
        
        return inputsArray.some((input) => !input.value);  
    }

    function validateNameLength(name) {
        return name.length > 50;
    }

    function formatName(e) {
        let name = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿÇç\s]/g, "");

        if (name.length > 0) {
            name = name.replace(/\s+/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }

        e.target.value = name;
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        return !emailRegex.test(email);
    }

    function formatEmail(e) {
        e.target.value = e.target.value.replace(/\s/g, "");
    }

    function validatePhone(phone) {
        const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        return !phoneRegex.test(phone);
    }

    function formatPhone(e) {
        let phone = e.target.value.replace(/\D/g, "");

        if (phone.length > 0) {
            phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2"); 
        }

        if (phone.length > 10) {
            phone = phone.replace(/(\d{5})(\d)/, "$1-$2");
        }

        if (phone.length > 15) {
            phone = phone.slice(0, 15);
        }

        e.target.value = phone;
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
        return !passwordRegex.test(password);
    }

    function formatPassword(e) {
        let password = e.target.value.trim().replace(/[^a-zA-Z\d]+/g, "");
        password = password.replace(/\s/g, "");

        e.target.value = password;
    }

    async function hashData(data) {
        const saltRounds = 10;

        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(data, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error(error);
        }
    }

    async function verifyDataMatch(data, hashedData) {
        try {
            const match = await bcrypt.compare(data, hashedData)
            return match;
        } catch (error) {
            throw new Error(error);
        }
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value.trim()});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (validateEmptyField()) {
            console.log("campos vazios");
            return;
        }
        
        if (validateNameLength(user.name)) {
            console.log("nome muito longo");
            return;  
        }

        if (validateEmail(user.email)) {
            console.log("email incorreto");
            return;  
        }

        if (validatePhone(user.phone)) {
            console.log("telefone invalido");
            return;  
        }

        if (validatePassword(user.password)) {
            console.log("senha invalida");
            return;  
        }

        const userExists = await validateUserExistence(user);

        if (userExists) {
            console.log("usuario ja existe");
            return;  
        }

        const hashedPassword = await hashData(user.password);
        const hashedEmail = await hashData(user.email);

        const newUser = {...user, "password": hashedPassword, "email": hashedEmail};

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(resp => resp.json())
            .then(data => {
                setUsers([...users, data]);
                setUser(newUser);
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    function handlePasswordContainer() {
        setUser({...user, "password": null})

        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("confirmedPassword").value;

        if (password === confirmedPassword) {
            setUser({...user, "password": confirmedPassword});
            return;
        }

        console.log("confirme a senha");
    }

    return (
        <main className={styles.login}>
            <div className={styles.login_container}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input name="name" type="text" placeholder="Insira seu nome" text="Nome" handleOnChange={handleChange} handleOnInput={formatName}/>
                    <Input name="email" type="email" placeholder="Insira seu e-mail" text="E-mail" handleOnChange={handleChange} handleOnInput={formatEmail}/>
                    <Input name="phone" type="tel" placeholder="(XX) 9XXXX-XXXX" text="Telefone" handleOnChange={handleChange} handleOnInput={formatPhone}/>
                    <div className={styles.password_container}>
                        <Input name="password" type="password" placeholder="Insira sua senha" text="Senha" handleOnChange={handlePasswordContainer} handleOnInput={formatPassword}/>
                        <Input name="confirmedPassword" type="password" placeholder="Confirme sua senha" handleOnChange={handlePasswordContainer} handleOnInput={formatPassword}/>
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