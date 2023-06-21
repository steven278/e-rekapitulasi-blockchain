import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
const RegionTable = ({recapState, setRegionId, regionId, currentRegion, setCurrentRegion}) => {
    const [dataToFetch, setDataToFectch] = useState({id: 'id_provinsi', nama: 'nama_provinsi', region: 'province'});
    const [region1, setRegion1] = useState([]);
    const [region2, setRegion2] = useState([]);
    

    const fetchRegionDetail = async (id, nama) => {
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
        setCurrentRegion(current => [...current, nama])
    }
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_PROTOCOL_DOMAIN}${import.meta.env.VITE_SERVER_PORT}/e-rekap/region/${dataToFetch.region}/${regionId}`)
        .then(response => response.json())
        .then(json => json.data.map((curr) => ({
            id: curr[dataToFetch.id],
            nama: curr[dataToFetch.nama]
        })))
        .then(res => {
            const middleIndex = Math.ceil(res.length / 2);
            const column1Data = res.slice(0, middleIndex);
            const column2Data = res.slice(middleIndex);
            setRegion1(column1Data);
            setRegion2(column2Data);
        })
    }, [dataToFetch])

    return (
        <Row>
            <Col>
                <Table striped bordered hover className='mt-3 region-table rounded'>
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Wilayah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {region1.map(item => (   
                            <tr>
                                <td><a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    fetchRegionDetail(item.id, item.nama)}
                                    }>{item.nama}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Col>
                <Table striped bordered hover className='mt-3 region-table' >
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Wilayah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {region2.map(item => (   
                            <tr>
                                <td><a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    fetchRegionDetail(item.id, item.nama)}
                                    }>{item.nama}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default RegionTable;