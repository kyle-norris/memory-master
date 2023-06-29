import styles from "../styles/components/setup.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Setup() {
  const [gameSettings, setGameSettings] = useState({
    theme: "numbers",
    players: 1,
    grid: 4,
  });

  function setTheme(theme) {
    setGameSettings({ ...gameSettings, theme: theme });
  }

  function setPlayers(players) {
    setGameSettings({ ...gameSettings, players: players });
  }

  function setGrid(grid) {
    setGameSettings({ ...gameSettings, grid: grid });
  }

  function buildGameRoute() {
    var route = "game";
    route += `?theme=${gameSettings.theme}`;
    route += `?players=${gameSettings.players}`;
    route += `?grid=${gameSettings.grid}`;
    return route;
  }

  return (
    <div className={styles.background}>
      <div className={styles.title}>memory</div>
      <div className={styles.card}>
        <div className={styles.row}>
          <h3>Select Theme</h3>
          <div className={`${styles.buttonRow} ${styles.row1}`}>
            <button
              className={
                gameSettings.theme == "numbers"
                  ? "menuSelection active"
                  : "menuSelection"
              }
              onClick={() => setTheme("numbers")}
            >
              Numbers
            </button>
            <button
              className={
                gameSettings.theme == "icons"
                  ? "menuSelection active"
                  : "menuSelection"
              }
              onClick={() => setTheme("icons")}
            >
              Icons
            </button>
          </div>
          <h3>Number of Players</h3>
          <div className={`${styles.buttonRow} ${styles.row2}`}>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={
                  gameSettings.players == num
                    ? "menuSelection active"
                    : "menuSelection"
                }
                onClick={() => setPlayers(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <h3>Grid Size</h3>
          <div className={`${styles.buttonRow} ${styles.row3}`}>
            <button
              className={
                gameSettings.grid == 4
                  ? "menuSelection active"
                  : "menuSelection"
              }
              onClick={() => setGrid(4)}
            >
              4x4
            </button>
            <button
              className={
                gameSettings.grid == 6
                  ? "menuSelection active"
                  : "menuSelection"
              }
              onClick={() => setGrid(6)}
            >
              6x6
            </button>
          </div>
          <div className={`${styles.buttonRow} ${styles.row4}`}>
            <Link to={buildGameRoute()} className="primary">
              Start Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setup;
