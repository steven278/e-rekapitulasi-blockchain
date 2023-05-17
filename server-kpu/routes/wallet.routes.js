const router = require('express').Router();
const { createWallet, prefundWallets } = require('../controllers/wallet.controller')

router.get('/', createWallet)
router.get('/prefund', prefundWallets)
module.exports = router;