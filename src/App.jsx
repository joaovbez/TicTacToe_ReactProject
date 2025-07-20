import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS} from "./winning-combinations";
import { useState } from "react"
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function derivateSActivePlayer(gameTurns) {
  let currentActivePlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentActivePlayer = 'O';
  }
  return currentActivePlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = derivateSActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(row => [...row])];
  for (const turn of gameTurns) {
       const {square, player} = turn;
      const {row, col} = square;        
      gameBoard[row][col] = player;
  }

  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol && firstSquareSymbol !== null){
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) =>{
      const currentPlayer = derivateSActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, 
                            ...prevTurns,];
      return updatedTurns;
    })

  }

  function handleRematch(){
    setGameTurns([]);
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">  
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol> 
        {(winner || hasDraw) && <GameOver winner = {winner} onRematch = {handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
