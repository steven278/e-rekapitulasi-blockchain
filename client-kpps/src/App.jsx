import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/MyNavbar';
import MyForm from './components/MyForm';
import Login from './components/Login';
import Footer from './components/MyFooter';
import Button from 'react-bootstrap/Button';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
        <MyNavbar accounts={accounts}/>
        {accounts[0] && !show ? (<MyForm accounts={accounts} />) : 
        <Login setAccounts={setAccounts}
        accounts={accounts}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
        />}
        <Footer/>
    </div>
  )
}

export default App
