import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
const RegionTable = ({recapState, setRegionId, regionId}) => {
    const [dataToFetch, setDataToFectch] = useState({id: 'id_provinsi', nama: 'nama_provinsi', region: 'province'});
    const [region, setRegion] = useState([]);
    

    const fetchRegionDetail = async (id) => {
        if(id.length == 2){
            setDataToFectch({id: 'id_kota', nama: 'nama_kota', region: 'city'})
        }else if(id.length == 4){
            setDataToFectch({id: 'id_kecamatan', nama: 'nama_kecamatan', region: 'district'})
        }else if(id.length == 6){
            setDataToFectch({id: 'id_kelurahan', nama: 'nama_kelurahan', region: 'subdistrict'})
        }else if(id.length == 10){
            setDataToFectch({id: 'id_TPS', nama: 'no_TPS', region: 'tps'})
        }else{
            recapState(true)
        }
        setRegionId(id)
    }
    useEffect(() => {
        fetch(`http://localhost:5000/e-rekap/region/${dataToFetch.region}/${regionId}`)
        .then(response => response.json())
        .then(json => json.data.map((curr) => ({
            id: curr[dataToFetch.id],
            nama: curr[dataToFetch.nama]
        })))
        .then(res => setRegion(res))
    }, [dataToFetch])

    return (
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>Wilayah</th>
                    <th>Paslon 01</th>
                    <th>Paslon 02</th>
                </tr>
            </thead>
            <tbody>
                {region.map(item => (   
                    <tr>
                        <td><a href="#" onClick={(e) => {
                            e.preventDefault();
                            fetchRegionDetail(item.id)}
                            }>{item.nama}</a></td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default RegionTable;