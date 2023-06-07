require('dotenv').config();
const { Tps } = require('../models');
const Web3 = require('web3');
const { compiledContract } = require('../helper/RekapContract');
const web3 = new Web3(new Web3.providers.HttpProvider(
    process.env.INFURA_WEB3_PROVIDER
));
// const web3 = new Web3(new Web3.providers.HttpProvider(
//     process.env.ALCHEMY_WEB3_PROVIDER
// ));

const signer = [];

// Creating a signing account from a private key
signer[0] = web3.eth.accounts.privateKeyToAccount(
    "9e4226b1d7337fbf97f3441154822f9529f70ad4d501a235232edb6c70d06e9c" //address dark 2
);
web3.eth.accounts.wallet.add(signer[0]);

signer[1] = web3.eth.accounts.privateKeyToAccount(
    "92c9ac2a6bae8e482e415cbaebd993061e93dfa09c718b5a333ccbc2e254fa7d"
)
web3.eth.accounts.wallet.add(signer[1]);

// Creating a Contract instance
const contract = new web3.eth.Contract(
    compiledContract,
    "0x793b8f956E13d7da988440528178e9cCfdc7CEBE"
    // process.env.CONTRACT_ADDRESS
);

//for testing purpose
const createRecapitulation = async (req, res, next) => {
    try {
        console.log('masukkkkkkkkk')
        const { tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, formImage, address } = req.body;
        // const { formImage } = req.file
        // Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        // let num = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        // console.log(num)
        // const t = parseInt(tps_id) + num
        // console.log(t)

        // return t;
        const addressIndex = parseInt(address)
        // const hex = num.toString(16);
        const tx = contract.methods.storeVoteResult(
            tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, formImage
        );
        // console.log(tx)
        // web3.eth.accounts.wallet.add(accounts);
        // await tx.send({ from: accounts, gas: 138041 })
        const data = [];
        console.log('before send')

        const receipt = await tx
            .send({
                from: signer[addressIndex].address,
                // from: signer[0].address,
                gas: '160000',
                maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('20.5', 'gwei')),
                type: "0x02"
                // gas: '135105',
                // gas: await tx.estimateGas(),
            })
            // .once('sending', (payload) => {
            //     console.log('sending')

            //     console.log(payload)
            //     data.push(payload)
            // })
            // .once('sent', (payload) => { // payloadnya sama aja kyk yg sending
            //     console.log('sent')
            //     console.log(payload)
            //     data.push(payload)
            // })
            // .on("transactionHash", (txhash) => { // balikin transaction hash aja
            //     console.log(`transactionHash`);
            //     console.log(txhash)
            //     data.push(txhash)
            // })
            // .once('receipt', (receipt) => {
            //     console.log('receipt')
            //     console.log(receipt)
            //     data.push(receipt)
            // })
            // .on('confirmation', (confNumber, receipt, latestBlockHash) => {
            //     console.log('confirmation')
            //     console.log(confNumber)
            //     console.log(receipt)
            //     console.log(latestBlockHash)
            //     data.push(confNumber, receipt, latestBlockHash)
            // })
            .on('error', (error) => {
                console.log('error')
                console.log(error)
                data.push(error)
            })
            .then((receipt) => {
                console.log(receipt)
                data.push(receipt)
            })

        // console.log(await web3.eth.getTransactionCount("0xc7f41aFC8002C8DEBC60A9c9812B2f9a02fD92F5"))

        //             .once('sending', function(payload){ ... })
        // .once('sent', function(payload){ ... })
        // .once('transactionHash', function(hash){ ... })
        // .once('receipt', function(receipt){ ... })
        // .on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
        // .on('error', function(error){ ... })
        // .then(function(receipt){
        //     // will be fired once the receipt is mined
        // });
        // console.log(receipt)
        // The transaction is now on chain!
        // console.log(`Mined in block ${receipt.blockNumber}`);
        // const receipt = await tx
        //     .send({
        //         from: signer,
        //         gas: 138041,
        //         gasPrice: 2500000,
        //     })
        // console.log(receipt)
        // console.log(receipt)
        // console.log(`Mined in block ${receipt.blockNumber}`);
        return res.status(201).json({
            message: 'recapitulation created successfully',
            data: data
        })
    } catch (err) {
        next(err);
    }
}

const checkLogin = async (req, res, next) => {
    try {
        const { wallet } = req.params;
        const options = {
            attributes: [
                'id_TPS', 'wallet_address'
            ],
            where: { wallet_address: wallet }
        }
        const data = await Tps.findOne(options)
        console.log(data)
        if (!data) {
            throw new Error('Your Wallet Address is Not Registered');
        }
        return res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        next(err)
    }
}

const checkLoginOwner = async (req, res, next) => {
    try {
        console.log('first')
        const { wallet } = req.params;
        const owner = await contract.methods.owner().call();

        console.log(wallet)
        console.log(owner)
        if (owner.toLowerCase() !== wallet.toLowerCase()) {
            console.log('second')
            throw new Error('Your Wallet Address is Not Registered');
        }
        console.log('third')
        return res.status(200).json({
            status: 'success',
            data: 'login success'
        })
    } catch (err) {
        next(err)
    }
}

const storeTxnHash = async (req, res, next) => {
    try {
        // console.log('ajlajla')
        const id_TPS = req.params.id
        const { txn_hash } = req.body;
        // console.log(req.body)
        const data = await Tps.update(
            { txn_hash },
            {
                where: { id_TPS },
                plain: true,
                returning: true,
            }
        )
        if (data[0] == 0) throw new Error(`Failed to store txn_hash`);
        return res.status(200).json({
            message: 'txn_hash stored in db',
            data: data
        })
    } catch (err) {
        next(err);
    }
}

const getRecapitulationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tx = await contract.methods.getRecapitulationByTpsId(id).call();
        const tps = await Tps.findOne({ where: { id_TPS: id } })
        return res.status(200).json({
            status: 'success',
            data: tx,
            txn_hash: tps.txn_hash
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getRecapitulationById,
    createRecapitulation,
    checkLogin,
    checkLoginOwner,
    storeTxnHash
}