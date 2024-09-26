import styles from "./Footer.module.css";
import InstagramIcon from "../../img/Instagram_Icon.png";
import XIcon from "../../img/X_Icon.png";
import LinkedinIcon from "../../img/Linkedin_Icon.png";

function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.contact}>
                <h3>Contato</h3>
                <ul>
                    <li><span>Telefone:</span> 11 00000-0000</li>
                    <li><span>E-mail:</span> cineshowsuport2024@gmail.com</li>
                </ul>
            </section>
            <section className={styles.policies}>
                <h3>Políticas</h3>
                <ul>
                    <li>Política de privacidade</li>
                    <li>Termos de uso</li>
                    <li>Política de cookies</li>
                </ul>
            </section>
            <section className={styles.resources}>
                <h3>CineShow</h3>
                <ul>
                    <li>Sobre</li>
                    <li>FAQ</li>
                    <li>Suporte</li>
                </ul>
            </section>
            <section className={styles.social_midias}>
                <h3>Redes sociais</h3>
                <ul>
                    <li><img src={InstagramIcon} alt="Instagram"/></li>
                    <li><img src={XIcon} alt="X"/></li>
                    <li><img src={LinkedinIcon} alt="LinkedIn"/></li>
                </ul>
            </section>
            <section className={styles.map}>
                <h3>Mapa</h3>
                <ul>
                    <li>Filmes em cartaz</li>
                    <li>Categorias</li>
                    <li>Cinemas</li>
                </ul>
            </section>
            <span className={styles.copyright}>&copy; 2024 CineShow.</span>
        </footer>
    );
}

export default Footer;