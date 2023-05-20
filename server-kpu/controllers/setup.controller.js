const deployContract = async (req, res, next) => {
    // try {
    //     return res.status(201).json({
    //         status: 'success',
    //         data: 'deploy succeed'
    //     })
    // } catch (err) {
    //     next(err);
    // }
    console.log('sss')
    return res.status(201).json({
        status: 'success',
        data: 'deploy succeed'
    })
}

const registerWallet = async (req, res, next) => {
    try {
        return res.status(201).json({
            status: 'success',
            data: 'regist succeed'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deployContract,
    registerWallet
}