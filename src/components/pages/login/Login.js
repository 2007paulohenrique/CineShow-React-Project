import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../../img/Google_Icon.png";
import closedEyeIcon from "../../../img/closedEyePassword.png";
import openEyeIcon from "../../../img/openEyePassword.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../layout/Button";
import LCF from "./LoginChangingFunctions";
import LTF from "./LoginTransitionFunctions";
import LFF from "./LoginFormattingFunctions";
import LSF from "./LoginSubmitFunctions";
import Message from "../../layout/Message";

function Login() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [loginTypeIsEmail, setLoginTypeIsEmail] = useState(true);
    const [message, setMessage] = useState(null);

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
    }, []);

    let resizeTimeout;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            window.location.reload();
        }, 500); 
    });
    
    return (
        <main className={styles.login}>
            {message && <Message type={message.type} message={message.message}/>}
            <div className={styles.login_container}>
                <div className={styles.forms}>
                    <form className={styles.login_form} id="signup">
                        <h1>Registrar</h1>

                        <Input 
                            name="name" 
                            type="text" 
                            placeholder="Insira seu nome" 
                            text="Nome" 
                            handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                            handleOnInput={LFF.formatName}
                            validationMessage="O nome não pode ter mais que 50 caracteres."
                        />

                        <Input 
                            name="email" 
                            type="email" 
                            placeholder="Insira seu e-mail" 
                            text="E-mail" 
                            handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                            handleOnInput={LFF.formatEmail}
                            validationMessage="E-mail inválido."
                        />

                        <Input 
                            name="phone" 
                            type="tel" 
                            placeholder="(XX) 9XXXX-XXXX" 
                            text="Celular" 
                            handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                            handleOnInput={LFF.formatPhone}
                            validationMessage="Número de celular inválido."
                        />

                        <div className={styles.password_container}>
                            <Input 
                                name="password" 
                                type="password" 
                                placeholder="Insira sua senha" 
                                text="Senha" 
                                handleOnChange={(e) => LCF.handlePasswordContainer(user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                                img={openEyeIcon}
                                altImg="Show password"
                                idImg="eyeIconSignup"
                                handleOnClickImg={(e) => LTF.changePasswordVisibility(isLogin, false, openEyeIcon, closedEyeIcon)}
                                />

                            <Input 
                                name="confirmedPassword" 
                                type="password" 
                                placeholder="Confirme sua senha" 
                                handleOnChange={(e) => LCF.handlePasswordContainer(user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                                validationMessage="A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e ter entre 6 e 20 caracteres."
                            />
                        </div>

                        <div className={styles.buttons}>
                            <SubmitButton  text="Criar conta" handleSubmit={(e) => LSF.signUpSubmit(e, isLogin, user, users, navigate, setMessage)}/>

                            <button type="button" className={styles.sign_in_google}>
                                <img src={GoogleIcon} alt="Google Icon"/>Criar com Google
                            </button>                        
                        </div>
                    </form>

                    <form className={styles.login_form} id="login">
                        <h1>Entrar</h1>

                        <div className={styles.login_fields}>
                            <div id="changingField">
                                {loginTypeIsEmail ? (
                                    <Input 
                                        name="emailLogin" 
                                        type="email" 
                                        placeholder="Insira seu e-mail" 
                                        text="E-mail" 
                                        handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                                        handleOnInput={LFF.formatEmail}
                                    />
                                ) : (
                                    <Input 
                                        name="phoneLogin" 
                                        type="phone" 
                                        placeholder="(XX) 9XXXX-XXXX" 
                                        text="Celular" 
                                        handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                                        handleOnInput={LFF.formatPhone}
                                    />
                                )}
                            </div>

                            <Input 
                                name="passwordLogin" 
                                type="password" 
                                placeholder="Insira sua senha" 
                                text="Senha" 
                                handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                                img={openEyeIcon}
                                altImg="Show password"
                                idImg="eyeIconLogin"
                                handleOnClickImg={(e) => LTF.changePasswordVisibility(isLogin, false, openEyeIcon, closedEyeIcon)}
                                validationMessage="E-mail e/ou senha incorretos."
                            />

                            <div className={styles.buttons}>
                                <SubmitButton  
                                    text="Entrar" 
                                    handleSubmit={(e) => LSF.loginSubmit(e, isLogin, user, users, loginTypeIsEmail, navigate, setMessage)}
                                />

                                <button type="button" className={styles.sign_in_google}>
                                    <img src={GoogleIcon} alt="Google Icon"/>Entrar com Google
                                </button>  

                                ou

                                <Button 
                                    type="button" 
                                    text={loginTypeIsEmail ? "Entrar com celular" : "Entrar com e-mail"} 
                                    handleClick={(e) => LTF.loginTypeTransition(setUser, setLoginTypeIsEmail, loginTypeIsEmail)} 
                                    customClass={styles.login_button}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className={styles.cta} id="cta">
                    <div className={styles.cta_text} id="cta_text">
                        <div className={styles.cta_title}>
                            <h2>CineShow</h2>
                            <hr/>
                        </div>

                        {isLogin ? (
                            <>
                                <p>Prepare-se para voar pelo universo dos filmes e ter experiências inesquecíveis com CineShow!</p>
                                <p>Crie uma conta e aproveite todos os nossos serviços.</p>
                            </>
                        ) : (
                            <>
                                <p>Viaje novamente pelo universo dos filmes com CineShow!</p>
                                <p>Entre na sua conta e volte a aproveitar nossos serviços.</p>
                            </>
                        )}

                        <span>ou</span>

                        <Button 
                            type="button" 
                            text={isLogin ? "Entrar em uma conta" : "Criar conta"} 
                            handleClick={(e) => LTF.loginFormTransition(isLogin, setIsLogin, setUser, openEyeIcon)} 
                            customClass={styles.login_button}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;