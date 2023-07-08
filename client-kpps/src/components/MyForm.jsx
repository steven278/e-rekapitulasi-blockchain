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