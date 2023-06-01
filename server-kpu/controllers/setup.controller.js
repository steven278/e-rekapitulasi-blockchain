require('dotenv').config();
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

// const web3 = new Web3(new Web3.providers.HttpProvider(
//     process.env.ALCHEMY_WEB3_PROVIDER
// ));

const web3 = new Web3(new Web3.providers.HttpProvider(
    `${process.env.INFURA_WEB3_PROVIDER}`
));

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
    `${process.env.SIGNER_PRIVATE_KEY}`
);
web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
    compiledContract,
    `${process.env.CONTRACT_ADDRESS}`
);


const registerWallet = async (req, res, next) => {
    try {
        const receipts = [];
        const dbResponses = [];
        const wallets = req.body;
        for (const wallet in wallets) {
            console.log(wallet, wallets[wallet])
            const tx = contract.methods.registerWalletOfficer(wallets[wallet], parseInt(wallet));
            const receipt = await tx
                .send({
                    from: signer.address,
                    gas: 53689,
                    // gas: 57457,
                    // gas: await tx.estimateGas(),
                })
            console.log(receipt)
            receipts.push(receipt);
            const storeToDB = await Tps.update(
                { wallet_address: wallets[wallet], id_TPS: wallet },
                {
                    where: { id_TPS }
                }
            )
            console.log(storeToDB)
            dbResponses.push(storeToDB);
        }
        // console.log(account)
        //wallet dark 2
        // const result = await contract.methods.registerWalletOfficer("0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5", 110101200101)

        // console.log(signer)
        // const receipt = await contract.methods.registerWalletOfficer("0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5", 110101200101).call();
        // Issuing a transaction that calls the `echo` method
        // // const tx = contract.methods.owner.call().call()



        // .once("Increment", (txhash) => {
        //     console.log(`Mining transaction ...`);
        //     console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
        // });
        // //once itu kalo Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.
        // // The transaction is now on chain!
        // console.log(`Mined in block ${receipt.blockNumber}`);

        // console.log(receipt)

        return res.status(201).json({
            status: 'success',
            receipts,
            dbResponses
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

const prefundWallet = async (req, res, next) => {
    // console.log(req.body)
    const { wallets } = (req.body)
    // for (const wallet in wallets) {
    //     // console.log(wallets[wallet])
    //     let nonce = await web3.eth.getTransactionCount("0xEe57103b6F5b4D707C282981dc5bEdA005694a11");
    //     let tx = {
    //         "from": "0xEe57103b6F5b4D707C282981dc5bEdA005694a11",
    //         "to": wallet,
    //         "value": web3.utils.toHex(web3.utils.toWei(wallets[wallet].toString(), 'ether')),
    //         "gas": 21000,
    //         // "gasPrice": gasPrices.low * 1000000000,
    //         "nonce": nonce,
    //         "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
    //     };
    //     web3.eth.sendTransaction()
    // }

}



module.exports = {
    deployContract,
    registerWallet,
    prefundWallet,
}