import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/MyNavbar';
import MyForm from './components/Form';
import Login from './components/Login';
import Footer from './components/MyFooter';
import Button from 'react-bootstrap/Button';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="App">
        <MyNavbar accounts={accounts}/>
        {accounts[0] ? (<MyForm accounts={accounts} />) : <Login setAccounts={setAccounts} accounts={accounts}/>}
        <Footer/>
    </div>
  )
}

export default App
