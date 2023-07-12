import styles from "../styles/components/single-player.module.scss";
import PropTypes from "prop-types";

function SinglePlayer({ moves, time }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>Time</div>
        <div className={styles.value}>
          {time.minutes.toString()}:{time.seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <div className={styles.card}>
        <div>Moves</div>
        <div className={styles.value}>{moves}</div>
      </div>
    </div>
  );
}

SinglePlayer.propTypes = {
  moves: PropTypes.number,
  time: PropTypes.object,
};

export default SinglePlayer;
