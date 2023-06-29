import styles from "../styles/components/game-grid.module.scss";
import PropTypes from "prop-types";

function GameGrid({ grid }) {
  return (
    <div className={styles.playArea}>
      <div></div>
    </div>
  );
}

GameGrid.propTypes = {
  grid: PropTypes.object.isRequired,
};

export default GameGrid;
