import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Icon from "../../img/CineShow-Letters.svg";


function NavBar() {
    return (
        <nav className={styles.navBar}>
            <Link to="/" className={styles.icon_link}><img src={Icon} alt="CineShow Icon" /></Link>
            <ul className={styles.link_list}>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;