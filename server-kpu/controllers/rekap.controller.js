require('dotenv').config();
const { Tps } = require('../models');
const Web3 = require('web3');
const { compiledContract } = require('../helper/RekapContract');
const web3 = new Web3(new Web3.providers.HttpProvider(
    process.env.INFURA_WEB3_PROVIDER
));

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
    process.env.CONTRACT_ADDRESS
);

//for testing purpose
const createRecapitulation = async (req, res, next) => {
    try {
        const { tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, formImage, address } = req.body;
        const addressIndex = parseInt(address)

        const tx = contract.methods.storeVoteResult(
            tps_id, pemilihTerdaftar, penggunaHakPilih, suaraPaslon1, suaraPaslon2, jumlahSeluruhSuaraSah,
            jumlahSuaraTidakSah, jumlahSuaraSahDanTidakSah, formImage
        );

        const data = [];
        console.log('before send')

        const receipt = await tx
            .send({
                from: signer[addressIndex].address,
                gas: '160000',
                maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('20.5', 'gwei')),
                type: "0x02"
                // gas: '135105',
                // gas: await tx.estimateGas(),
            })
            .on('error', (error) => {
                console.log(error)
                data.push(error)
            })
            .then((receipt) => {
                console.log(receipt)
                data.push(receipt)
            })
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
        const { wallet } = req.params;
        const owner = await contract.methods.owner().call();
        if (owner.toLowerCase() !== wallet.toLowerCase()) {
            console.log('second')
            throw new Error('Your wallet address is not authorized to access this system');
        }
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
        const id_TPS = req.params.id
        const { txn_hash } = req.body;
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