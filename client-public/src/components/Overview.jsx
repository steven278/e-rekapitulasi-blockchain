import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import RegionTable from './RegionTable';
import ViewRecap from './ViewRecap';

const OverviewTable = () => {
    const [viewRecap, setViewRecap] = useState(false)
    return (
        <Container>
            <Row>
                {viewRecap == true && <ViewRecap/>}
                {viewRecap == false && <RegionTable recapState={setViewRecap} />}
            </Row>
        </Container>
    );
}

export default OverviewTable;