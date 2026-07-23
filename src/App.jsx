import { useState, useEffect } from 'react'
import './App.css'
import questions from './data/securityQuestions.json'

function QuizApp() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)


  useEffect(() => {

    const interval = setInterval(() => {

      setTimeLeft(time => {

        if(time === 1){

          nextQuestion()

          return 10
        }

        return time - 1

      })

    },1000)


    return () => clearInterval(interval)

  },[currentQuestion])


  const nextQuestion = () => {

    setSelectedAnswer(null)
    setShowResult(false)

    if(currentQuestion === questions.length - 1){

      setIsFinished(true)

    }
    else{

      setCurrentQuestion(q => q + 1)

    }

  }



  const handleAnswer = (option) => {

    if(showResult) return


    setSelectedAnswer(option)
    setShowResult(true)


    if(option === questions[currentQuestion].answer){

      setScore(score => score + 1)

    }


    setTimeout(() => {

      nextQuestion()

      setTimeLeft(10)

    },2000)

  }



  const getOptionClass = (option) => {


    if(!showResult){
      return "bg-gray-200 hover:bg-green-300"
    }


    if(option === questions[currentQuestion].answer){

      return "bg-green-500 text-white"

    }


    if(option === selectedAnswer){

      return "bg-red-500 text-white"

    }


    return "bg-gray-200"

  }



  const wrapperClass =
  'min-h-screen bg-green-50 flex items-center justify-center flex-col'


  const circleClass =
  'bg-green-300 w-32 h-32 rounded-full text-white font-extrabold flex items-center justify-center border-4 border-green-200 m-20'



  return (

    isFinished ?

    (

      <div className={wrapperClass}>

        <h1 className='text-4xl font-bold'>
          Your Score:
        </h1>

        <p className={`${circleClass} text-3xl`}>
          {score}/{questions.length}
        </p>

      </div>

    )

    :

    (

      <div className={wrapperClass}>


        <div className='bg-white p-20 rounded-2xl'>


          <h2 className='text-4xl font-bold'>
            {questions[currentQuestion].question}
          </h2>



          <ul className='py-10'>


            {
            questions[currentQuestion].options.map((option,index)=>(


              <li 
                key={index}
                className='pb-3 text-2xl'
              >

                <button

                  disabled={showResult}

                  className={`
                    ${getOptionClass(option)}
                    transition duration-300
                    py-3 px-10 rounded-2xl
                    w-full text-left
                  `}

                  onClick={()=>handleAnswer(option)}

                >

                  {index+1}. {option}

                </button>


              </li>


            ))
            }


          </ul>



          <div className={`${circleClass} flex-col`}>

            <span className='text-3xl font-extrabold'>
              {timeLeft}s
            </span>

            <span className='text-xs font-medium'>
              left
            </span>

          </div>


        </div>


      </div>

    )

  )

}

export default QuizApp;