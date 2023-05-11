import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import OverviewTable from './components/Overview';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MyNavbar/>
      <OverviewTable/>
    </div>
  )
}

export default App
