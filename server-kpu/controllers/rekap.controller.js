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

// Creating a signing account from a private key
// const signer = web3.eth.accounts.privateKeyToAccount(
//     "9e4226b1d7337fbf97f3441154822f9529f70ad4d501a235232edb6c70d06e9c"
// );
// web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
    compiledContract,
    process.env.CONTRACT_ADDRESS
);

const createRecapitulation = async (req, res, next) => {
    try {
        const { tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, accounts } = req.body;
        const { formImage } = req.file
        const tx = contract.methods.storeVoteResult(
            tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, formImage
        );
        // web3.eth.accounts.wallet.add(accounts);
        // await tx.send({ from: accounts, gas: 138041 })
        const receipt = await tx
            .send({
                from: accounts,
                gas: 138041,
                gasPrice: 2500000
            })
        // console.log(receipt)
        // console.log(`Mined in block ${receipt.blockNumber}`);
        return res.status(201).json({
            message: 'recapitulation created successfully',
            data: 'aaa'
        })
    } catch (err) {
        next(err);
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
    storeTxnHash
}