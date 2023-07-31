import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import OverviewTable from './components/Overview';
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <MyNavbar/>
      <OverviewTable/>
      <Footer/>
    </div>
  )
}

export default App
