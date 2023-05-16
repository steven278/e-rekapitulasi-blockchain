const { Province, City, District, SubDistrict, Tps } = require('../models');

const getAllProvince = async (req, res, next) => {
    try {
        const options = {
            attributes: [
                'id_provinsi', 'nama_provinsi'
            ],
            order: [['id_provinsi', 'ASC']],
        }

        const data = await Province.findAll(options);
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        next(err);
    }
}

const getCityByProvinceID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = {
            attributes: [
                'id_kota', 'nama_kota', 'id_provinsi'
            ],
            order: [['id_kota', 'ASC']],
            where: { id_provinsi: id }
        }

        const data = await City.findAll(options);
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        next(err);
    }
}
const getDistrictByCityID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = {
            attributes: [
                'id_kecamatan', 'nama_kecamatan', 'id_kota'
            ],
            order: [['id_kecamatan', 'ASC']],
            where: { id_kota: id }
        }

        const data = await District.findAll(options);
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        next(err);
    }
}
const getSubDistrictByDistrictID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = {
            attributes: [
                'id_kelurahan', 'nama_kelurahan', 'id_kecamatan'
            ],
            order: [['id_kelurahan', 'ASC']],
            where: { id_kecamatan: id }
        }

        const data = await SubDistrict.findAll(options);
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        next(err);
    }
}
const getTpsBySubDistrictID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = {
            attributes: [
                'id_TPS', 'no_TPS', 'id_kelurahan'
            ],
            order: [['id_TPS', 'ASC']],
            where: { id_kelurahan: id }
        }

        const data = await Tps.findAll(options);
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllProvince,
    getCityByProvinceID,
    getDistrictByCityID,
    getSubDistrictByDistrictID,
    getTpsBySubDistrictID
}