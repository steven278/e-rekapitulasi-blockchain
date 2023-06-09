import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Button from 'react-bootstrap/Button';
import MyNavbar from './components/MyNavbar';
import Login from './components/Login';
import MyFooter from './components/MyFooter';
import RegisterForm from './components/RegisterForm';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
        <MyNavbar accounts={accounts}/>
        {accounts[0] && !show ? (<RegisterForm accounts={accounts} />) :
        <Login setAccounts={setAccounts}
        accounts={accounts}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
        />}
        <MyFooter/>
    </div>
  )
}

export default App
