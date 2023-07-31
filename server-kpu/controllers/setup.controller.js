require('dotenv').config();
const { Tps } = require('../models')

const Web3 = require('web3');

const { compiledContract } = require('../helper/RekapContract');


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
        const fileAddress = req.body;
        const updatePromises = Object.keys(fileAddress).map(key => {
            return Tps.update({ wallet_address: fileAddress[key] }, { where: { id_TPS: key } });
        });

        await Promise.all(updatePromises);

        return res.status(200).json({
            status: 'Bulk update success',
        })
    } catch (err) {
        next(err);
    }
}

const deployContract = async (req, res, next) => {
    try {
        const privKey = "92c9ac2a6bae8e482e415cbaebd993061e93dfa09c718b5a333ccbc2e254fa7d"
        return res.status(201).json({
            status: 'success',
            data: 'aaa'
        })
    } catch (err) {
        next(err);
    }
}

const prefundWallet = async (req, res, next) => {
    const { wallets } = (req.body)
}



module.exports = {
    deployContract,
    registerWallet,
    prefundWallet,
}