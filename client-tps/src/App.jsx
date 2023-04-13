import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
    </div>
  )
}

export default App
