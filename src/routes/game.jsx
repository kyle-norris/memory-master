import styles from "../styles/components/game.module.scss";
import { Desktop, Mobile } from "../breakpoints";
import { useState, useEffect, useRef, useCallback } from "react";
import MobileMenu from "../components/mobileMenu";
import { generateGrid } from "../utils/game-logic";
import GameGrid from "../components/GameGrid";
import { useLocation } from "react-router-dom";
import React from "react";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Game() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const [grid, setGrid] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // const [gameBoard, setGameBoard] = useState({ grid: [], selectedIndexes: [] });
  const [pieces, setPieces] = useState([]);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [matchedPieces, setMatchedPieces] = useState([]);
  // const [selectedIndexes, setSelectedIndexes] = useState([]);

  let query = useQuery();
  const timeout = useRef(null);

  useEffect(() => {
    const size = query.get("size") ? Number(query.get("size")) : 4;
    setPieces(generateGrid(size));
    const numPlayers = query.get("players") ? Number(query.get("players")) : 1;
    setNumPlayers(numPlayers);
  }, [query]);

  function restartGame() {
    return null;
  }

  function newGame() {
    return null;
  }

  useEffect(() => {
    if (selectedPieces.length == 2) {
      let [idx1, idx2] = [...selectedPieces];
      if (pieces[idx1] == pieces[idx2]) {
        setMatchedPieces((prev) => [...prev, idx1, idx2]);
        setSelectedPieces(() => []);
      } else {
        timeout.current = setTimeout(() => {
          setSelectedPieces(() => []);
        }, 2000);
      }
      setCurrentPlayer((prev) => (prev == numPlayers ? 1 : prev + 1));
    } else {
      clearTimeout(timeout.current);
    }
  }, [selectedPieces, pieces, numPlayers]);

  const isClickable = (idx) => {
    return !matchedPieces.includes(idx) && !selectedPieces.includes(idx);
  };

  const isVisible = (idx) => {
    return selectedPieces.includes(idx) || matchedPieces.includes(idx);
  };

  const isSelected = (idx) => {
    return selectedPieces.includes(idx);
  };

  const handlePieceClick = (idx) => {
    if (!isClickable(idx)) return;
    setSelectedPieces((prev) => {
      return prev.length == 1 ? [...prev, idx] : [idx];
    });
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
        grid={pieces}
        size={Number(query.get("size"))}
        selectPiece={handlePieceClick}
        isVisible={isVisible}
        isSelected={isSelected}
      />
    </div>
  );
}

export default Game;
