const { Province, City, District, SubDistrict, Tps } = require('../models');

const Web3 = require('web3');
const { compiledContract } = require('../helper/RekapContract');
const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/b023ce6c8c724d5b8843edd7023e5940`
));

// Creating a signing account from a private key
// const signer = web3.eth.accounts.privateKeyToAccount(
//     "9e4226b1d7337fbf97f3441154822f9529f70ad4d501a235232edb6c70d06e9c"
// );
// web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
    compiledContract,
    "0x2488B908e0E1A0160d8C633D5deA40934252B479"
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
        const receipt = await tx
            .send({
                from: accounts,
                gas: 138041,
            })
        console.log(`Mined in block ${receipt.blockNumber}`);
        return res.status(201).json({
            message: 'recapitulation created successfully',
            data: receipt
        })
    } catch (err) {
        next(err);
    }
}

const getAllRecapitulation = async (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        data: 'get all recapitulation'
    })
}

const getRecapitulationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tx = await contract.methods.getRecapitulationByTpsId(id).call();
        // console.log(tx)
        return res.status(200).json({
            status: 'success',
            data: tx
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllRecapitulation,
    getRecapitulationById,
    createRecapitulation
}