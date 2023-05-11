import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MyNavbar from './components/navbar';
import MyForm from './components/form';
import Login from './components/login';
import MyTrx from './components/transaction';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar/>
        <Routes>
          <Route path="" element={<MyTrx/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/form" element={<MyForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
