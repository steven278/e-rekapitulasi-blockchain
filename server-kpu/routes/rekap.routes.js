const router = require('express').Router();
const { upload } = require('../helper/upload')
const { getAllRecapitulation, getRecapitulationById, createRecapitulation } = require('../controllers/rekap.controller')

router.get('/', getAllRecapitulation)
router.get('/:id', getRecapitulationById);
router.post('/', upload.single('formImage'), createRecapitulation);

module.exports = router;