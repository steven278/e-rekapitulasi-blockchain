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
  return (
    <div className="App">
        <MyNavbar accounts={accounts}/>
        {accounts[0] ? (<RegisterForm accounts={accounts} />) : <Login setAccounts={setAccounts} accounts={accounts}/>}
        <MyFooter/>
    </div>
  )
}

export default App
