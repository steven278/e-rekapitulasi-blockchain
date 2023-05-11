import Web3 from 'web3';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import contractABI from './contractABI';

const MyTrx = () => {
    const [trx, setTrx] = useState('');
    const [isSubmitted, setIsSubmitted] = useState('');
    const [nomorTPS, setNomorTPS] = useState('');
    const [infoTPS, setInfoTPS] = useState('');
    const [jumlahPemilih, setJumlahPemilih] = useState('');
    const [suaraPaslon, setSuaraPaslon] = useState('');
    const [jumlahSuara, setJumlahSuara] = useState('');
    const [formImage, setFormImage] = useState('');
    const web3 = new Web3('http://localhost:8547');
    
    const getTransaction = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })
        console.log(accounts[0])
        const contract = new web3.eth.Contract(contractABI, '0x61A4D1363E39030A823986D53dDc09cc05af8d5C');
        const transaction = await contract.methods
        .getHasilRekap(accounts[0]).call()
        setTrx(transaction)
        setIsSubmitted(transaction.isSubmitted);
        console.log(transaction)
        setNomorTPS(transaction.nomorTPS)
        setInfoTPS(transaction.infoTPS)
        setJumlahPemilih(transaction.jumlahPemilih)
        setSuaraPaslon(transaction.suaraPaslon)
        setJumlahSuara(transaction.jumlahSuara)
        setFormImage('https://e-rekap.infura-ipfs.io/ipfs/'+ transaction.formImage)
    }

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <Container>
            {/* <h3>isSubmitted = {isSubmitted} </h3> */}
            <Table striped bordered hover className='mt-5'>
                <tbody>
                    <tr>
                        <th>Provinsi</th>
                        <td>{infoTPS[0]}</td>
                    </tr>
                    <tr>
                        <th>Kabupaten / Kota</th>
                        <td>{infoTPS[1]}</td>
                    </tr>
                    <tr>
                        <th>Kecamatan / Distrik</th>
                        <td>{infoTPS[2]}</td>
                    </tr>
                    <tr>
                        <th>Desa / Kelurahan</th>
                        <td>{infoTPS[3]}</td>
                    </tr>
                    <tr>
                        <th>Nomor TPS</th>
                        <td>{nomorTPS}</td>
                    </tr>
                    <tr>
                        <th>Pemilih Terdaftar</th>
                        <td>{jumlahPemilih[0]}</td>
                    </tr>
                    <tr>
                        <th>Pengguna Hak Pilih</th>
                        <td>{jumlahPemilih[1]}</td>
                    </tr>
                    <tr>
                        <th>Jumlah Suara Paslon 01</th>
                        <td>{suaraPaslon[0]}</td>
                    </tr>
                    <tr>
                        <th>Jumlah Suara Paslon 02</th>
                        <td>{suaraPaslon[1]}</td>
                    </tr>
                    <tr>
                        <th>Suara Sah</th>
                        <td>{jumlahSuara[0]}</td>
                    </tr>
                    <tr>
                        <th>Suara Tidak Sah</th>
                        <td>{jumlahSuara[1]}</td>
                    </tr>
                    <tr>
                        <th>Total Suara</th>
                        <td>{jumlahSuara[2]}</td>
                    </tr>
                    <tr>
                        <th>URL gambar Form C1</th>
                        <td><a href={formImage}>{formImage}</a></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default MyTrx;