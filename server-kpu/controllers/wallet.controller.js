const Web3 = require('web3');

const { detectEthereumProvider } = require('@metamask/detect-provider');

const createWallet = async (req, res, next) => {
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
}

module.exports = {
    createWallet,
    prefundWallets
}