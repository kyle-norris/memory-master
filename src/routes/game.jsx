import styles from "../styles/components/game.module.scss";
import { Desktop, Mobile } from "../breakpoints";
import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import MobileMenu from "../components/MobileMenu";
import { generateGrid } from "../utils/game-logic";
import GameGrid from "../components/GameGrid";
import { useLocation } from "react-router-dom";
import React from "react";
import Players from "../components/Players";
import SinglePlayer from "../components/SinglePlayer";
import useTimer from "easytimer-react-hook";
import { useNavigate } from "react-router-dom";
import EndGameMenu from "../components/EndGameMenu";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const initialState = {
  pieces: [],
  selectedPieces: [],
  matchedPieces: [],
  currentPlayer: 1,
  scores: [],
  players: [],
  moves: 0, // only used for 1-person game
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETUP":
      return {
        ...state,
        players: action.players,
        scores: action.scores,
        pieces: action.pieces,
      };
    case "SELECT_PIECE":
      if (state.selectedPieces.length == 1) {
        return {
          ...state,
          selectedPieces: [...state.selectedPieces, action.piece],
        };
      } else {
        return {
          ...state,
          selectedPieces: [action.piece],
        };
      }
    case "CHECK_MATCH": {
      if (state.selectedPieces.length !== 2) {
        return state;
      }
      let [idx1, idx2] = [...state.selectedPieces];
      let updatedState = { ...state };
      if (state.pieces[idx1] == state.pieces[idx2]) {
        let newScores = [...state.scores];
        newScores[state.players.indexOf(state.currentPlayer)] += 1;
        updatedState.selectedPieces = [];
        updatedState.scores = newScores;
        updatedState.matchedPieces = [...state.matchedPieces, idx1, idx2];
      }
      updatedState.moves += 1;
      return updatedState;
    }
    case "NEXT_PLAYER": {
      let nextPlayer =
        state.currentPlayer == state.players.length
          ? 1
          : state.currentPlayer + 1;
      return {
        ...state,
        selectedPieces: [],
        currentPlayer: nextPlayer,
      };
    }

    default:
      return state;
  }
};

function Game() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timer, isTargetAchieved] = useTimer({
    target: { hours: 1 },
    updateWhenTargetAchieved: true,
  });

  let query = useQuery();
  const timeout = useRef(null);
  const navigate = useNavigate();

  const getSize = useCallback(() => {
    let querySize = query.get("size") ? Number(query.get("size")) : 4;
    return [4, 6].includes(querySize) ? querySize : 4;
  }, [query]);

  const getNumPlayers = useCallback(() => {
    let queryPlayers = query.get("players") ? Number(query.get("players")) : 1;
    return [1, 2, 3, 4].includes(queryPlayers) ? queryPlayers : 1;
  }, [query]);

  const getTheme = () => {
    let queryTheme = query.get("theme") ? query.get("theme") : "numbers";
    return ["numbers", "icons"].includes(queryTheme) ? queryTheme : "numbers";
  };
  const theme = getTheme();

  useEffect(() => {
    const size = getSize();
    let pieces = generateGrid(size);
    const numPlayers = getNumPlayers();
    let players = [];
    let scores = [];
    for (let i = 1; i <= numPlayers; i++) {
      players.push(i);
      scores.push(0);
    }
    dispatch({
      type: "SETUP",
      players: players,
      scores: scores,
      pieces: pieces,
    });
    if (numPlayers == 1) {
      timer.start();
    }
  }, [query, getSize, getNumPlayers, timer]);

  useEffect(() => {
    if (state.selectedPieces.length == 2) {
      dispatch({ type: "CHECK_MATCH" });
      timeout.current = setTimeout(() => {
        nextPlayer();
      }, 1500);
    }
  }, [state.selectedPieces]);

  function restartGame() {
    window.location.reload();
  }

  function newGame() {
    navigate("/", { replace: false });
  }

  const nextPlayer = () => {
    dispatch({ type: "NEXT_PLAYER" });
  };

  useEffect(() => {
    if (state.matchedPieces.length > 0) {
      if (state.matchedPieces.length == state.pieces.length) {
        timer.pause();
      } else {
        clearTimeout(timeout.current);
        nextPlayer();
      }
    }
  }, [state.matchedPieces, state.pieces, timer]);

  const isClickable = (idx) => {
    return (
      !isTargetAchieved &&
      !state.matchedPieces.includes(idx) &&
      !state.selectedPieces.includes(idx) &&
      state.selectedPieces.length < 2
    );
  };

  const isVisible = (idx) => {
    return (
      state.selectedPieces.includes(idx) || state.matchedPieces.includes(idx)
    );
  };

  const isSelected = (idx) => {
    return state.selectedPieces.includes(idx);
  };

  const isTurn = (player) => {
    return state.currentPlayer == player;
  };

  const isGameOver = () => {
    return (
      state.players.length > 0 &&
      (state.matchedPieces.length == state.pieces.length ||
        (state.players.length == 1 && isTargetAchieved))
    );
  };

  const handlePieceClick = (idx) => {
    if (!isClickable(idx)) return;
    dispatch({ type: "SELECT_PIECE", piece: idx });
  };

  return (
    <div className={styles.background}>
      <header>
        <div onClick={newGame} style={{ cursor: "pointer" }}>
          memory
        </div>
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
            <button className={styles.menuBtn1} onClick={restartGame}>
              Restart
            </button>
            <button className={styles.menuBtn2} onClick={newGame}>
              New Game
            </button>
          </div>
        </Desktop>
      </header>
      <GameGrid
        grid={state.pieces}
        size={getSize()}
        selectPiece={handlePieceClick}
        isVisible={isVisible}
        isSelected={isSelected}
        theme={theme}
      />
      {state.players.length == 1 ? (
        <SinglePlayer time={timer.getTimeValues()} moves={state.moves} />
      ) : (
        <Players
          players={state.players}
          isTurn={isTurn}
          scores={state.scores}
        />
      )}
      {isGameOver() ? (
        <EndGameMenu
          scores={state.scores}
          time={timer.getTimeValues()}
          moves={state.moves}
          restartGame={restartGame}
          newGame={newGame}
          timeout={isTargetAchieved && state.players.length == 1}
        />
      ) : null}
    </div>
  );
}

export default Game;
