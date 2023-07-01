import styles from "../styles/components/game-grid.module.scss";
import PropTypes from "prop-types";
import GamePiece from "./GamePiece";

function GameGrid({ grid, size, selectPiece, isVisible, isSelected }) {
  return (
    <>
      {grid ? (
        <div
          className={size == 4 ? `${styles.playArea4}` : `${styles.playArea6}`}
        >
          {grid
            ? grid.map((item, idx) => (
                <GamePiece
                  size={size}
                  visible={isVisible(idx)}
                  selected={isSelected(idx)}
                  onSelect={() => selectPiece(idx)}
                  key={idx}
                >
                  {item}
                </GamePiece>
              ))
            : null}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

GameGrid.propTypes = {
  grid: PropTypes.array,
  size: PropTypes.number,
  selectPiece: PropTypes.func,
  isVisible: PropTypes.func,
  isSelected: PropTypes.func,
};

export default GameGrid;
