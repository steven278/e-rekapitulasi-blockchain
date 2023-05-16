const { Province, City, District, SubDistrict, Tps } = require('../models');

const getAllRecapitulation = async (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        data: 'get all recapitulation'
    })
}

const getRecapitulationById = async (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        data: 'get recapitulation by id'
    })
}

const createRecapitulation = async (req, res, next) => {
    return res.status(201).json({
        message: 'recapitulation created successfully',
    })
}

module.exports = {
    getAllRecapitulation,
    getRecapitulationById,
    createRecapitulation
}