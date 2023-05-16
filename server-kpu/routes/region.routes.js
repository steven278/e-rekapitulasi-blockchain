const router = require('express').Router();
const { getAllProvince, getCityByProvinceID, getDistrictByCityID, getSubDistrictByDistrictID, getTpsBySubDistrictID } = require('../controllers/region.controller');

router.get('/province', getAllProvince)
router.get('/city/:id', getCityByProvinceID);
router.get('/district/:id', getDistrictByCityID);
router.get('/subdistrict/:id', getSubDistrictByDistrictID);
router.get('/tps/:id', getTpsBySubDistrictID);

module.exports = router;