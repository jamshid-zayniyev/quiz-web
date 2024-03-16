import React, { useRef, useState } from 'react'
import "./quiz.css"
import { data } from '../../database/questions.db'


const Quiz = () => {

  let [index,setIndex] = useState(1)
  let [question,setQuestion] = useState(data[index-1])
  let [lock,setLock] = useState(false)
  let [score,setScore] = useState(0)
  let [result,setResult] = useState(false)

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  let option_arr = [Option1,Option2,Option3,Option4]


  const checkAns = (e,ans) =>{
    if(lock === false){
      if(ans === question.ans){
        e.target.classList.add('correct');
        setLock(true)
        setScore(prev=>prev+1)
      }
      else{
        e.target.classList.add('wrong');
        setLock(true)
        option_arr[question.ans-1].current.classList.add("correct")
      }
    }
  }


  const Next = () =>{
    if(data.length === index){
        setResult(true)
    }
    else{
      setIndex(++index)
      setQuestion(data[index-1])
      setLock(false)
  
      option_arr.map(option=>{
        option.current.classList.remove('correct')
        option.current.classList.remove('wrong')
        return 0
      })
    }

  }
  
  
  const Reset = () =>{
    setIndex(1)
    setQuestion(data[0])
    setLock(false)
    setResult(false)
    setScore(0)
  }


  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result ? <p>Your score is {score}</p> : 
        <>
        <h2>{index}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e)=>checkAns(e,1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>checkAns(e,2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>checkAns(e,3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>checkAns(e,4)}>{question.option4}</li>
        </ul>
        <button onClick={Next}>Next</button>
        <div className='index'>{index} of {data.length} questions</div>
        </>
        }
        {result ? <button className='reset' onClick={Reset}>Reset</button> : ''}
    </div>
  )
}

export default Quiz