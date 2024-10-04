import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../../img/Google_Icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../layout/Button";
// Funções para as mudanças nos campos dos formulários de login/registro.
import LCF from "./LoginChangingFunctions";
// Funções para as transições.
import LTF from "./LoginTransitionFunctions";
// Funções de formatação de dados.
import LFF from "./LoginFormattingFunctions";
// Funções para os envios dos formulários de login/registro.
import LSF from "./LoginSubmitFunctions";

function Login() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    // Estado para o tipo do formulário. Caso seja login, true, caso seja sign up, false.
    const [isLogin, setIsLogin] = useState(false);
    const [loginTypeIsEmail, setLoginTypeIsEmail] = useState(true);

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
    
    return (
        <main className={styles.login}>
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
                        />

                        <Input 
                            name="email" 
                            type="email" 
                            placeholder="Insira seu e-mail" 
                            text="E-mail" 
                            handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                            handleOnInput={LFF.formatEmail}
                        />

                        <Input 
                            name="phone" 
                            type="tel" 
                            placeholder="(XX) 9XXXX-XXXX" 
                            text="Telefone" 
                            handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                            handleOnInput={LFF.formatPhone}
                        />

                        <div className={styles.password_container}>
                            <Input 
                                name="password" 
                                type="password" 
                                placeholder="Insira sua senha" 
                                text="Senha" 
                                handleOnChange={(e) => LCF.handlePasswordContainer(user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                            />

                            <Input 
                                name="confirmedPassword" 
                                type="password" 
                                placeholder="Confirme sua senha" 
                                handleOnChange={(e) => LCF.handlePasswordContainer(user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                            />
                        </div>

                        <div className={styles.buttons}>
                            <SubmitButton  text="Criar conta" handleSubmit={(e) => LSF.signUpSubmit(e, isLogin, user, users, navigate)}/>

                            <button type="button" className={styles.sign_in_google}>
                                <img src={GoogleIcon} alt="Google Icon"/>Criar com Google
                            </button>                        
                        </div>
                    </form>

                    <form className={styles.login_form} id="login">
                        <h1>Entrar</h1>

                        <div className={styles.signup_fields}>
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
                                    text="Telefone" 
                                    handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                                    handleOnInput={LFF.formatPhone}
                                />
                            )}

                            <Input 
                                name="passwordLogin" 
                                type="password" 
                                placeholder="Insira sua senha" 
                                text="Senha" 
                                handleOnChange={(e) => LCF.handleChange(e, user, setUser)} 
                                handleOnInput={LFF.formatPassword}
                            />

                            <div className={styles.buttons}>
                                <SubmitButton  
                                    text="Entrar" 
                                    handleSubmit={(e) => LSF.loginSubmit(e, isLogin, user, users, loginTypeIsEmail, navigate)}
                                />

                                <button type="button" className={styles.sign_in_google}>
                                    <img src={GoogleIcon} alt="Google Icon"/>Entrar com Google
                                </button>  

                                ou

                                <Button 
                                    type="button" 
                                    text={loginTypeIsEmail ? "Entrar com telefone" : "Entrar com e-mail"} 
                                    handleClick={(e) => LTF.loginTypeTransition(setUser, setLoginTypeIsEmail, loginTypeIsEmail)} 
                                    customClass={styles.login_button}
                                />
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

                        {isLogin ? (
                            <p>Crie uma conta e aproveite todos os nossos serviços.</p>
                        ) : (
                            <p>Entre na sua conta e volte a aproveitar nossos serviços.</p>
                        )}

                        <span>ou</span>

                        <Button 
                            type="button" 
                            text={isLogin ? "Entrar em uma conta" : "Criar conta"} 
                            handleClick={(e) => LTF.loginFormTransition(isLogin, setIsLogin, setUser)} 
                            customClass={styles.login_button}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;