import { useState, useEffect } from 'react'
import './App.css'
import securityQuestions from "./data/securityQuestions.json";

const questions = securityQuestions;


function QuizApp() {
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [score,setScore] = useState(0)
  const [isFinished,setIsFinished] = useState(false)
  const [timeLeft,setTimeLeft] = useState(20)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(s => {
        if(s===1){
              if(currentQuestion === questions.length-1){
                setIsFinished(true)
              }
              else{
                setCurrentQuestion(c => c+1)
              }
          return 20
        }
        else{
          return s-1
        }
      }
        )
    },1000)
    return () => {
      clearInterval(interval)
    }
  },[currentQuestion])

 const handleAnswer = (option) =>{
              if (option === questions[currentQuestion].answer){
                setScore(sc => sc+1)
              }
              if(currentQuestion === questions.length-1){
                setIsFinished(true)
              }
              else{
                setCurrentQuestion(c => c+1)
              }
              setTimeLeft(20)
  }

  const wrapperClass = 'min-h-screen bg-green-50 flex items-center justify-center flex-col'
  const circleClass = 'bg-green-300 w-32 h-32 rounded-full text-white font-extrabold flex items-center justify-center border-4 border-green-200 m-20'

  return(
    isFinished ? (
      <div className={wrapperClass}>
        <h1 className='text-4xl font-bold'>Your Score: </h1>
        <p className={`${circleClass} text-3xl`}>{score}/{questions.length}</p>
      </div>
    ) :
    (
      <div className={wrapperClass}>
        <div className='bg-white p-20 rounded-2xl'>
          <h2 className='text-4xl font-bold'>{questions[currentQuestion].question}</h2>
          <ul className='py-10'>
            {questions[currentQuestion].options.map((option,index) => (
              <li key={index} className='pb-3 text-2xl'>{index +1 }.{''} <button className='bg-gray-200 hover:bg-green-300 transition duration-300 py-3 px-10 rounded-2xl' onClick={() => handleAnswer(option)}>{option}</button></li>
            ))}
          </ul>
          <div className={`${circleClass} flex-col`}>
            <span className='text-3xl font-extrabold'>{timeLeft}s</span>
            <span className='text-xs font-medium'>left</span>
          </div>
        </div>
      </div>
    )
  )

}

export default QuizApp
