const router = require('express').Router();
const rekap = require('./rekap.routes');
const region = require('./region.routes');
const wallet = require('./wallet.routes');
const setup = require('./setup.routes');

router.get('/', (req, res, next) => [
    res.status(200).json({
        status: 'success',
        message: 'hello world!'
    })
]);
router.use('/rekap', rekap);
router.use('/region', region);
router.use('/wallet', wallet);
router.use('/setup', setup);

router.use((err, req, res, next) => {
    if (err.name === 'SequelizeDatabaseError' || err.name === 'ReferenceError' || err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            status: 'Bad Request',
            errorName: err.name,
            message: err.message
        });
    } else if (err.message == 'No recipients defined') {
        return res.status(404).json({
            status: 'Error in Email',
            errorName: err.name,
            message: 'You Cant Regist with the wrong email'
        })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(404).json({
            status: 'Error in Email',
            errorName: err.name,
            message: 'You Cant Regist with the email has already registered'
        })
    } else if (err.message == 'Unauthorized') {
        return res.status(403).json({
            status: 'Unauthorized',
            errorName: err.name,
            message: err.message
        })
    } else if (err.name === 'Error' || err.name === 'TypeError') {
        return res.status(404).json({
            status: 'Not Found',
            errorName: err.name,
            message: err.message
        });
    }
    return res.status(500).json({
        status: 'Internal Server Error',
        errorName: err.name,
        message: err.message
    });
})

module.exports = { router };