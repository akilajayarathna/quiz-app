import { useState } from 'react'
import './App.css'
import QuizApp from './QuizApp'
import AnkiCards from './AnkiCards'

function App() {

  const [mode, setMode] = useState(null)

  const wrapperClass =
  'min-h-screen bg-green-50 flex items-center justify-center flex-col'


  if(mode === 'mcq'){

    return <QuizApp onExit={() => setMode(null)} />

  }

  if(mode === 'anki'){

    return <AnkiCards onExit={() => setMode(null)} />

  }


  return (

    <div className={wrapperClass}>

      <h1 className='text-4xl font-bold mb-16'>
        Choose a Study Mode
      </h1>

      <div className='flex gap-8'>

        <button
          onClick={() => setMode('mcq')}
          className='bg-white hover:bg-green-100 p-10 rounded-2xl text-2xl font-bold shadow-md transition w-64'
        >
          MCQ Quiz
        </button>

        <button
          onClick={() => setMode('anki')}
          className='bg-white hover:bg-green-100 p-10 rounded-2xl text-2xl font-bold shadow-md transition w-64'
        >
          Anki Cards
        </button>

      </div>

    </div>

  )

}

export default App