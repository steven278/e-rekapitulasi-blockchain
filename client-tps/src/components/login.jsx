import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Login() {
    const [balance, setBalance] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    async function connectToMetaMask() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const balance = await web3.eth.getBalance(accounts[0]);
                setBalance(web3.utils.fromWei(balance, 'ether'));
                navigate('/form', {state:{address : accounts[0], balance}})
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('MetaMask not detected');
        }
    }

    return (
        <Container className="mt-5">
            <Button onClick={connectToMetaMask} className="mb-3">Connect to MetaMask</Button>
            <h3>Account balance: {balance} ETH</h3>
            <h3>Account address: {address} ETH</h3>
        </Container>
    );
}

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