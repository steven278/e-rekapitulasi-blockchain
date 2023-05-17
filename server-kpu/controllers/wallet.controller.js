const Web3 = require('web3');
// const web3 = new Web3('https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940s');
// const web3 = new Web3(window.ethereum);
const { detectEthereumProvider } = require('@metamask/detect-provider');

const createWallet = async (req, res, next) => {
    // const numWallets = 834410;
    const numWallets = 2;
    const wallets = [];

    for (let i = 0; i < numWallets; i++) {
        const wallet = web3.eth.accounts.create();
        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    }

    return res.status(200).json({
        status: 'success',
        data: wallets,
    })
}


const connectToMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (!provider) {
        throw new Error('Metamask not found');
    }
    const web3 = new Web3(provider);
    return web3;
};

const prefundWallets = async (req, res, next) => {
    // Fund the wallets with SepoliaETH tokens
    // const fromAddress = '0xbfEb5E45Cc2Ac57093c5311e311ADBCDF20d902Dz';
    // const fromPrivateKey = '92c9ac2a6bae8e482e415cbaebd993061e93dfa09c718b5a333ccbc2e254fa7d';

    // const address = '0x753916d0416546287a6140E00D590b8A107BCCe1';
    // const checksumAddress = web3.utils.toChecksumAddress(address);
    try {
        const web3 = await connectToMetamask();
        const senderAddress = await web3.eth.getCoinbase();
        const amountToSend = web3.utils.toWei('0.00001', 'ether');
        const recipientAddress = '0x753916d0416546287a6140E00D590b8A107BCCe1';

        const gasOptions = {
            gas: 21000, // Gas limit for a simple transfer
            gasPrice: await web3.eth.getGasPrice(),
        };

        const transaction = {
            from: senderAddress,
            to: recipientAddress,
            value: amountToSend,
            ...gasOptions,
        };

        // Sign the transaction using Metamask
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, 'YOUR_PRIVATE_KEY'); // Replace with your private key

        // Send the signed transaction
        const result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        res.json({
            transactionHash: result.transactionHash,
        });
    } catch (err) {
        next(err);
    }

    // try {
    //     const signedTransaction = await web3.eth.accounts.signTransaction(
    //         {
    //             to: checksumAddress,
    //             value: valueToSend,
    //             gas: 21000,
    //             gasPrice: web3.utils.toWei('10', 'gwei'),
    //             nonce: await web3.eth.getTransactionCount(fromAddress)
    //         },
    //         fromPrivateKey
    //     );

    //     const transactionReceipt = await web3.eth.sendSignedTransaction(
    //         signedTransaction.rawTransaction
    //     );

    //     res.json({
    //         address: checksumAddress,
    //         transactionHash: transactionReceipt.transactionHash
    //     });

    // } catch (err) {
    //     // res.status(500).json({ error: 'Failed to fund the wallet' });
    //     next(err);
    // }
}

module.exports = {
    createWallet,
    prefundWallets
}