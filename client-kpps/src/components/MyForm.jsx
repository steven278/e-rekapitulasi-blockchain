import { useState, useEffect, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormModal from './FormModal'

// import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import contractABI from './contractABI';

import { create, CID } from "ipfs-http-client";
import {Buffer} from 'buffer';

// const web3 = new Web3(new Web3.providers.HttpProvider( `https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940`));
const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_PROVIDER));
// const web3 = new Web3(new Web3.providers.HttpProvider( `https://eth-sepolia.g.alchemy.com/v2/XIL9z6I2wgDrXCG0Og0BDkW1VwbnmrwP`));

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

// Creating a Contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

const projectId = import.meta.env.VITE_INFURA_IPFS_PROJECT_ID; //project id = api key infura ipfs
const projectSecret = import.meta.env.VITE_INFURA_IPFS_PROJECT_SECRET // project secret = api key secret infura ipfs

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const MyForm = ({accounts}) => {
    const [formData, setFormData] = useState({
        tps_id: '',
        pemilihTerdaftar: '',
        penggunaHakPilih: '',
        suaraPaslon1: '',
        suaraPaslon2: '',
        jumlahSeluruhSuaraSah: '',
        jumlahSuaraTidakSah: '',
        jumlahSuaraSahDanTidakSah: '',
    })
    const [formImage, setFormImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');

    const [trxResult, setTrxResult] = useState({
        blockHash: '',
        blockNumber: 0,
        contractAddress: null,
        cumulativeGasUsed: 0,
        effectiveGasPrice: 0,
        from: "",
        gasUsed: 0,
        logs: [],
        logsBloom: "",
        status: false,
        to: "",
        transactionHash: "",
        transactionIndex: 0,
        type: ""
    });
    const [txHash , setTxHash] = useState('')
    const [trxError, setTrxError] = useState(null);

    //loader state
    const [load, setLoad] = useState(false)
    //loader handler
    const handleLoadClose = () => setLoad(false);
    const handleLoadShow = () => setLoad(true);

    //modal state
    const [show, setShow] = useState(false);

    // modal handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormImage(file)
        // setFormData((prevData) => ({
        //     ...prevData,
        //     formImage: file
        // }));
        setFileError('')
    
        if (file) {
            const fileType = file.type;
            if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
                setFileError('Please select a PNG or JPEG file.');
            }
        }
    };
    const validateForm = (data) => {
        setErrors({})
        const errors = {};
        if(data.tps_id.length != 12){
            errors.tps = "ID TPS harus terdiri dari 12 digit"
        }
        if(parseInt(data.pemilihTerdaftar) > 300){
            errors.pemilihTerdaftar = "jumlah pemilih terdaftar tidak boleh melebihi 300";
        }
        if(data.penggunaHakPilih > data.pemilihTerdaftar){
            errors.penggunaHakPilih = "pengguna hak pilih tidak boleh melebihi pemilh terdaftar"
        }
        if((parseInt(data.suaraPaslon1) + parseInt(data.suaraPaslon2)) > data.penggunaHakPilih){
            errors.suaraPaslon2 = "jumlah suara paslon 1 dan 2 tidak boleh melebihi pengguna hak pilih"
        }
        if(data.jumlahSeluruhSuaraSah != (parseInt(data.suaraPaslon1) + parseInt(data.suaraPaslon2))){
            errors.jumlahSeluruhSuaraSah = "jumlah suara sah harus sama dengan jumlah suara paslon 1 dan 2";
        }
        if(data.jumlahSuaraTidakSah != (parseInt(data.penggunaHakPilih) - parseInt(data.jumlahSeluruhSuaraSah))){
            errors.jumlahSuaraTidakSah = "jumlah suara tidak sah harus sama dengan (pengguna hak pilih - suara sah)";
        }
        if(data.jumlahSuaraSahDanTidakSah != data.penggunaHakPilih){
            errors.jumlahSuaraSahDanTidakSah = "jumlah seluruh suara sah dan tidak sah harus sama dengan jumlah pengguna hak pilih"
        }
        return errors;
    }
    const setModalData = (receipt) => {
        setTrxResult(receipt) 
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0 && fileError === '') {
            try{
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('wuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuwww')
                console.log(import.meta.env.INFURA_IPFS_PROJECT_ID)
                console.log(projectId, projectSecret)
                const ipfsResult = await client.add(formImage)
                console.log('miaaaaaaaaaaaaaoooooooooo')
                const encoded = contract.methods.storeVoteResult(
                    formData.tps_id, formData.pemilihTerdaftar, formData.penggunaHakPilih, formData.suaraPaslon1, 
                    formData.suaraPaslon2, formData.jumlahSeluruhSuaraSah,
                    formData.jumlahSuaraTidakSah, formData.jumlahSuaraSahDanTidakSah, ipfsResult.path).encodeABI();
                // const estimatedGas = await web3.eth.estimateGas({
                //     from: accounts[0],
                //     to: contractAddress,
                //     data: encoded
                // });
                // console.log(estimatedGas)
                const tx = {
                    from: accounts[0],
                    to: contractAddress,
                    data: encoded,
                    gas: '120105'
                    // gas: estimatedGas.toString(),
                    // gasPrice: "0"
                }
                const txn_hash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [tx]
                })
                setTxHash(txn_hash)
                handleLoadShow()
                handleShow()
                let interval = setInterval(() => {
                    console.log('luarrr')
                    web3.eth.getTransactionReceipt(txn_hash, async (err, receipt) => {
                        console.log('tengaahhhh')
                        if(receipt) {
                            // Clear interval
                            clearInterval(interval)
                            console.log("Gotten receipt")
                            if (receipt.status === true) {
                                console.log(receipt)
                                const tpsId = formData.tps_id.toString();
                                const res = await axios.put(`${import.meta.env.VITE_SERVER_PROTOCOL_DOMAIN}${import.meta.env.VITE_SERVER_PORT}/e-rekap/rekap/${tpsId}`, {txn_hash});
                                console.log(res)
                            } else if (receipt.status === false) {
                                console.log("Tx failed")
                            }
                            setModalData(receipt)
                            console.log(load)
                            handleLoadClose()
                            console.log(load)
                            console.log(receipt)
                            console.log(trxResult)
                            
                        }
                    })
                }, 6000)
                console.log(load)
            }catch(err){
                console.log(err)
                setTrxError(err);
            }
        } else {
            console.log('form is not valid')
            // Form is invalid, display validation errors
            setErrors(validationErrors);
        }
    }

    

    return (
        <Container className="mt-4">
            <h3 style={{textAlign: 'center'}}>Form Input Hasil Rekapitulasi Perhitungan Suara</h3>
            {/* <Button onClick={connectToMetaMask} className="mb-3">Connect to MetaMask</Button> */}
            {/* <h3>Account balance: {location.state.balance} Wei</h3>
            <h3>Account address: {location.state.address} </h3> */}
            {/* <h3>{!client && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}</h3> */}
            <Form onSubmit={handleSubmit} method="post"  encType="multipart/form-data" className="mt-4" id='rekap-form'>
                <Row>
                    <Col className="form-col">
                        
                        <h5>Info TPS</h5>
                        <Form.Group className="mt-4" >
                            <Form.Label>ID TPS</Form.Label>
                            <Form.Control type="number" placeholder="0" className='mb-2' required
                            name="tps_id"
                            value = {formData.tps_id}
                            onChange = {handleChange} />
                            {errors.tps && <span className="error">{errors.tps}</span>}
                        </Form.Group>
                    </Col>
                    <Col className='form-col'>
                        <h5>Data Pemilih</h5>
                        <Form.Group className="mt-4">
                            {/* <Form.Label>Data Pemilih</Form.Label> */}
                            <Form.Label>Pemilih Terdaftar</Form.Label>
                            <Form.Control type="number" placeholder="0" className='mb-2'  required 
                            name="pemilihTerdaftar"
                            value = {formData.pemilihTerdaftar}
                            onChange = {handleChange}/>
                            {errors.pemilihTerdaftar && <span className="error">{errors.pemilihTerdaftar}</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pengguna Hak Pilih</Form.Label>
                            <Form.Control type="number" placeholder="0" className=''  required 
                            name="penggunaHakPilih"
                            value = {formData.penggunaHakPilih}
                            onChange = {handleChange}/>
                            {errors.penggunaHakPilih && <span className="error">{errors.penggunaHakPilih}</span>}
                        </Form.Group>
                    </Col>
                    <Col className="form-col">
                        <h5>Perolehan Suara Sah</h5>
                        <Form.Group className="mt-4" >
                            <Form.Label>Paslon 01</Form.Label>
                            <Form.Control type="number" placeholder="0" className='mb-2'  required
                            name="suaraPaslon1"
                            value = {formData.suaraPaslon1}
                            onChange = {handleChange}/>
                            {errors.suaraPaslon2 && <span className="error">{errors.suaraPaslon2}</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Paslon 02</Form.Label>
                            <Form.Control type="number" placeholder="0" className=''  required
                            name="suaraPaslon2"
                            value = {formData.suaraPaslon2}
                            onChange = {handleChange}/>
                            {errors.suaraPaslon2 && <span className="error">{errors.suaraPaslon2}</span>}
                            </Form.Group>
                    </Col>
                    <Col className="form-col">
                        <h5>Data Suara</h5>
                        <Form.Group className="mt-4">
                            <Form.Label>Suara Sah</Form.Label>
                            <Form.Control type="number" placeholder="0" className='mb-2' required
                            name="jumlahSeluruhSuaraSah"
                            value = {formData.jumlahSeluruhSuaraSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSeluruhSuaraSah && <span className="error">{errors.jumlahSeluruhSuaraSah}</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Suara Tidak Sah</Form.Label>
                            <Form.Control type="number" placeholder="0" className='mb-2' required
                            name="jumlahSuaraTidakSah"
                            value = {formData.jumlahSuaraTidakSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSuaraTidakSah && <span className="error">{errors.jumlahSuaraTidakSah}</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Total Suara Sah & Tidak Sah</Form.Label>
                            <Form.Control type="number" placeholder="0" className='' required
                            name="jumlahSuaraSahDanTidakSah"
                            value = {formData.jumlahSuaraSahDanTidakSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSuaraSahDanTidakSah && <span className="error">{errors.jumlahSuaraSahDanTidakSah}</span>}
                        </Form.Group>
                    </Col>
                    {/* <input type="file" name="formImage" className="mb-3 mt-4" required
                    onChange={handleFileChange}/> */}
                    <div className="mb-3 mt-4 upload-image-wrapper">
                        <h5>Upload form C1</h5>
                        <input name="formImage" className="form-control" type="file" id="formFile" required onChange={handleFileChange}/>
                        {fileError && <span className="error">{fileError}</span>}
                    </div>
                </Row>
                <Row className="submit-form-wrapper mt-3 mb-4">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Row>

            </Form>   
            <FormModal load={load} show={show} trxResult={trxResult} txHash={txHash} handleClose={handleClose}/>
        </Container>
    )
}

export default MyForm;


            // console.log(accounts)
            // const data = new FormData(); //FormData interface provides a way to easily construct a set of key/value
            // for (const key in formData) {
            //     if (formData.hasOwnProperty(key)) {
            //         data.append(`${key}`,`${formData[key]}`);
            //     }
            // }
            // data.append("formImage",formImage);
            // data.append("accounts", accounts);
            // const req = window.ethereum.request({
            //      method: 'eth_sendTransaction',
            //      params:
            // })
            // fetch('http://localhost:5000/e-rekap/rekap/', {
            //     method: 'POST',
            //     body: data
            // })
            // .then(response => response.json())
            // .then(json => console.log(json))
            //     fetch(`http://localhost:5000/e-rekap/region/${dataToFetch.region}/${regionId}`)
            // .then(response => response.json())
            // .then(json => json.data.map((curr) => ({
            //     id: curr[dataToFetch.id],
            //     nama: curr[dataToFetch.nama]
            // })))
            // .then(res => setRegion(res))
//----------------------------------------------------------------------------------------------------------------------------

            // const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0])

            // web3.eth.accounts.signTransaction(tx, "2e100ec56bfa513f173915f1d3c71b4013c446f7ff50bed69580e383d43e67f0").then(signed => {
            //     web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
            // });
            
            // console.log(await contract.methods.hasilRekap('0x9D265236D1016642f183b0f35323E6973Dc7f588').call());
            // const isUnlocked = await web3.eth.personal.unlockAccount("0x9D265236D1016642f183b0f35323E6973Dc7f588", "testaccount1", 600)
            // console.log(isUnlocked);
            // web3.eth.personal.unlockAccount("0x9D265236D1016642f183b0f35323E6973Dc7f588", "testaccount1!", 6000)
            // .then(console.log('Account unlocked!'));
            // const trxResult = await contract.methods.storeVoteResult(nomorTPS, infoTPS, jumlahPemilih, 
            //     suaraPaslon,jumlahSuara).send({from: location.state.address});

            // console.log(await contract.methods.getHasilRekap('0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5').call());
            // console.log(await contract.methods.getHasilRekap('0x9D265236D1016642f183b0f35323E6973Dc7f588').call());
            // console.log(await contract.methods.hasilRekap('0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5').call());
            // console.log(trxResult)

//------------------------------------------------------------------------------
// const MyForm = () => {
//     // Creating a signing account from a private key
//     const signer = web3.eth.accounts.privateKeyToAccount(
//         "0x3df117fd8be7bb7c26c01e455753146c9f6a1c21f789bfc8c97f2edf8513db17"
//     );
//     web3.eth.accounts.wallet.add(signer);

//     const location = useLocation();

//     const [blocks, setBlocks] = useState('');
//     const [transactions, setTransactions] = useState('');

//     const [pemilihTerdaftar, setPemilihTerdaftar] = useState('');
//     const [penggunaHakPilih, setPenggunaHakPilih] = useState('');

//     const validateForm = () => {
//         if (penggunaHakPilih !== '' && pemilihTerdaftar !== '' && parseInt(penggunaHakPilih) > parseInt(pemilihTerdaftar)){
//             return false;
//         }
//         return true;
//     }

//     // const projectId = "2OvXaQhOP9Jvs0vuyWdvhfnxM3x"; //project id = api key
//     // const projectSecret = "e3d5291a020c2390698f852eff0efe15" // project secret = api key secret
//     // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
//     // const client = create({
//     //     host: 'ipfs.infura.io',
//     //     port: 5001,
//     //     protocol: 'https',
//     //     headers: {
//     //         authorization: auth,
//     //     },
//     // });
    
//     // const provinsiRef = useRef();
//     // const kabupatenKotaRef = useRef();
//     // const kecamatanDistrikRef = useRef();
//     // const desaKelurahanRef = useRef();
//     const idTpsRef = useRef();
//     const pemilihTerdaftarRef = useRef();
//     const penggunaHakPilihRef = useRef();
//     const paslonSatuRef = useRef();
//     const paslonDuaRef = useRef();
//     const suaraSahRef = useRef();
//     const suaraTidakSahRef = useRef();
//     const totalSuaraRef = useRef();
//     const gambarFormRef = useRef();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if(validateForm()){
//             console.log('oke good')
//             // const accounts = await window.ethereum.request({
//             //     method: "eth_requestAccounts"
//             // })
//             // console.log(accounts[0])
//             // // console.log(location.state.address)
//             // const nomorTPS = nomorTPSRef.current.value;
//             // const infoTPS = [];
//             // const jumlahPemilih = [];
//             // const suaraPaslon = [];
//             // const jumlahSuara = [];
//             // infoTPS[0] = provinsiRef.current.value;
//             // infoTPS[1] = kabupatenKotaRef.current.value;
//             // infoTPS[2] = kecamatanDistrikRef.current.value;
//             // infoTPS[3] = desaKelurahanRef.current.value;
            
//             // jumlahPemilih[0] = pemilihTerdaftarRef.current.value;
//             // jumlahPemilih[1] = penggunaHakPilihRef.current.value;
            
//             // suaraPaslon[0] = paslonSatuRef.current.value;
//             // suaraPaslon[1] = paslonDuaRef.current.value;
            
//             // jumlahSuara[0] = suaraSahRef.current.value;
//             // jumlahSuara[1] = suaraTidakSahRef.current.value;
//             // jumlahSuara[2] = totalSuaraRef.current.value;
            
//             // const form = event.target;
//             // const files = form[12].files;
//             // if (!files || files.length === 0) {
//             //     return alert("No files selected");
//             // }
//             // const file = files[0];
//             // // const ipfsResult = await client.add(file)
//             // // console.log(ipfsResult, 'gambarrr');
//             // // console.log(ipfsResult.path)
//             // // console.log(ipfsResult.cid)
            

//             // const encoded = contract.methods.storeVoteResult(nomorTPS, infoTPS, jumlahPemilih, 
//             //     suaraPaslon,jumlahSuara, ipfsResult.path).encodeABI();
//             // // console.log(encoded);
            
//             // const tx = {
//             //     from: accounts[0],
//             //     to: "0x61A4D1363E39030A823986D53dDc09cc05af8d5C",
//             //     data: encoded,
//             //     gas: "300000",
//             //     // gas: "30000000",
//             //     // gas: '0x7A1200', 
//             //     // gasPrice: "0"
//             // }
//             // try{
//             //     // const txHash = await window.ethereum.request({
//             //     //     method: "eth_sendTransaction",
//             //     //     params: [tx]
//             //     // })
//             //     // console.log(txHash ,'yeeey');
//             //     // console.log(await contract.methods.getHasilRekap('0x9D265236D1016642f183b0f35323E6973Dc7f588').call());
//             // }catch(error){
//             //     // console.log('hhh')
//             //     // console.log(error.message)
//             // }
//         }else{
//             alert('pengguna hak pilih harus <= pemilih terdaftar')
//         }
//     }
//     function checkLogin() {
//         console.log('masuk')
//         const navigate = useNavigate();
//         if(!location.state.balance || !location.state.address){
//             navigate('/login')
//         }
//     }

//     useEffect(() => {
//         // checkLogin();
//         // getAccounts();
//         // getBalance();
//         // getBlocks();
//     }, []);
//     return (
//         <Container className="mt-3">
//             {/* <Button onClick={connectToMetaMask} className="mb-3">Connect to MetaMask</Button> */}
//             <h3>Account balance: {location.state.balance} Wei</h3>
//             <h3>Account address: {location.state.address} </h3>
//             {/* <h3>{!client && (
//           <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
//         )}</h3> */}
//             <Form onSubmit={handleSubmit} className="mt-4">
//                 <Row>
//                     <Form.Group className="mb-4" >
//                         <Form.Label>Info TPS</Form.Label>
//                         <Form.Control type="number" placeholder="ID TPS" className='mb-2'ref={idTpsRef} required/>
//                     </Form.Group>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <Form.Group className="mb-4" >
//                             <Form.Label>Data Pemilih</Form.Label>
//                             <Form.Control type="number" placeholder="Pemilih Terdaftar" className='mb-2' ref={pemilihTerdaftarRef} required value={pemilihTerdaftar} onChange={(e) => setPemilihTerdaftar(e.target.value)}/>
//                             <Form.Control type="number" placeholder="Pengguna Hak Pilih" className='mb-2' ref={penggunaHakPilihRef} required value={penggunaHakPilih} onChange={(e) => setPenggunaHakPilih(e.target.value)}/>
//                         </Form.Group>
//                     </Col>
//                     <Col>
//                         <Form.Group className="mb-4" >
//                             <Form.Label>Perolehan Suara Sah</Form.Label>
//                             <Form.Control type="number" placeholder="Paslon 01" className='mb-2' ref={paslonSatuRef} required/>
//                             <Form.Control type="number" placeholder="Paslon 02" className='mb-2' ref={paslonDuaRef} required/>
//                         </Form.Group>
//                     </Col>
//                     <Col>
//                         <Form.Group className="mb-4" >
//                             <Form.Label>Data Suara</Form.Label>
//                             <Form.Control type="number" placeholder="Suara Sah" className='mb-2' ref={suaraSahRef}/>
//                             <Form.Control type="number" placeholder="Suara Tidak Sah" className='mb-2' ref={suaraTidakSahRef}/>
//                             <Form.Control type="number" placeholder="Total Suara Sah & Tidak Sah" className='mb-2' ref={totalSuaraRef}/>
//                         </Form.Group>
//                     </Col>
//                     <input type="file" name="imageForm" className="mb-3"/>
//                 </Row>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>    
            
//         </Container>
//     )
// }

//----------------------------------------------------------------
//cara orang di medium https://medium.com/swlh/interacting-with-smartcontracts-via-web3-js-367ea980652c
// web3.eth.getTransactionCount(account1, (err, txCount) => {
//     // Build the transaction
//       const txObject = {
//         nonce:    web3.utils.toHex(txCount),
//         to:       contract_Address,
//         value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
//         gasLimit: web3.utils.toHex(2100000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
//         data: myData  
//       }
//         // Sign the transaction
//         const tx = new Tx(txObject);
//         tx.sign(privateKey1);
    
//         const serializedTx = tx.serialize();
//         const raw = '0x' + serializedTx.toString('hex');
    
//         // Broadcast the transaction
//         const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
//             console.log(tx)
//         });
//     });