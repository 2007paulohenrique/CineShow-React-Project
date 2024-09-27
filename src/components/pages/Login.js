import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Login.module.css";
import GoogleIcon from "../../img/Google_Icon.png";

function Login() {
    return (
        <main className={styles.login}>
            <div className={styles.login_container}>
                <form className={styles.login_form}>
                    <h1>Login</h1>
                    <Input name="name" type="text" placeholder="Insira seu nome" text="Nome"/>
                    <Input name="email" type="email" placeholder="Insira seu e-mail" text="E-mail"/>
                    <Input name="phone" type="tel" placeholder="XX 9XXXX-XXXX" text="Telefone"/>
                    <div className={styles.password_container}>
                        <Input name="password" type="password" placeholder="Insira sua senha" text="Senha"/>
                        <Input name="repeatedPassword" type="password" placeholder="Confirme sua senha"/>
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