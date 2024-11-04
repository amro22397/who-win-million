import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';
import { data } from './components/constants';

const App = () => { 

  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");

  const [quizFinished, setQuizFinished] = useState(false);


  



  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" }
      ].reverse(),
    []
  );


  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);



  return (
    <div className='app'>
      {!username ? (
        <Start setUsername={setUsername} />
      ): (
        <>
        <div className="main">
        {quizFinished ? (
          <div className='endText-div'>
          <h1 className="endText">You Win $ 1000</h1>

          <button className="again-btn" onClick={() => {
            setQuestionNumber(1);
            setTimeOut(false);
            setQuizFinished(false)
          }}>Play again</button>
          </div>
        )
        :timeOut ? (
          <div className='endText-div'>
          <h1 className="endText">You earned: {earned}</h1>

          <button className="again-btn" onClick={() => {
            setTimeOut(false);
          }}>Retry</button>
          </div>
        ) : (
          <>
          <div className="top">
          <div className="timer">
          <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
          </div>
        </div>
        <div className="bottom">
          <Trivia data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                    setQuizFinished={setQuizFinished} />
        </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map(m => (
            <li
            className={
              questionNumber === m.id
                ? "moneyListItem active"
                : "moneyListItem"
            }
          >
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
        </>
      )}
      
    </div>
  )
}

export default App
