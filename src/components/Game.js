import styles from "./module-css/Game.module.css";
import { useEffect, useState } from "react";
const Game = () => {
  const [xMoves, setXMover] = useState([]);
  const [oMoves, setOMover] = useState([]);
  const [turn, setTurn] = useState(`X`);
  const [winner, setWinner] = useState("");
  const [counter, setCounter] = useState(0);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  useEffect(() => {
    checkWin();
  }, [xMoves, oMoves]);

  function handleSquareClick(event) {
    if (winner !== "" || counter >= 9) {
      return; // Ignoruj kliknięcia po wygranej
    }

    const clickedSquare = event.target; // Poprawiona nazwa zmiennej
    if (clickedSquare.textContent !== "") {
      return; // Jeśli kafelek już został kliknięty, ignoruj to kliknięcie
    }
    clickedSquare.textContent = turn; // Poprawiona nazwa zmiennej
    colorText(turn, clickedSquare);
    const clickedSquareIndex = parseInt(clickedSquare.getAttribute("id")); // Poprawiona nazwa zmiennej

    getId(clickedSquareIndex, turn);
    changeTurn();
    setCounter((prev) => prev + 1);
  }

  function changeTurn() {
    turn !== "O" ? setTurn("O") : setTurn("X");
  }

  function getId(id, turn) {
    if (turn === "X") {
      setXMover((prev) => [...prev, id]);
    }
    if (turn === "O") {
      setOMover((prev) => [...prev, id]);
    }
  }

  function colorText(turn, clickedSquare) {
    if (
      turn === "X" &&
      !clickedSquare.classList.contains(`${styles.green}`) &&
      !clickedSquare.classList.contains(`${styles.red}`)
    ) {
      clickedSquare.classList.add(`${styles.green}`);
      console.log("Dodano klasę green");
    } else if (
      turn === "O" &&
      !clickedSquare.classList.contains(`${styles.green}`) &&
      !clickedSquare.classList.contains(`${styles.red}`)
    ) {
      clickedSquare.classList.add(`${styles.red}`);
      console.log("Dodano klasę red");
    }
  }
  function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
      if (isWinningConditionMet(xMoves, winningConditions[i])) {
        setWinner("X");
        return;
      }
      if (isWinningConditionMet(oMoves, winningConditions[i])) {
        setWinner("O");
        return;
      }
    }
  }

  function isWinningConditionMet(moves, condition) {
    return condition.every((index) => moves.includes(index));
  }
  function resetGame() {
    localStorage.clear();
    setXMover([]);
    setOMover([]);
    setTurn("X");
    setWinner("");
    setCounter(0);

    const squares = document.querySelectorAll(`.${styles.square}`);
    squares.forEach((square) => {
      square.textContent = "";
      square.classList.remove(`${styles.green}`);
      square.classList.remove(`${styles.red}`);
    });
  }

  return (
    <div className={styles.game}>
      <div className={`${styles.gradientDiv}`}></div>
      <div className={styles.titleDiv}>
        <span id={styles.tic}>Tic</span>
        <span id={styles.tac}>Tac</span>
        <span id={styles.toe}>Toe</span>
      </div>
      <div className={styles.textContainer}>
        {counter >= 9 && (
          <span>No more moves, click restart to play again</span>
        )}
        {counter === 0 && <span>Start game by taking first move</span>}
        {winner !== "" && counter < 9 && (
          <span>
            Winner's {winner}
            <br></br> Play again by clickin restart
          </span>
        )}
        {winner === "" && counter < 9 && <span>{turn}'s turn</span>}
      </div>{" "}
      <div className={`${styles.gameBoard}`}>
        <div onClick={handleSquareClick} className={styles.square} id="0"></div>
        <div onClick={handleSquareClick} className={styles.square} id="1"></div>
        <div onClick={handleSquareClick} className={styles.square} id="2"></div>
        <div onClick={handleSquareClick} className={styles.square} id="3"></div>
        <div onClick={handleSquareClick} className={styles.square} id="4"></div>
        <div onClick={handleSquareClick} className={styles.square} id="5"></div>
        <div onClick={handleSquareClick} className={styles.square} id="6"></div>
        <div onClick={handleSquareClick} className={styles.square} id="7"></div>
        <div onClick={handleSquareClick} className={styles.square} id="8"></div>
      </div>
      <button onClick={resetGame}>Restart</button>
      <p>
        created by gelato<span>cooking</span>
      </p>
    </div>
  );
};
export default Game;
