import Die from "./components/Die";
import {useState, useEffect} from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {

const [dice, setDice] = useState(allNewDice);
const [tenzies, setTenzies] = useState(false);

useEffect(() => {
  console.log("Dice state changed");
  const allDiceHeld = dice.every(die => die.isHeld);
  const firstDieValue = dice[0].value;
  const allSameNumber = dice.every(die => die.value === firstDieValue);
  if(allDiceHeld && allSameNumber) {
    setTenzies(true);
    console.log("You win!");
  }
}, [dice])

function allNewDice() {
  return Array(10).fill().map(() => 
    generateDie()
  )
}

function generateDie() {
  return {
    value: randomDieValue(),
    isHeld: false,
    id: nanoid()
  }
}

function randomDieValue() {
    return Math.ceil(Math.random() * 6);
}

function rollDice() {
  if(!tenzies) {
  setDice(prevDice => prevDice.map(die => {
    return die.isHeld ? die : generateDie()
  }))
  } else {
    setTenzies(false);
    setDice(allNewDice);
  }
}

function holdDice(id) {
  setDice(prevDice => prevDice.map(die => {
    return die.id === id ? {
      ...die,
      isHeld: !die.isHeld
    } : die
  }))
}

const diceEl = dice.map(die => {
  return(
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggle={() => holdDice(die.id)}
      />
  )
})


  return (
    <main >
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceEl}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
