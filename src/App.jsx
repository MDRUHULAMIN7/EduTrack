import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div>
     <h1 className='text-4xl text-red-500'>React + Vite App</h1>
     <p>
       This is a simple React app built with Vite. Click the button below to increment a counter.
     </p>
     <button onClick={() => setCount(count + 1)}>Increment Count</button>
     <h2>Count: {count}</h2>
   </div>
    </>
  )
}

export default App
