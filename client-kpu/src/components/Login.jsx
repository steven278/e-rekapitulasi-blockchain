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
import { TiTick } from 'react-icons/ti';
import Row from 'react-bootstrap/Row';

const Login = ({setAccounts, accounts, show, handleShow, handleClose, isAuthorized, setIsAuthorized}) => {
    const connetWallet = () => {
        //  Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access if needed
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(async (accounts) => {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_PROTOCOL_DOMAIN}${import.meta.env.VITE_SERVER_PORT}/e-rekap/rekap/login/owner/${accounts[0]}`);
                setAccounts(accounts);
                window.localStorage.setItem('accounts', accounts[0]);
                setIsAuthorized(true)
                handleShow()
            })
            .catch(error => {
                console.log(error);
                setIsAuthorized(false)
                handleShow()
            });
        }
    }
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
                    <div className="welcome mt-3 text-center">
                        <h3 >Selamat Datang di Sistem</h3>
                    </div>
                    <div className="welcome mb-2 text-center">
                        <h3> Registrasi Wallet Petugas KPPS </h3>
                    </div>
                    <Card style={{ width: '30vw' }} className="login-card">
                        <Card.Img  src={Pemilu2019} />
                        <Card.Title className="mx-auto mt-5">Login dengan Metamask</Card.Title>
                        <Card.Body>
                            <Button onClick={(e) => {
                                    connetWallet()
                            }}> 
                                <span><img src={MetamaskLogo} style={{width: '1.75em'}}/> Hubungkan Wallet</span>
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            )}
            <Modal show={show} onHide={handleClose} backdrop="static"
            keyboard={false} aria-labelledby="contained-modal-title-vcenter"
            centered >
                <Modal.Header closeButton className={`${isAuthorized ?"bg-success":"bg-danger"} light`} id="login-modal-close">
                </Modal.Header>
                    <Modal.Body>
                        <Row className='text-danger mb-3 mt-3'>
                            {isAuthorized == true ?
                            <TiTick size={80} style={{color:'green'}}/> :
                            <ImCross size={50} style={{color:'red'}}/> 
                            }
                        </Row>
                        <Row className='mt-3 mb-2'>
                            <h4 className={`d-flex justify-content-center`}>
                                {isAuthorized == true ? 'Login Success' : 'Login Failed'}
                            </h4>
                        </Row>
                        <Row className='d-flex justify-content-center text-danger'>
                            <h6 style={{textAlign:'center'}}>
                                    {isAuthorized == true ? "" : "Your wallet address is not authorized to access this system"}
                            </h6>
                        </Row>
                    </Modal.Body>
            </Modal>
        </Container>
        );
    };

export default Login;