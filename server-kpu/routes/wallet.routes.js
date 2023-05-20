const router = require('express').Router();
const { createWallet, prefundWallets } = require('../controllers/wallet.controller')

router.post('/', createWallet)
router.post('/prefund', prefundWallets)
module.exports = router;