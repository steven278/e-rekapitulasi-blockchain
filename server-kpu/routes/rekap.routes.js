const router = require('express').Router();
const { upload } = require('../helper/upload')
const { getRecapitulationById, createRecapitulation, checkLogin, checkLoginOwner, storeTxnHash } = require('../controllers/rekap.controller')

router.get('/:id', getRecapitulationById);
router.get('/login/:wallet', checkLogin);
router.get('/login/owner/:wallet', checkLoginOwner);
router.post('/', upload.single('formImage'), createRecapitulation);
router.put('/:id', storeTxnHash);

module.exports = router;