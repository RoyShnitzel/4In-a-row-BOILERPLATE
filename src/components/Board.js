import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

function Board() {
  const [board, setBoard] = useState([[]]);
  const [winner, setWinner] = useState();
  const [currentPlayer, setCurrentPlayer] = useState("player1");

  function emptyBoard() {
    const gameBoard = [];
    for (let i = 0; i < 7; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < 6; j++) {
        gameBoard[i][j] = null;
      }
    }
    setBoard(gameBoard);
    setWinner(false);
    setCurrentPlayer("player1");
  }

  useEffect(() => {
    emptyBoard();
  }, []);

  function calculateTie(board) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (board[i][j] === null) {
          return;
        }
      }
    }
    setWinner("tie");
  }

  function calculateVertical(board) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          board[i][j] !== null &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i][j + 2] &&
          board[i][j] === board[i][j + 3]
        ) {
          setWinner(board[i][j]);
        }
      }
    }
  }
  function calculateHorizontal(board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          board[i][j] !== null &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 2][j] &&
          board[i][j] === board[i + 3][j]
        ) {
          setWinner(board[i][j]);
        }
      }
    }
  }
  function calculateDiagonalUp(board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          board[i][j] !== null &&
          board[i][j] === board[i + 1][j + 1] &&
          board[i][j] === board[i + 2][j + 2] &&
          board[i][j] === board[i + 3][j + 3]
        ) {
          setWinner(board[i][j]);
        }
      }
    }
  }
  function calculateDiagonalDown(board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 5; j > 2; j--) {
        if (
          board[i][j] !== null &&
          board[i][j] === board[i + 1][j - 1] &&
          board[i][j] === board[i + 2][j - 2] &&
          board[i][j] === board[i + 3][j - 3]
        ) {
          setWinner(board[i][j]);
        }
      }
    }
  }

  function calculateWinner(board) {
    calculateTie(board);
    calculateVertical(board);
    calculateHorizontal(board);
    calculateDiagonalUp(board);
    calculateDiagonalDown(board);
  }

  function handleClick(i) {
    const newBoard = board.slice();
    for (let s = 0; s < newBoard[i].length; s++) {
      if (newBoard[i][s] === null) {
        newBoard[i][s] = currentPlayer;
        console.log(newBoard);
        currentPlayer === "player1"
          ? setCurrentPlayer("player2")
          : setCurrentPlayer("player1");
        calculateWinner(newBoard);
        setBoard(newBoard);
        break;
      }
    }
  }
  return (
    <>
      <div className="Board">
        {board.map((column, i) => {
          return (
            <>
              {i === 0 && <div className="divider" />}{" "}
              {/* the red column separating each column */}
              <div
                className="Column"
                id={`column${i}`}
                onClick={() => handleClick(i)}
              >
                {column.map((value, i) => {
                  return (
                    <div className="Square" id={`square${i}`}>
                      {value !== null && <div className={value}></div>}
                    </div>
                  );
                })}
              </div>
              <div className="divider" />{" "}
              {/* the red column separating each column */}
            </>
          );
        })}
      </div>

      <Modal
        open={winner ? true : false}
        onClose={() => {
          emptyBoard();
        }}
      >
        <div className="winModal">
          <h2>Game Finished !</h2>
          <h2>{winner === "tie" ? "A Tie !" : `Winner is: ${winner}`}</h2>
        </div>
      </Modal>
    </>
  );
}

export default Board;
