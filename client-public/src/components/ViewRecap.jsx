import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
const ViewRecap = ({regionId}) => {
    console.log(regionId, typeof(regionId))
    const [recapResult, setRecapResult] = useState([]);
    const [txnHash, setTxnHash] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/e-rekap/rekap/${regionId}`)
        .then(response => response.json())
        .then(res => {
            setRecapResult(res.data)
            setTxnHash(res.txn_hash)
        })
        fetch(`http://localhost:5000/e-rekap/rekap/110101200103`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json; charset=utf-8',
            // },
            body: { txn_hash: "0x4eb694c8fb8b4a41ee6497c58f37f15d2b90bc461736514d119ac6f3ae341936" }
        })
        .then(data => console.log(data))
    }, [])
    return(
        <Container>
            <h3 className="mt-4">Data Pemilih dan Penggunaan Hak Pilih</h3>
            <h5>ID TPS: {regionId}</h5> 
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
            <h4>Transaction Hash on Etherscan</h4>
            <a href={`https://sepolia.etherscan.io/tx/${txnHash}`} target="_blank">Transaction Hash</a>
            <h4>KPPS Wallet Address on Etherscan</h4>
            <a href={`https://sepolia.etherscan.io/address/${recapResult[8]}`} target="_blank">Address KPPS</a>
            <h4>URL Form C1 on IPFS</h4>
            <a href={`https://e-rekap.infura-ipfs.io/ipfs/${recapResult[9]}`} target="_blank">View form c1</a>
        </Container>
    )
}

export default ViewRecap;