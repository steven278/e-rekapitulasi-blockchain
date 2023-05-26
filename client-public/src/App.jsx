import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import OverviewTable from './components/Overview';
import fetchData from './components/fetchData'
import dotenv from 'dotenv'

function App() {
  // const [provinces, setProvince] = useState([]);
  return (
    <div>
      <MyNavbar/>
      {/* <OverviewTable data={provinces}/> */}
      <OverviewTable/>
    </div>
  )
}

export default App
