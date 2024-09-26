import styles from "./Home.module.css";

function Home() {
    return (
        <main className={styles.home}>
            <div className={styles.welcome}>
                <h1>Bem-vindo ao <span className={styles.cine}>Cine</span><span className={styles.show}>Show</span>!</h1>
                <p className={styles.slogan}>O cinema que te mostra a beleza das grandes telas.</p>
            </div>

            <div className={styles.sections}>
                <section className={styles.popular}>
                    <h2>O mais popular:</h2>
                </section>

                <section className={styles.movies}>
                    <h2>Filmes em cartaz:</h2>

                </section>

                <section className={styles.cinemas}> 
                    <h2>Nossos cinemas:</h2>

                </section>
            </div>
        </main>
    );
}

export default Home;