import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import FormModal from './FormModal.jsx'

import Web3 from 'web3';
import contractABI from './contractABI';

const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_PROVIDER));
// const web3 = new Web3(new Web3.providers.HttpProvider( `https://eth-sepolia.g.alchemy.com/v2/XIL9z6I2wgDrXCG0Og0BDkW1VwbnmrwP`));

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

// Creating a Contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

const RegisterForm = ({accounts}) => {
    const [wallets, setWallets] = useState(null);
    const [TPS, setTPS] = useState(null);
    const [fileAddress, setFileAddress] = useState(null);
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('')
        if (file) {
            const fileType = file.type;
            if (fileType !== 'application/json') {
                setFileError('Please select a JSON file type.');
            }
        }
        console.log(file)
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
            const contents = e.target.result;
            const parsedData = JSON.parse(contents);
            const tpsArr = Object.keys(parsedData).map(key => parseInt(key));
            setWallets(Object.values(parsedData));
            setTPS(tpsArr);
        };
        fileReader.readAsText(file);
        setFileAddress(file)
        // setWallets(file)
    };
    
    const setModalData = (receipt) => {
        setTrxResult(receipt) 
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (fileError === '') {
            try{
                console.log('jfajljlsaf')
                console.log(wallets)
                console.log(TPS)
                // console.log(wallets)
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const encoded = contract.methods.registerWalletOfficer(wallets, TPS).encodeABI();
                // const estimatedGas = await web3.eth.estimateGas({
                //     from: accounts[0],
                //     to: contractAddress,
                //     data: encoded
                // }); 
                // console.log(estimatedGas)
                // console.log(estimatedGasNum, typeof(estimatedGasNum))okay
                const tx = {
                    // from: '0xdA25c406FC7e8b4d6179141B34f11929f5FFf1D9',
                    from: accounts[0],
                    to: contractAddress,
                    data: encoded,
                    gas: '43429',
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
                                const res = await axios.put(`${import.meta.env.VITE_SERVER_PROTOCOL_DOMAIN}${import.meta.env.VITE_SERVER_PORT}/e-rekap/setup/register`, 
                                                            fileAddress,
                                                            {headers: {'content-type': 'application/json; charset=utf-8'}});
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
                // console.log(wallets)
            }catch(err){
                console.log(err)
                setTrxError(err)
            }
        } else {
            console.log('form is not valid')
            // Form is invalid, display validation errors
            // setErrors(validationErrors);
        }
    }

    return (
        <Container className="mt-4">
            <h3 style={{textAlign: 'center'}}>Form Registrasi Wallet Petugas KPPS</h3>
            <Form onSubmit={handleSubmit} method="post"  encType="multipart/form-data" className="mt-4" id='rekap-form'>
                <Row className='justify-content-md-center mt-5 mb-5'>
                    <Col className="form-col col-6">
                        <div className="mb-3 mt-4 upload-image-wrapper">
                            <h5>Upload Daftar Wallet</h5>
                            <input name="formImage" className="form-control mt-5 mb-3" type="file" id="formFile" required onChange={handleFileChange}/>
                            {fileError && <span className="error">{fileError}</span>}
                        </div>
                        <div className="submit-form-wrapper mt-5 mb-2">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Col>
                </Row>
            </Form>   
            {/* <button variant="primary" onClick={handleDisconnect}>Disconnect Wallet</button> */}
            <FormModal load={load} show={show} trxResult={trxResult} txHash={txHash} handleClose={handleClose}/>
        </Container>
    )
}

export default RegisterForm;