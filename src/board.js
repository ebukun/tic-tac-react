import React, { useEffect, useState } from "react";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  cusor: "pointer"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const shufflebuttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  height: "40px",
  backgroundColor: "limeGreen",
  color: "white",
  fontSize: "16px"
};

const Square = (props) => {
  function clickButton() {
    if (props.disabled) return true;
    props.updateClick(props.value);
  }

  return (
    <button
      className="square"
      disabled={props.disabled}
      style={squareStyle}
      onClick={clickButton}
      value={props.value}
    >
      <span className="square-text">
        {props.playerXClicks.indexOf(props.value) > -1
          ? "X"
          : props.playerOClicks.indexOf(props.value) > -1
          ? "O"
          : ""}
      </span>
    </button>
  );
};

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [winner, setWinner] = useState("None");
  const [playerO, setPlayerO] = useState([]);
  const [playerX, setPlayerX] = useState([]);

  function updateClick(value) {
    if (currentPlayer === "x") {
      setPlayerX((prevState) => [...prevState, value]);
      setCurrentPlayer("o");
    } else {
      setPlayerO((prevState) => [...prevState, value]);
      setCurrentPlayer("x");
    }
  }

  function resetBoard() {
    setCurrentPlayer("x");
    setPlayerO([]);
    setPlayerX([]);
    setWinner("None");
  }

  function checkRows() {
    if (
      (playerX.includes(0) && playerX.includes(1) && playerX.includes(2)) ||
      (playerX.includes(3) && playerX.includes(4) && playerX.includes(5)) ||
      (playerX.includes(6) && playerX.includes(7) && playerX.includes(8))
    ) {
      return setWinner("Player X");
    }

    if (
      (playerO.includes(0) && playerO.includes(1) && playerO.includes(2)) ||
      (playerO.includes(3) && playerO.includes(4) && playerO.includes(5)) ||
      (playerO.includes(6) && playerO.includes(7) && playerO.includes(8))
    ) {
      return setWinner("Player O");
    }
  }

  function checkColumns() {
    if (
      (playerX.includes(0) && playerX.includes(3) && playerX.includes(6)) ||
      (playerX.includes(1) && playerX.includes(4) && playerX.includes(7)) ||
      (playerX.includes(2) && playerX.includes(5) && playerX.includes(8))
    ) {
      return setWinner("Player X");
    }

    if (
      (playerO.includes(0) && playerO.includes(3) && playerO.includes(6)) ||
      (playerO.includes(1) && playerO.includes(4) && playerO.includes(7)) ||
      (playerO.includes(2) && playerO.includes(5) && playerO.includes(8))
    ) {
      return setWinner("Player O");
    }
  }

  function checkDiagonals() {
    if (playerX.includes(4)) {
      if (
        (playerX.includes(0) && playerX.includes(8)) ||
        (playerX.includes(2) && playerX.includes(6))
      ) {
        return setWinner("Player X");
      }
    }
    if (playerO.includes(4)) {
      if (
        (playerO.includes(0) && playerO.includes(8)) ||
        (playerO.includes(2) && playerO.includes(6))
      ) {
        return setWinner("Player O");
      }
    }
  }

  function getWinner() {
    if (winner !== "None") return "";

    checkRows();
    checkColumns();
    checkDiagonals();
  }

  function checkButtonDisabilty(value) {
    if (playerX.includes(value)) return true;
    if (playerO.includes(value)) return true;
    if (winner !== "None") return true;

    return false;
  }

  function shuffleStartPlayer() {
    const players = ["x", "o"];
    const currentPlayer = players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(currentPlayer);
  }

  useEffect(() => {
    getWinner();
  }, [playerO, playerX]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player:{" "}
        <span>{currentPlayer === "x" ? "Player X" : "Player 0"}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={0}
            disabled={checkButtonDisabilty(0)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={1}
            disabled={checkButtonDisabilty(1)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={2}
            disabled={checkButtonDisabilty(2)}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={3}
            disabled={checkButtonDisabilty(3)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={4}
            disabled={checkButtonDisabilty(4)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={5}
            disabled={checkButtonDisabilty(5)}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={6}
            disabled={checkButtonDisabilty(6)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={7}
            disabled={checkButtonDisabilty(7)}
          />
          <Square
            updateClick={updateClick}
            playerXClicks={playerX}
            playerOClicks={playerO}
            value={8}
            disabled={checkButtonDisabilty(8)}
          />
        </div>
      </div>
      <button style={shufflebuttonStyle} onClick={shuffleStartPlayer}>
        Shuffle Player to start
      </button>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default Game;
