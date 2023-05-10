const router = require('express').Router();
const { getAllRecapitulation, getRecapitulationById, createRecapitulation } = require('../controllers/rekap.controller')

router.get('/', getAllRecapitulation)
router.get('/:id', getRecapitulationById);
router.post('/', createRecapitulation);

module.exports = router;