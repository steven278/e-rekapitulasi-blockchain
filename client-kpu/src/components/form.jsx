import { useState, useEffect, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import contractABI from './contractABI';

import { create, CID } from "ipfs-http-client";
import {Buffer} from 'buffer';

const web3 = new Web3(new Web3.providers.HttpProvider( `https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940`));

// Creating a Contract instance
const contract = new web3.eth.Contract(contractABI,"0x2488B908e0E1A0160d8C633D5deA40934252B479");

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
        if(data.penggunaHakPilih > data.pemilihTerdaftar){
            errors.penggunaHakPilih = "pengguna hak pilih tidak boleh lebih besar dari pemilh terdaftar"
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0 && fileError === '') {
            
            const data = new FormData();
            data.append("data", formData.tps_id);
            data.append("formImage",formImage);
            fetch('http://localhost:5000/e-rekap/rekap/', {
                method: 'POST',
                body: data
            }).then(response => response.json())
            .then(json => console.log(json.data))
        //     fetch(`http://localhost:5000/e-rekap/region/${dataToFetch.region}/${regionId}`)
        // .then(response => response.json())
        // .then(json => json.data.map((curr) => ({
        //     id: curr[dataToFetch.id],
        //     nama: curr[dataToFetch.nama]
        // })))
        // .then(res => setRegion(res))
        } else {
            console.log('form is not valid')
            // Form is invalid, display validation errors
            setErrors(validationErrors);
        }
    }

    return (
        <Container className="mt-3">
            {/* <Button onClick={connectToMetaMask} className="mb-3">Connect to MetaMask</Button> */}
            {/* <h3>Account balance: {location.state.balance} Wei</h3>
            <h3>Account address: {location.state.address} </h3> */}
            {/* <h3>{!client && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}</h3> */}
            <Form onSubmit={handleSubmit} method="post" className="mt-4">
                <Row>
                    <Form.Group className="mb-4" >
                        <Form.Label>Info TPS</Form.Label>
                        <Form.Control type="number" placeholder="ID TPS" className='mb-2' required
                        name="idTPS"
                        value = {formData.idTPS}
                        onChange = {handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-4" >
                            <Form.Label>Data Pemilih</Form.Label>

                            <Form.Control type="number" placeholder="Pemilih Terdaftar" className='mb-2'  required 
                            name="pemilihTerdaftar"
                            value = {formData.pemilihTerdaftar}
                            onChange = {handleChange}/>
                            {errors.pemilihTerdaftar && <span className="error">{errors.pemilihTerdaftar}</span>}

                            <Form.Control type="number" placeholder="Pengguna Hak Pilih" className='mb-2'  required 
                            name="penggunaHakPilih"
                            value = {formData.penggunaHakPilih}
                            onChange = {handleChange}/>
                            {errors.penggunaHakPilih && <span className="error">{errors.penggunaHakPilih}</span>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-4" >
                            <Form.Label>Perolehan Suara Sah</Form.Label>

                            <Form.Control type="number" placeholder="Paslon 01" className='mb-2'  required
                            name="suaraPaslon1"
                            value = {formData.suaraPaslon1}
                            onChange = {handleChange}/>
                            {errors.suaraPaslon1 && <span className="error">{errors.suaraPaslon1}</span>}

                            <Form.Control type="number" placeholder="Paslon 02" className='mb-2'  required
                            name="suaraPaslon2"
                            value = {formData.suaraPaslon2}
                            onChange = {handleChange}/>
                            {errors.suaraPaslon2 && <span className="error">{errors.suaraPaslon2}</span>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-4" enctype="multipart/form-data">
                            <Form.Label>Data Suara</Form.Label>
                            <Form.Control type="number" placeholder="Suara Sah" className='mb-2' required
                            name="jumlahSeluruhSuaraSah"
                            value = {formData.jumlahSeluruhSuaraSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSeluruhSuaraSah && <span className="error">{errors.jumlahSeluruhSuaraSah}</span>}

                            <Form.Control type="number" placeholder="Suara Tidak Sah" className='mb-2' required
                            name="jumlahSuaraTidakSah"
                            value = {formData.jumlahSuaraTidakSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSuaraTidakSah && <span className="error">{errors.jumlahSuaraTidakSah}</span>}

                            <Form.Control type="number" placeholder="Total Suara Sah & Tidak Sah" className='mb-2' required
                            name="jumlahSuaraSahDanTidakSah"
                            value = {formData.jumlahSuaraSahDanTidakSah}
                            onChange = {handleChange}/>
                            {errors.jumlahSuaraSahDanTidakSah && <span className="error">{errors.jumlahSuaraSahDanTidakSah}</span>}
                        </Form.Group>
                    </Col>
                    <input type="file" name="formImage" className="mb-3" required
                    onChange={handleFileChange}/>
                    {fileError && <span className="error">{fileError}</span>}
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>    
            
        </Container>
    )
}

export default MyForm;



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