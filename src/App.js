import React, { lazy } from 'react'
const Quiz = lazy(()=>import('./components/quiz/quiz'))


const App = () => {
  return (
    <div>
      <Quiz/>
    </div>
  )
}

export default App