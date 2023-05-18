import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useState, useEffect } from 'react';
import fetchData from '../components/fetchData';

const OverviewTable = (props) => {
    const [dataToFetch, setDataToFectch] = useState([]);
    console.log(props)
    // setDataToFectch(props.data)
    const [region, setRegion] = useState([]);
    const fetchingData = async () => {
        try {
            const responseData = await fetchData(dataToFetch);
            // setProvince(responseData);
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
                    {/* {props.data.map(item => (   
                        <tr>
                            <td><a href={item.id}>{item.nama}</a></td>
                            <td>10</td>
                            <td>10</td>
                        </tr>
                    ))} */}
                </tbody>
            </Table>
        </Row>
    </Container>
    );
}

export default OverviewTable;