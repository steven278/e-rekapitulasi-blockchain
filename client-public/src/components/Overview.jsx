import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useState, useEffect } from 'react';
import fetchData from '../components/fetchData';

const OverviewTable = () => {
    const [dataToFetch, setDataToFectch] = useState({id: 'id_provinsi', nama: 'nama_provinsi', region: 'province'});
    const [region, setRegion] = useState([]);

    const fetchRegionDetail = async (id) => {
        console.log(id, typeof(id), id.length)
        if(id.length == 2){
            setDataToFectch({id: 'id_kota', nama: 'nama_kota', region: 'city'})
            console.log(dataToFetch)
        }
        try {
            const responseData = await fetchData(dataToFetch);
            setRegion(responseData);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchingData = async () => {
        try {
            const responseData = await fetchData(dataToFetch);
            setRegion(responseData);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchingData();
    }, [])
    return (
    <Container>
        <Row>
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
                            {/* <td><a onClick={fetchingData()}>{item.nama}</a></td> */}
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
        </Row>
    </Container>
    );
}

export default OverviewTable;