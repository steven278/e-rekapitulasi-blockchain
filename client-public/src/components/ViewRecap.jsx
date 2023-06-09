import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const ViewRecap = ({regionId}) => {
    console.log(regionId, typeof(regionId))
    const [recapResult, setRecapResult] = useState([]);
    const [txnHash, setTxnHash] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/e-rekap/rekap/${regionId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setRecapResult(res.data)
            setTxnHash(res.txn_hash)
        })
        .then(data => console.log(data))
    }, [])
    return(
        <Container>
            <h4 className="mt-4">Data Pemilih dan Penggunaan Hak Pilih</h4>
            <h5>ID TPS: {regionId}</h5> 
            <Row>
                <Col>
                    <Table striped bordered hover className='mt-3'>
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="w-75">Uraian</th>
                                <th>Jumlah (L + P)</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td>Pemilih Terdaftar (DPT)</td>
                                <td>{recapResult[0]}</td>
                            </tr>
                            <tr>
                                <td>Pengguna Hak Pilih</td>
                                <td>{recapResult[1]}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Table striped bordered hover className='mt-3'>
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="w-75">Uraian</th>
                                <th>Suara Sah</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td>Paslon 01</td>
                                <td>{recapResult[2]}</td>
                            </tr>
                            <tr>
                                <td>Paslon 02</td>
                                <td>{recapResult[3]}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover className='mt-3'>
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="w-75">Uraian</th>
                                <th>Suara Sah</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td>Jumlah Seluruh Suara Sah</td>
                                <td>{recapResult[4]}</td>
                            </tr>
                            <tr>
                                <td>Jumlah Suara Tidak Sah</td>
                                <td>{recapResult[5]}</td>
                            </tr>
                            <tr>
                                <td>Jumlah Seluruh Suara Sah dan Tidak Sah</td>
                                <td>{recapResult[6]}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Table striped bordered hover className="mt-3">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="">Cek Rekapitulasi</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td>Cek Hash Transaksi</td>
                                <td><a href={`https://sepolia.etherscan.io/tx/${txnHash}`} target="_blank">Lihat Transaction Hash</a></td>
                            </tr>
                            <tr>
                                <td>Cek Wallet Address KPPS</td>
                                {recapResult[8] != '0x0000000000000000000000000000000000000000' 
                                ?  <td><a href={`https://sepolia.etherscan.io/address/${recapResult[8]}`} target="_blank"> Lihat Address KPPS</a></td>
                                :   <td><a href={`https://sepolia.etherscan.io/address/`} target="_blank"> Lihat Address KPPS</a></td>
                                }
                            </tr>
                            <tr>
                                <td>URL Form C1</td>
                                <td><a href={`https://e-rekap.infura-ipfs.io/ipfs/${recapResult[9]}`} target="_blank">Lihat form c1</a></td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            
        </Container>
    )
}

export default ViewRecap;