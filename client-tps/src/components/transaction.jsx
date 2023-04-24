import Web3 from 'web3';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const MyTrx = () => {
    const [trx, setTrx] = useState('');
    const [nomorTPS, setNomorTPS] = useState('');
    const [infoTPS, setInfoTPS] = useState('');
    const [jumlahPemilih, setJumlahPemilih] = useState('');
    const [suaraPaslon, setSuaraPaslon] = useState('');
    const [jumlahSuara, setJumlahSuara] = useState('');
    const web3 = new Web3('http://localhost:8547');
    
    const getTransaction = async () => {
        const contract = new web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "uint16",
                        "name": "_nomorTPS",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string[4]",
                        "name": "_infoTPS",
                        "type": "string[4]"
                    },
                    {
                        "internalType": "uint16[2]",
                        "name": "_jumlahPemilih",
                        "type": "uint16[2]"
                    },
                    {
                        "internalType": "uint16[2]",
                        "name": "_suaraPaslon",
                        "type": "uint16[2]"
                    },
                    {
                        "internalType": "uint16[3]",
                        "name": "_jumlahSuara",
                        "type": "uint16[3]"
                    }
                ],
                "name": "storeVoteResult",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    }
                ],
                "name": "getHasilRekap",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint16",
                                "name": "nomorTPS",
                                "type": "uint16"
                            },
                            {
                                "internalType": "string[4]",
                                "name": "infoTPS",
                                "type": "string[4]"
                            },
                            {
                                "internalType": "uint16[2]",
                                "name": "jumlahPemilih",
                                "type": "uint16[2]"
                            },
                            {
                                "internalType": "uint16[2]",
                                "name": "suaraPaslon",
                                "type": "uint16[2]"
                            },
                            {
                                "internalType": "uint16[3]",
                                "name": "jumlahSuara",
                                "type": "uint16[3]"
                            }
                        ],
                        "internalType": "struct Rekapitulasi.HasilRekapTPS",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "hasilRekap",
                "outputs": [
                    {
                        "internalType": "uint16",
                        "name": "nomorTPS",
                        "type": "uint16"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ], '0x073271F5115B111a70093cC83bC02A99ffb4398c');
        const transaction = await contract.methods
        .getHasilRekap('0x9D265236D1016642f183b0f35323E6973Dc7f588').call()
        setTrx(transaction)
        console.log(trx)
        setNomorTPS(transaction.nomorTPS)
        setInfoTPS(transaction.infoTPS)
        setJumlahPemilih(transaction.jumlahPemilih)
        setSuaraPaslon(transaction.suaraPaslon)
        setJumlahSuara(transaction.jumlahSuara)
    }

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <Container>
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
                        <td><a>https://www.google.com/</a></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default MyTrx;