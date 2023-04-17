import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/navbar';
import MyForm from './components/form';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <MyForm/>
    </div>
  )
}

export default App
