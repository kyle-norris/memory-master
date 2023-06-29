import styles from "../styles/components/game.module.scss";
import { Desktop, Mobile } from "../breakpoints";
import { useState, useEffect } from "react";
import MobileMenu from "../components/mobileMenu";
import { generateGrid } from "../utils/game-logic";
import GameGrid from "../components/GameGrid";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Game() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [grid, setGrid] = useState();

  useEffect(() => {
    setGrid(generateGrid(4));
  }, [setGrid]);

  function restartGame() {
    return null;
  }

  function newGame() {
    return null;
  }

  return (
    <div className={styles.background}>
      <header>
        <div>memory</div>
        <Mobile>
          <button
            className="primary--small"
            onClick={() => setShowMobileMenu(true)}
          >
            Menu
          </button>
          {showMobileMenu ? (
            <MobileMenu
              restart={restartGame}
              newGame={newGame}
              resume={() => setShowMobileMenu(false)}
            />
          ) : null}
        </Mobile>
        <Desktop>
          <div className={styles.menuBtns}>
            <button className={styles.menuBtn1}>Restart</button>
            <button className={styles.menuBtn2}>New Game</button>
          </div>
        </Desktop>
      </header>
      <GameGrid grid={grid} />
    </div>
  );
}

export default Game;
