import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import RegionTable from './RegionTable';
import ViewRecap from './ViewRecap';

const OverviewTable = () => {
    const [viewRecap, setViewRecap] = useState(false)
    const [regionId, setRegionId] = useState('');
    const [currentRegion, setcurrentRegion] = useState([]);
    useEffect(() => {
        console.log(currentRegion)
    }, [currentRegion])
    return (
        <Container className='mt-2'>
            {currentRegion[0] && <a onClick={() => window.location.reload(false)} href="#"> &lt;&lt; Back to Main Menu</a>}
            <h4 className="mt-4 page-title">HASIL REKAPITULASI PERHITUNGAN SUARA PEMILU PRESIDEN & WAKIL PRESIDEN RI 2019</h4>
            {currentRegion[0] && <div style={{textAlign: 'center', fontSize: '1.25em'}}>
                <span className='mx-2 text-secondary'>{currentRegion[0]} </span> <span> - </span>
                <span className='mx-2 text-secondary'>{currentRegion[1]} </span> <span> - </span>
                <span className='mx-2 text-secondary'>{currentRegion[2]} </span> <span> - </span>
                <span className='mx-2 text-secondary'>{currentRegion[3]} </span> <span> - </span>
                <span className='mx-2 text-secondary'>{currentRegion[4]}</span>
                </div>}
            <Row>
                {viewRecap == true && <ViewRecap regionId={regionId}/>}
                {viewRecap == false && 
                <RegionTable recapState={setViewRecap} 
                setRegionId={setRegionId} 
                regionId={regionId} 
                currentRegion={currentRegion} 
                setCurrentRegion={setcurrentRegion}
                />}
            </Row>
        </Container>
    );
}

export default OverviewTable;