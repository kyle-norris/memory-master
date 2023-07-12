import styles from "../styles/components/end-game-menu.module.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function EndGameMenu({ scores, time, moves, restartGame, newGame, timeout }) {
  const [winners, setWinners] = useState([]);
  const [playersAndScores, setPlayersAndScores] = useState([]);
  const singlePlayer = scores.length == 1;

  useEffect(() => {
    var newWinners = [];
    const topScore = Math.max(...scores);
    let idx = scores.indexOf(topScore);
    while (idx !== -1) {
      newWinners.push(idx + 1);
      idx = scores.indexOf(topScore, idx + 1);
    }
    setWinners(newWinners);

    var newPlayersAndScores = [];
    for (let idx = 0; idx < scores.length; idx++) {
      newPlayersAndScores.push([idx + 1, scores[idx]]);
    }
    newPlayersAndScores.sort(function (a, b) {
      return b[1] - a[1];
    });
    setPlayersAndScores(newPlayersAndScores);
  }, [scores]);

  const isTie = () => {
    return winners.length > 1;
  };

  const isWinner = (playerNumber) => {
    return winners.includes(playerNumber);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {singlePlayer ? (
          <>
            {timeout ? (
              <>
                <h1>Time Limit!</h1>
                <p>You took too long...</p>
              </>
            ) : (
              <>
                <h1>You did it!</h1>
                <p>Game over! Here&apos;s how you got on...</p>
              </>
            )}

            <div className={styles.infoSingle}>
              <div className={styles.infoCard}>
                <div>Time Elapsed</div>
                <div className={styles.info}>
                  {timeout ? (
                    <>60:00</>
                  ) : (
                    <>
                      {time.minutes.toString()}:
                      {time.seconds.toString().padStart(2, "0")}
                    </>
                  )}
                </div>
              </div>
              <div className={styles.infoCard}>
                <div>Moves Taken</div>
                <div className={styles.info}>{moves} Moves</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>{isTie() ? "It's a tie!" : `Player ${winners[0]} Wins!`}</h1>
            <p>Game over! Here are the results...</p>
            <div className={styles.infoSingle}>
              {playersAndScores.map((item, idx) => (
                <div
                  className={
                    isWinner(item[0])
                      ? `${styles.infoCard} ${styles.winner}`
                      : styles.infoCard
                  }
                  key={idx}
                >
                  <div>
                    Player {item[0]} {isWinner(item[0]) ? "(Winner!)" : null}
                  </div>
                  <div className={styles.info}>{item[1]} Pairs</div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.btn1} onClick={restartGame}>
            Restart
          </button>
          <button className={styles.btn2} onClick={newGame}>
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
}

EndGameMenu.propTypes = {
  scores: PropTypes.array,
  time: PropTypes.object,
  moves: PropTypes.number,
  restartGame: PropTypes.func,
  newGame: PropTypes.func,
  timeout: PropTypes.bool,
};

export default EndGameMenu;
