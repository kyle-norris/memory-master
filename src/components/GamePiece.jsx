import styles from "../styles/components/game-piece.module.scss";
import PropTypes from "prop-types";

function GamePiece({ children, visible, selected, size, onSelect }) {
  return (
    <div
      className={size == 4 ? `${styles.container4}` : `${styles.container6}`}
    >
      <div
        className={selected ? `${styles.circleSelected}` : `${styles.circle}`}
      >
        {children}
      </div>
      <div
        onClick={onSelect}
        className={
          visible ? `${styles.overlay} ${styles.reveal}` : `${styles.overlay}`
        }
      ></div>
    </div>
  );
}

GamePiece.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.number,
  onSelect: PropTypes.func,
};

export default GamePiece;
