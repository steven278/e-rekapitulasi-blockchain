import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OverviewTable = () => {
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
                    <tr>
                        <td><a href="">tes</a></td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </Row>
    </Container>
    );
}

export default OverviewTable;