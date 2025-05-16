import { useState } from "react";
import GameBoard from "./components/gameBoard/GameBoard";
import Player from "./components/player/Player";
import Log from "./components/log/Log";
import { WINNING_COMBINATIONS } from "../wining-combination";
import GameFinish from "./components/gameFinish/gameFinish";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}
function driveWinner(gameBoard , players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner=players[firstSquareSymbol];
    }
  }
  return winner
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = driveActivePlayer(gameTurns);
  const [players , setPlayers] = useState({
    X : 'player 1' , 
    Y : 'player 2'
  })
  let gameBoard = [...initialGameBoard.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  
  
    const winner = driveWinner(gameBoard , players)
    const hasDraw = gameTurns.length === 9 && !winner
    function handleRestart() {
      setGameTurns([])
    }
    function handleSelectSquare(rowIndex, colIndex) {

      setGameTurns((prevTurns) => {
        const currentPlayer = driveActivePlayer(prevTurns);

        const updatedTurns = [
          { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
          ...prevTurns,
        ];
        console.log(gameTurns);
        return updatedTurns;
      });
    }

    function handleChangeName(symbol , newName) {
      setPlayers((prevPlayer)=>{
        return{
          ...prevPlayer ,
          [symbol]:newName
        }
      })
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="O"
            isActive={activePlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Player
            initialName="player 2"
            symbol="X"
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
          />
        </ol>
        {(winner||hasDraw) && (<GameFinish winner={winner} onRestart={handleRestart}/>)}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log reseivePlayerTurns={gameTurns} />
    </main>
  );
}

export default App;
