const router = require('express').Router();
const { deployContract, registerWallet, prefundWallet } = require('../controllers/setup.controller')

router.post('/deploy', deployContract)
router.post('/register', registerWallet)
router.post('/prefund', prefundWallet)

module.exports = router;