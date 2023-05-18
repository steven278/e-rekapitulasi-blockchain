import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import OverviewTable from './components/Overview';
import fetchData from './components/fetchData'

function App() {
  const [provinces, setProvince] = useState([]);
  const dataToFetch = {id: 'id_provinsi', nama: 'nama_provinsi', region: 'province'}
  return (
    <div>
      <MyNavbar/>
      {/* <OverviewTable data={provinces}/> */}
      <OverviewTable data={dataToFetch}/>
    </div>
  )
}

export default App
