import styles from "../styles/components/players.module.scss";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "../breakpoints";

function Players({ players, isTurn, scores }) {
  return (
    <div className={styles.container}>
      {players.map((player, idx) => (
        <div
          className={
            isTurn(player)
              ? `${styles.player} ${styles.active}`
              : `${styles.player}`
          }
          key={idx}
        >
          <Mobile>
            <div>P{player}</div>
          </Mobile>
          <Desktop>
            <div>Player {player}</div>
          </Desktop>
          <div className={styles.score}>{scores[idx]}</div>
        </div>
      ))}
    </div>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  isTurn: PropTypes.func,
  scores: PropTypes.array,
};

export default Players;
