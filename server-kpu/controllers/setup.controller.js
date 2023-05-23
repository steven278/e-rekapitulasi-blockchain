const { Tps } = require('../models')

const Web3 = require('web3');
// const web3 = new Web3('https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940');

// const compiledContract = require('../helper/RekapContract');
// import compiledContract from '../helper/RekapContract';
const { compiledContract } = require('../helper/RekapContract');

// //wallet stud 1
// const privateKey = "3df117fd8be7bb7c26c01e455753146c9f6a1c21f789bfc8c97f2edf8513db17"

// // Create a web3 instance using the MetaMask wallet's private key
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount = account.address;

// Create an instance of the deployed contract
// const contract = new web3.eth.Contract(compiledContract, "0xF89f2e69405C721C230af7948Da989b1D0bBA1F6");

const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940`
));

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
    "0x3df117fd8be7bb7c26c01e455753146c9f6a1c21f789bfc8c97f2edf8513db17"
);
web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
    compiledContract,
    "0x2488B908e0E1A0160d8C633D5deA40934252B479"
);


const registerWallet = async (req, res, next) => {
    try {
        const { wallet_address, id_TPS } = req.body;
        // console.log(account)
        //wallet dark 2
        // const result = await contract.methods.registerWalletOfficer("0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5", 110101200101)

        // console.log(signer)
        // const receipt = await contract.methods.registerWalletOfficer("0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5", 110101200101).call();
        // Issuing a transaction that calls the `echo` method
        // // const tx = contract.methods.owner.call().call()
        const tx = contract.methods.registerWalletOfficer(wallet_address, id_TPS);
        const receipt = await tx
            .send({
                from: signer.address,
                gas: 53689,
                // gas: 57457,
                // gas: await tx.estimateGas(),
            })
        const storeToDB = await Tps.update(
            { wallet_address, id_TPS },
            {
                where: { id_TPS }
            }
        )
        // .once("Increment", (txhash) => {
        //     console.log(`Mining transaction ...`);
        //     console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
        // });
        // //once itu kalo Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.
        // // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);

        // console.log(receipt)

        return res.status(201).json({
            status: 'success',
            data: receipt
        })
    } catch (err) {
        next(err);
    }
}

const deployContract = async (req, res, next) => {
    try {
        const privKey = "92c9ac2a6bae8e482e415cbaebd993061e93dfa09c718b5a333ccbc2e254fa7d"
        // const incrementer = new web3.eth.Contract(compiledContract.abi);
        // const incrementerTx = incrementer.deploy({
        //     data: compiledContract.bytecode
        // })
        // const createTransaction = await web3.eth.accounts.signTransaction({
        //     from: "0xbfEb5E45Cc2Ac57093c5311e311ADBCDF20d902D",
        //     data: incrementerTx.encodeABI(),
        //     gas: 3000000,
        // },
        //     privKey
        // )
        // const createReceipt = web3.eth.sendSignedTransaction(createTransaction.rawTransaction).then((res) => {
        //     console.log('Contract deployed at address', res.contractAddress);
        // });

        // const accounts = await web3.eth.getAccounts();
        // const accounts = await window.ethereum.request({
        //     method: "eth_requestAccounts"
        // })
        // console.log(accounts[0])
        // const account = "0xbfEb5E45Cc2Ac57093c5311e311ADBCDF20d902D";
        // const contract = new web3.eth.Contract(compiledContract.abi);
        // const deployTransaction = contract.deploy({
        //     data: '0x' + compiledContract.bytecode,
        //     // arguments: ['constructor argument 1', 'constructor argument 2']
        // });
        // const options = {
        //     from: account,
        //     gas: 3000000 // Adjust the gas limit according to your contract
        // };
        // const receipt = await deployTransaction.send(options);
        // res.json({ transactionHash: receipt.transactionHash, contractAddress: receipt.contractAddress });
        // console.log(accounts);
        // console.log(contract);
        return res.status(201).json({
            status: 'success',
            data: 'aaa'
        })
    } catch (err) {
        next(err);
    }
}



module.exports = {
    deployContract,
    registerWallet
}