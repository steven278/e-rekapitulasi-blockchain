import Web3 from 'web3';
import { useState, useEffect, useRef } from 'react';
import { create } from 'ipfs-http-client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Contract } from 'web3-eth-contract';

const MyForm = () => {
    const web3 = new Web3('http://localhost:8547');
    // const [accounts, setAccounts] = useState([])
    // const[balance, setBalance] = useState(0);
    const [blocks, setBlocks] = useState('');
    const [transactions, setTransactions] = useState('');

    // const ipfs = create({url: "http://127.0.0.1:5002/api/v0"});

    const provinsiRef = useRef();
    const kabupatenKotaRef = useRef();
    const kecamatanDistrikRef = useRef();
    const desaKelurahanRef = useRef();
    const nomorTPSRef = useRef();
    const pemilihTerdaftarRef = useRef();
    const penggunaHakPilihRef = useRef();
    const paslonSatuRef = useRef();
    const paslonDuaRef = useRef();
    const suaraSahRef = useRef();
    const suaraTidakSahRef = useRef();
    const totalSuaraRef = useRef();

    const gambarFormRef = useRef();

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
    
    // web3.eth.getBlockNumber().then(console.log)
    // web3.eth.getBlockTransactionCount(1).then(console.log)
    // web3.eth.getBlock(1).then(console.log)
    // async function getAccounts() {
    //     const acc = await web3.eth.getAccounts(console.log);
    //     setAccounts(acc);
    // }
    // async function getBalance() {
    //     const bal = await web3.eth.getBalance(accounts[0]);
    //     setBalance(bal);
    // }
    // async function getBlocks() {
    //     const block = await web3.eth.getBlock(1231);
    //     const transaction = await web3.eth.getTransactionFromBlock('0x8cf2ff6fa93fc937e3e5cadff1f54d46b77484789e68bf7ebb2fd6f7614610e3', 0)
    //     //block 703 0x087b2389f5ed3be0697aa35f76f05441a963eb68ee376fd992f489a855fe75f1
    //     //trx yg ada transaksi deploy smart contract ada di block 703 , 1231
    //     // console.log(block);
    //     // console.log(transaction);
    //     // setBlocks(block);
    //     // setTransactions(transaction);
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const form = event.target;
        // const files = form[12].files;
        // if (!files || files.length === 0) {
        //     return alert("No files selected");
        // }
        // const file = files[0];
        // const result = await ipfs.add(file);

        const nomorTPS = nomorTPSRef.current.value;
        const infoTPS = [];
        const jumlahPemilih = [];
        const suaraPaslon = [];
        const jumlahSuara = [];
        infoTPS[0] = provinsiRef.current.value;
        infoTPS[1] = kabupatenKotaRef.current.value;
        infoTPS[2] = kecamatanDistrikRef.current.value;
        infoTPS[3] = desaKelurahanRef.current.value;
        
        jumlahPemilih[0] = pemilihTerdaftarRef.current.value;
        jumlahPemilih[1] = penggunaHakPilihRef.current.value;
        
        suaraPaslon[0] = paslonSatuRef.current.value;
        suaraPaslon[1] = paslonDuaRef.current.value;
        
        jumlahSuara[0] = suaraSahRef.current.value;
        jumlahSuara[1] = suaraTidakSahRef.current.value;
        jumlahSuara[2] = totalSuaraRef.current.value;

        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0])
        console.log(await contract.methods.hasilRekap('0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5').call());
        const trxResult = await contract.methods.storeVoteResult(nomorTPS, infoTPS, jumlahPemilih, 
            suaraPaslon,jumlahSuara).send({from: accounts[0]});
        console.log(await contract.methods.getHasilRekap('0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5').call());
        console.log(await contract.methods.hasilRekap('0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5').call());

        console.log(trxResult)
        
        // contract.methods.storeVoteResult(nomorTPS, infoTPS, jumlahPemilih, 
        // suaraPaslon,jumlahSuara).call({from: '0x18513FF9349286940DE321eCBa6e42980E843479'}).
        // then(console.log('ss')).catch(console.log('errorrrrrr'))
        
        // console.log(accounts, accounts.length);
        // let balance = await web3.eth.getBalance(accounts[0]);
        // console.log(balance);

        // let trxResult = await contract.methods.setResultVariable(28,5).send({from: accounts[0]});
        // console.log(await contract.methods.result().call());
        
        // console.log(await contract.methods.result().call());
    }

    useEffect(() => {
        // getAccounts();
        // getBalance();
        // getBlocks();
    }, []);
    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="mb-4" >
                        <Form.Label>Info TPS</Form.Label>
                        <Form.Control type="text" placeholder="Provinsi" className='mb-2'  ref={provinsiRef}/>
                        <Form.Control type="text" placeholder="Kabupaten / Kota" className='mb-2' ref={kabupatenKotaRef}/>
                        <Form.Control type="text" placeholder="Kecamatan / Distrik" className='mb-2' ref={kecamatanDistrikRef}/>
                        <Form.Control type="text" placeholder="Desa / Kelurahan" className='mb-2'ref={desaKelurahanRef}/>
                        <Form.Control type="number" placeholder="Nomor TPS" className='mb-2'ref={nomorTPSRef}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-4" >
                            <Form.Label>Data Pemilih</Form.Label>
                            <Form.Control type="number" placeholder="Pemilih Terdaftar" className='mb-2' ref={pemilihTerdaftarRef}/>
                            <Form.Control type="number" placeholder="Pengguna Hak Pilih" className='mb-2' ref={penggunaHakPilihRef}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-4" >
                            <Form.Label>Perolehan Suara</Form.Label>
                            <Form.Control type="number" placeholder="Paslon 01" className='mb-2' ref={paslonSatuRef}/>
                            <Form.Control type="number" placeholder="Paslon 02" className='mb-2' ref={paslonDuaRef}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-4" >
                            <Form.Label>Data Suara</Form.Label>
                            <Form.Control type="number" placeholder="Suara Sah" className='mb-2' ref={suaraSahRef}/>
                            <Form.Control type="number" placeholder="Suara Tidak Sah" className='mb-2' ref={suaraTidakSahRef}/>
                            <Form.Control type="number" placeholder="Total Suara" className='mb-2' ref={totalSuaraRef}/>
                        </Form.Group>
                    </Col>
                    <input type="file" name="imageForm" className="mb-3"/>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>    
            <h3>{blocks}</h3>
            <h3>{transactions}</h3>
        </Container>
    )
}

export default MyForm;