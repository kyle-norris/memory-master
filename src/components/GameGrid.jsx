import styles from "../styles/components/game-grid.module.scss";
import PropTypes from "prop-types";
import GamePiece from "./GamePiece";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faBone,
  faCandyCane,
  faCar,
  faCarrot,
  faDragon,
  faEye,
  faFish,
  faHotel,
  faIceCream,
  faMenorah,
  faMoon,
  faMosquito,
  faPizzaSlice,
  faPuzzlePiece,
  faRobot,
  faSnowman,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function GameGrid({ grid, size, selectPiece, isVisible, isSelected, theme }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    if (theme == "icons") {
      var all_icons = [
        faBoltLightning,
        faBone,
        faCandyCane,
        faCar,
        faCarrot,
        faDragon,
        faEye,
        faFish,
        faHotel,
        faIceCream,
        faMenorah,
        faMoon,
        faMosquito,
        faPizzaSlice,
        faPuzzlePiece,
        faRobot,
        faSnowman,
        faUserAstronaut,
      ];
      let shuffled = all_icons
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setIcons(shuffled);
    }
  }, [theme]);

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
                  {theme == "numbers" ? (
                    item
                  ) : (
                    <FontAwesomeIcon icon={icons[item]} />
                  )}
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
  theme: PropTypes.string,
};

export default GameGrid;
