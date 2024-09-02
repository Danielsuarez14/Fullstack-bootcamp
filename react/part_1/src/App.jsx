import { useEffect, useState } from 'react'
import './App.css'
import { memes } from './components/memes'
import { Button } from './components/button'




function App() {

  const [counter, setCounter] = useState(Array(memes.length).fill(0))
  const [percentage, setPercentage] = useState(Array(memes.length).fill(0))
  const [next, setNext] = useState(0)

  const point = 1
  const [pointsGood, setPointsGood]
    = useState(Array(memes.length).fill(0))
  const [pointsNeutral, setPointsNeutral]
    = useState(Array(memes.length).fill(0))
  const [pointsBad, setPointsBad]
    = useState(Array(memes.length).fill(0))

  const updateGood = () => {
    setPointsGood((prevPointsGood) => {
      const updateGoodPoints = [...prevPointsGood]
      updateGoodPoints[next] += point
      return updateGoodPoints

    })
  }
  const updateNeutral = () => {
    setPointsNeutral((prevPointsNeutral) => {
      const updateNeutralPoints = [...prevPointsNeutral]
      updateNeutralPoints[next] += point
      return updateNeutralPoints

    })
  }
  const updateBad = () => {
    setPointsBad((prevPointsBad) => {
      const updateBadPoints = [...prevPointsBad]
      updateBadPoints[next] += point
      return updateBadPoints

    })
  }

  const counterTotal = () => {
    setCounter((prevCounter) => {
      const updateCounter = [...prevCounter]
      updateCounter[next] += point
      return updateCounter
    }
    )
  }

  const totalPercentage = () => {
    if (pointsGood[next] === 0){
      setPercentage((prevCounter) => {
        const updateCounter = [...prevCounter]
        updateCounter[next] += 0
        return updateCounter
    })
    }else{
    setPercentage((prevPercentage) => {
      const updatePercentage = [...prevPercentage]
      const percentageRounded = ((pointsGood[next]*100)/(counter[next])).toFixed()
      updatePercentage[next] = percentageRounded
      return updatePercentage
    }
    )
  }
}
  const handleNext = () => {
    setNext((prevNext) => (prevNext+1) % memes.length)

  }
  const handleBack = () => {
    setNext((prevBack => (prevBack-1 + memes.length) % memes.length))

  }

  useEffect(()=>{
    totalPercentage();
  },[pointsGood, counter, next])

  const handleGood = () => {
    totalPercentage()
    updateGood()
    counterTotal()
  }
  const handleNeutral = () => {
    totalPercentage()
    updateNeutral()
    counterTotal()
  }
  const handleBad = () => {
    totalPercentage()
    updateBad()
    counterTotal()
  }

  const actualMeme = memes[next]


  return (
    <div className='container'>
      <div>
        <img
          className='image'
          src={actualMeme.url}
          alt={actualMeme.name}

        />
      </div>
      <div>
        <p>Do you like this meme?</p>
        <div className='division' >
          <Button handleClick={handleGood} text='Yeah' />

          <Button handleClick={handleNeutral} text='More or less' />

          <Button handleClick={handleBad} text='No' />

        </div>
        <div className='numbers'>
          <p className='number' >{pointsGood[next]}</p>
          <p className='number'>{pointsNeutral[next]}</p>
          <p className='number'>{pointsBad[next]}</p>
        </div>
      </div>
      <div >
        <p>Total answers: {counter[next]}</p>
        <p>Positive percentage : {percentage[next]}%</p>
      </div>
      <div className='division'>
        <Button handleClick={handleBack} text='Back' />
        <Button handleClick={handleNext} text='Next' />
      </div>
    </div>
  )
}

export default App
