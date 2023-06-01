const router = require('express').Router();
const { upload } = require('../helper/upload')
const { getRecapitulationById, createRecapitulation, checkLogin, storeTxnHash } = require('../controllers/rekap.controller')

router.get('/:id', getRecapitulationById);
router.get('/login/:wallet', checkLogin);
router.post('/', upload.single('formImage'), createRecapitulation);
router.put('/:id', storeTxnHash);

module.exports = router;