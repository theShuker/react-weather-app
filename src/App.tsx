import { useEffect } from 'react'
import { useState } from 'react'
import Weather from './components/WeatherWidget'




function App() {
  const [error, setError] = useState(null)

  useEffect(() => {
    
  })

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Weather />
    </div>
  )
}

export default App
