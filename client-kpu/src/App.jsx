import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/navbar';
import MyForm from './components/form';
import Login from './components/login';
import MyTrx from './components/transaction';
import Button from 'react-bootstrap/Button';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
        <MyNavbar/>
        <Login setAccounts={setAccounts} accounts={accounts}/>
        {accounts[0] ? (<MyForm accounts={accounts}/>) : (<div></div>)}
      </div>
  )
}

export default App
