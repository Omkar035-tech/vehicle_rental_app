import { VehicleData, VehicleInfo } from "../models/index.js"

// Get Filter data based on wheel count

export const getVehicleTypes = async (req, res) => {
    try {
        const { wheelCount } = req.query;

        const vehicleTypes = await VehicleData.findAll({
            where: wheelCount ? { wheelCount: parseInt(wheelCount) } : {},
            attributes: ['id', 'name', 'wheelCount']
        });

        return res.status(200).json({
            success: true,
            data: vehicleTypes
        });
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicle types',
            error: error.message
        });
    }
};

// get specific vehicle by id 

export const getVehicleTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicleType = await VehicleData.findByPk(id);

        if (!vehicleType) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle type not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: vehicleType
        });
    } catch (error) {
        console.error('Error fetching vehicle type:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicle type',
            error: error.message
        });
    }
};

// get Vehicle info based on typeid 


export const getVehiclesInfoByType = async (req, res) => {
    try {
        const { typeId } = req.params;

        const vehicleInfo = await VehicleInfo.findAll({
            where: { vehicleDataId: typeId },
            include: [{
                model: VehicleData,
                attributes: ['name', 'wheelCount']
            }]
        });

        return res.status(200).json({
            success: true,
            data: vehicleInfo
        });
    } catch (error) {
        console.error('Error fetching vehicles by type:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicles',
            error: error.message
        });
    }
};

// get specific vehicleinfo by id

export const getVehicleInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await VehicleInfo.findByPk(id, {
            include: [{
                model: VehicleData,
                attributes: ['name', 'wheelCount']
            }]
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: vehicle
        });
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicle',
            error: error.message
        });
    }
};