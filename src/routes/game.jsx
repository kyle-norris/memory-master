import styles from "../styles/components/game.module.scss";
import { Desktop, Mobile } from "../breakpoints";
import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import MobileMenu from "../components/mobileMenu";
import { generateGrid } from "../utils/game-logic";
import GameGrid from "../components/GameGrid";
import { useLocation } from "react-router-dom";
import React from "react";
import Players from "../components/Players";

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

  let query = useQuery();
  const timeout = useRef(null);

  const getSize = useCallback(() => {
    let querySize = query.get("size") ? Number(query.get("size")) : 4;
    return [4, 6].includes(querySize) ? querySize : 4;
  }, [query]);

  const getNumPlayers = useCallback(() => {
    let queryPlayers = query.get("players") ? Number(query.get("players")) : 1;
    return [1, 2, 3, 4].includes(queryPlayers) ? queryPlayers : 1;
  }, [query]);

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
  }, [query, getSize, getNumPlayers]);

  useEffect(() => {
    if (state.selectedPieces.length == 2) {
      dispatch({ type: "CHECK_MATCH" });
      timeout.current = setTimeout(() => {
        nextPlayer();
      }, 2000);
    }
  }, [state.selectedPieces]);

  function restartGame() {
    return null;
  }

  function newGame() {
    return null;
  }

  const nextPlayer = () => {
    dispatch({ type: "NEXT_PLAYER" });
  };

  useEffect(() => {
    if (state.matchedPieces.length > 0) {
      clearTimeout(timeout.current);
      nextPlayer();
    }
  }, [state.matchedPieces]);

  const isClickable = (idx) => {
    return (
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

  const handlePieceClick = (idx) => {
    if (!isClickable(idx)) return;
    dispatch({ type: "SELECT_PIECE", piece: idx });
  };

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
      <GameGrid
        grid={state.pieces}
        size={getSize()}
        selectPiece={handlePieceClick}
        isVisible={isVisible}
        isSelected={isSelected}
      />
      <Players players={state.players} isTurn={isTurn} scores={state.scores} />
    </div>
  );
}

export default Game;
