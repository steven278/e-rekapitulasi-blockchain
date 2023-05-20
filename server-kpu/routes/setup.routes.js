const router = require('express').Router();
const { deployContract, registerWallet } = require('../controllers/setup.controller')

router.post('/deploy', deployContract)
router.post('/register', registerWallet)

module.exports = router;