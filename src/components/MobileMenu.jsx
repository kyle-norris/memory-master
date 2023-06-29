import styles from "../styles/components/mobile-menu.module.scss";
import PropTypes from "prop-types";

function MobileMenu({ restart, newGame, resume }) {
  return (
    <div className={styles.overlay} onClick={resume}>
      <div className={styles.card}>
        <button
          className={`${styles.menuButton} ${styles.btn1}`}
          onClick={restart}
        >
          Restart
        </button>
        <button className={styles.menuButton} onClick={newGame}>
          New Game
        </button>
        <button className={styles.menuButton} onClick={resume}>
          Resume Game
        </button>
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  restart: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
};

export default MobileMenu;
