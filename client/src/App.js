import React, { useState, useEffect } from 'react'
import './App.css'
import rawCities from './cities.json'
import pin from './assets/pin.png'
import pinValid from './assets/pinValid.png'

function App() {
  const cities = JSON.stringify(rawCities)
  const newCities = JSON.parse(cities)
  const [num, setNum] = useState(0)
  const [citiesArr, setCitiesArr] = useState(newCities[num])
  const [result, setResult] = useState(null)
  const [clicked, setClicked] = useState(true)
  const [score, setScore] = useState(1500)
  const [correct, setCorrect] = useState(0)

  const checkValidation = (e) => {
    console.log(e.screenX, e.screenY)
    if(score > 0 && clicked && citiesArr && e.screenX < 800 && e.screenY < 862){
      let resX = Math.abs(e.screenX - newCities[num].positionX)
      let resY = Math.abs(e.screenY - newCities[num].positionY)
      setDisplayPin('block');
      setPinLeft(`${e.screenX -10}px`);
      setPinTop(`${e.screenY - 125}px`);
      if(resX <= 50 && resY <= 50){
        setResult("correct")
        setCorrect(correct + 1)
      } else {
        setPinLeftValid(`${newCities[num].positionX - 10}px`);
        setPinRightValid(`${newCities[num].positionY - 150}px`);
        setDisplayPinValid('block');
        setResult("wrong")
      }
      let scoreTmp = score - resX - resY
      if(scoreTmp > 0){
        setScore(scoreTmp)
      } else {
        setScore(0)
      }
      setClicked(false)
      setNum(num + 1)
    }
    window.removeEventListener('click', checkValidation)
  }

  useEffect(() => {
    window.addEventListener('click', checkValidation)
    // eslint-disable-next-line
  }, [citiesArr])

  const next = () => {
    setCitiesArr(newCities[num])
    setClicked(true)
    setResult(null)
    setDisplayPin('none')
    setDisplayPinValid('none');
  }

  const [displayPin, setDisplayPin] = useState('none')
  const [pinLeft, setPinLeft] = useState('0px')
  const [pinTop, setPinTop] = useState('0px')
  const [displayPinValid, setDisplayPinValid] = useState('none');
  const [pinLeftValid, setPinLeftValid] = useState('0px');
  const [pinRightValid, setPinRightValid] = useState('0px');

  return (
   <div className="App" style={{marginRight : "15px"}}>
    <img src={pin} alt="pin" style={{ position: "fixed", display: displayPin, left: pinLeft, top: pinTop, height: '20px', width: '20px' }} />
    <img src={pinValid} alt="Valid Pin" style={{ position: "fixed", display: displayPinValid, left: pinLeftValid, top: pinRightValid, height: '20px', width: '20px' }} />
    <h1 className="mb-5">FIND MAJOR CITY OF EUROPE</h1>
    <h3>How to play :</h3>
    <h5>1. Find exact location for target city</h5>
    <h5>2. Click the location</h5>
    <h5>3. See the result, and click next</h5>
    <h5>4. You will lose health as much as deviation</h5>
    <h5>5. The red pin is the correct answer</h5>
    <h2 className="mt-5">Your Health : {score}</h2>
    {citiesArr && score !== 0 && <h2 style={{color : "green"}}>Find : {citiesArr.name}</h2>}
    {result && score !== 0 && <h3>Your answer is {result}</h3>}
    {!clicked && score > 0 && <button className="btn btn-primary" onClick={next}>next</button>}
    {score === 0 && <h2 className="text-danger">Game over !</h2>}
    {score === 0 && <h2>You found {correct} city of europe !</h2>}
   </div>
  );
}

export default App;