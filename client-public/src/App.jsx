import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import OverviewTable from './components/Overview';
import Footer from './components/Footer'
import fetchData from './components/fetchData'
import dotenv from 'dotenv'

function App() {
  // const [provinces, setProvince] = useState([]);
  return (
    <div>
      <MyNavbar/>
      {/* <OverviewTable data={provinces}/> */}
      <OverviewTable/>
      <Footer/>
    </div>
  )
}

export default App
