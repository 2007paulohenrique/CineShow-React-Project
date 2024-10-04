import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../img/Google_Icon.png";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { Await, useNavigate } from "react-router-dom";
import Button from "../layout/Button";

function Login() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    // Estado para o tipo do formulário. Caso seja login, true, caso seja sign in, false.
    const [login, setLogin] = useState(false);
    const [loginTypeEmail, setLoginTypeEmail] = useState(true);

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
            const phoneMatch = await verifyDataMatch(user.phone, us.phone);
    
            if (emailMatch || phoneMatch) {
                return true;
            }
        }

        return false;
    }

    async function userMatchLogin(userLogin) {
        let loginData;
        let userData;
        
        if (loginTypeEmail) {
            loginData = userLogin.emailLogin;
            userData = "email";
        } else {
            loginData = userLogin.phoneLogin;
            userData = "phone";   
        }
        
        for (const us of users) {
            const passwordMatch = await verifyDataMatch(userLogin.passwordLogin, us.password);
            const dataMatch = await verifyDataMatch(loginData, us[userData]);
                          
            if (dataMatch && passwordMatch) {
                setUser(us);
                return true;
            }
        }

        return false;
    }

    function validateEmptyField() {
        const inputs = !login ? document.querySelectorAll("#login input") : document.querySelectorAll("#signup input");
        console.log(inputs);
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
        const emailegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        return !emailegex.test(email);
    }

    function formatEmail(e) {
        e.target.value = e.target.value.replace(/\s/g, "");
    }

    function validatePhone(phone) {
        const phoneegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        return !phoneegex.test(phone);
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
        const passwordegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
        return !passwordegex.test(password);
    }

    function formatPassword(e) {
        let password = e.target.value.trim().replace(/[^a-zA-Z\d]+/g, "");
        password = password.replace(/\s/g, "");
        
        e.target.value = password;
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

    async function verifyDataMatch(data, hashedData) {
        try {
            const match = await bcrypt.compare(data, hashedData)
            return match;
        } catch (error) {
            throw new Error(error);
        }
    }

    function loginFormTransition() {
        const cta = document.getElementById("cta");
        const loginForm = document.getElementById("login");
        const signupForm = document.getElementById("signup");

        if (login) {
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

        setLogin(!login);
        setUser({});
    }

    function loginTypeTransition() {
        setUser({});
        setLoginTypeEmail(!loginTypeEmail);
        const loginForm = document.getElementById("login");
        loginForm.reset();
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value.trim()});
    }

    async function signUpSubmit(e) {
        console.log(user);
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
        const hashedPhone = await hashData(user.phone);

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
                setUsers([...users, data]);
                setUser(newUser);
                navigate("/");
            })
            .catch(err => console.log(err))
    }
    
    async function loginSubmit(e) {
        console.log(user);
        e.preventDefault();
        
        if (validateEmptyField()) {
            console.log("campos vazios");
            return;
        }
        
        const userMatch = await userMatchLogin(user);
        
        console.log(userMatch);

        if (!userMatch) {
            console.log("Email ou senha incorretos.");
            return;
        }
        
        navigate("/");
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
                <div className={styles.forms}>
                    <form className={styles.login_form} id="signup">
                        <h1>Registrar</h1>
                        <Input name="name" type="text" placeholder="Insira seu nome" text="Nome" handleOnChange={handleChange} handleOnInput={formatName}/>
                        <Input name="email" type="email" placeholder="Insira seu e-mail" text="E-mail" handleOnChange={handleChange} handleOnInput={formatEmail}/>
                        <Input name="phone" type="tel" placeholder="(XX) 9XXXX-XXXX" text="Telefone" handleOnChange={handleChange} handleOnInput={formatPhone}/>
                        <div className={styles.password_container}>
                            <Input name="password" type="password" placeholder="Insira sua senha" text="Senha" handleOnChange={handlePasswordContainer} handleOnInput={formatPassword}/>
                            <Input name="confirmedPassword" type="password" placeholder="Confirme sua senha" handleOnChange={handlePasswordContainer} handleOnInput={formatPassword}/>
                        </div>
                        <div className={styles.buttons}>
                            <SubmitButton  text="Criar conta" handleSubmit={signUpSubmit}/>
                            <button type="button" className={styles.sign_in_google}><img src={GoogleIcon} alt="Google Icon"/>Criar com Google</button>                        
                        </div>
                    </form>
                    <form className={styles.login_form} id="login">
                        <h1>Entrar</h1>
                        <div className={styles.signup_fields}>
                            {loginTypeEmail ? (
                                <Input name="emailLogin" type="email" placeholder="Insira seu e-mail" text="E-mail" handleOnChange={handleChange} handleOnInput={formatEmail}/>
                            ) : (
                                <Input name="phoneLogin" type="phone" placeholder="(XX) 9XXXX-XXXX" text="Telefone" handleOnChange={handleChange} handleOnInput={formatPhone}/>
                            )}
                            <Input name="passwordLogin" type="password" placeholder="Insira sua senha" text="Senha" handleOnChange={handleChange} handleOnInput={formatPassword}/>
                            <div className={styles.buttons}>
                                <SubmitButton  text="Entrar" handleSubmit={loginSubmit}/>
                                <button type="button" className={styles.sign_in_google}><img src={GoogleIcon} alt="Google Icon"/>Entrar com Google</button>                        
                                <Button type="button" text={loginTypeEmail ? "Entrar com telefone" : "Entrar com e-mail"} handleClick={loginTypeTransition} customClass={styles.login_button}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.cta} id="cta">
                    <div className={styles.cta_title}>
                        <h2>CineShow</h2>
                        <hr/>
                    </div>
                    <div className={styles.cta_text}>
                        <p>Prepare-se para voar pelo universo dos filmes e ter experiências inesquecíveis com CineShow!</p>
                        {login ? (
                            <p>Crie uma conta e aproveite todos os nossos serviços.</p>
                        ) : (
                            <p>Entre na sua conta e volte a aproveitar nossos serviços.</p>
                        )}
                        <span>ou</span>
                    </div>

                    <Button 
                        type="button" 
                        text={login ? "Entrar em uma conta" : "Criar conta"} 
                        handleClick={loginFormTransition} 
                        customClass={styles.login_button}
                    />
                </div>
            </div>
        </main>
    );
}

export default Login;