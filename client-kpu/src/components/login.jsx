import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Pemilu2019 from '../assets/pemilu.jpeg'
import MetamaskLogo from '../assets/metamask-logo.svg'
import Modal from 'react-bootstrap/Modal';
import { ImCross } from 'react-icons/im';
import Row from 'react-bootstrap/Row';

const Login = ({setAccounts, accounts}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const connetWallet = () => {
        //  Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access if needed
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(async (accounts) => {
                console.log(accounts)
                const response = await axios.get(`http://localhost:5000/e-rekap/rekap/login/owner/${accounts[0]}`);
                console.log(response)
                setAccounts(accounts);
                window.localStorage.setItem('accounts', accounts[0]);
            })
            .catch(error => {
                console.log(error);
                handleShow()
            });
        }
    }
    // const handleDisconnect = () => {
    //     console.log('aewerwr')
    //     console.log(window.ethereum)
    //     console.log(window.ethereum.disconnect)
    //     if (window.ethereum && window.ethereum.disconnect) {
    //         window.ethereum.disconnect()
    //         .then(() => {
    //             console.log('Disconnected from MetaMask');
    //             setAccounts([])
    //             window.localStorage.removeItem('accounts');
    //         })
    //         .catch(error => {
    //             console.log('Error disconnecting from MetaMask:', error);
    //         });
    //     }
    // }
    useEffect(() => {
        const acc = [];
        if(accounts.length == 0) {
            window.localStorage.removeItem('accounts');
        }
        acc.push(window.localStorage.getItem('accounts'));
        if(acc){
            setAccounts(acc);
        }
    }, []);
    
    return (
        <Container>
            {accounts[0] ? (
                <></>
            ) : (
                <Container className="login-wrapper">
                    <div className="welcome mb-2">
                        <h3 >Welcome to E-Rekapitulasi</h3>
                    </div>
                    <Card style={{ width: '30vw' }} className="login-card">
                        <Card.Img  src={Pemilu2019} />
                        <Card.Title className="mx-auto mt-5">Login with Metamask</Card.Title>
                        <Card.Body>
                            <Button onClick={(e) => {
                                    connetWallet()
                            }}> 
                                <span><img src={MetamaskLogo} style={{width: '1.75em'}}/> Connect Wallet</span>
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            )}
            <Modal show={show} onHide={handleClose} backdrop="static"
            keyboard={false} aria-labelledby="contained-modal-title-vcenter"
            centered style={{margin:'2em'}}>
                <Modal.Header closeButton className="bg-danger light" id="login-modal-close">
                    {/* <Modal.Title>Login Failed</Modal.Title> */}
                </Modal.Header>
                    <Modal.Body>
                        <Row className='text-danger mb-3 mt-3'>
                            <ImCross size={50}/>
                        </Row>
                        <Row className='mt-3 mb-2'>
                            <h4 className='d-flex justify-content-center'> Login Failed</h4>
                        </Row>
                        <Row className='d-flex justify-content-center text-danger'>
                            <h6 style={{textAlign: 'center'}}>Your wallet address is not authorized to access this system</h6>
                        </Row>
                    </Modal.Body>
            </Modal>
        </Container>
        );
    };

export default Login;








// import Web3 from 'web3';
// import { useState, useEffect, useRef } from 'react';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import { useWeb3React } from "@web3-react/core"
// import { injected } from "../components/injected";

// const Login = () => {
//     const { active, account, library, connector, activate, deactivate } = useWeb3React()

//     async function connect() {
//         try {
//             await activate(injected)
//         } catch (ex) {
//             console.log(ex)
//         }
//     }

//     async function disconnect() {
//         try {
//             deactivate()
//         } catch (ex) {
//             console.log(ex)
//         }
//     }
//     return (
//         <Container className="mt-3">
//             <Button onClick={connect} variant="primary">Connect to Metamask</Button>
//             {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
//             <Button onClick={disconnect} variant="primary">Disconnect</Button>
            
//         </Container>
//     )
// }
// export default Login;