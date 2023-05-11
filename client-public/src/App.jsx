import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MyNavbar/>
    </div>
  )
}

export default App
