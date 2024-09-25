import styles from "./Home.module.css";
import Logo from "../../img/CineShow-Logo.png";

function Home() {
    return (
        <main className={styles.home}>
            <div className={styles.welcome}>
                <h1>Bem-vindo ao <span className={styles.cine}>Cine</span><span className={styles.show}>Show</span>!</h1>
                <p className={styles.slogan}>O cinema que te mostra a beleza das grandes telas.</p>
            </div>

            <section className={styles.movies}>
                <h2>Filmes em cartaz:</h2>

            </section>

            <section className={styles.cinemas}> 
                <h2>Nossos cinemas:</h2>

            </section>
        </main>
    );
}

export default Home;