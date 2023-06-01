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

const RegisterForm = ({accounts}) => {
    const [wallets, setWallets] = useState(null);
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');

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
        console.log(file)
        setWallets(file)
        setFileError('')
    
        if (file) {
            const fileType = file.type;
            if (fileType !== 'application/json') {
                setFileError('Please select a JSON file type.');
            }
        }
    };
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (fileError === '') {
            try{
                const res = await axios.post(`http://localhost:5000/e-rekap/setup/register`, 
                wallets,
                {headers: {'content-type': 'application/json; charset=utf-8'}}
                );
                console.log(res)
                // console.log(wallets)
            }catch(err){
                console.log(err)
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
            {/* <FormModal load={load} show={show} handleClose={handleClose}/> */}
        </Container>
    )
}

export default RegisterForm;