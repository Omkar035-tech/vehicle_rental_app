import express from 'express';
import { getVehicleInfoById, getVehicleTypeById, getVehicleTypes, getVehiclesInfoByType, createVehicle } from '../controllers/vehiclecontroller.js';

const router = express.Router();

/**
 * @route   GET /api/vehicles/types
 * @desc    Get all vehicle types or filter by wheel count
 * @access  Public
 */

router.get('/types', getVehicleTypes);

/**
 * @route   GET /api/vehicles/types/:id
 * @desc    Get specific vehicle type by ID
 * @access  Public
 */
router.get('/types/:id', getVehicleTypeById);

/**
 * @route   GET /api/vehicles/byType/:typeId
 * @desc    Get vehicles by type ID
 * @access  Public
 */
router.get('/byType/:typeId', getVehiclesInfoByType);

/**
 * @route   GET /api/vehicles/:id
 * @desc    Get specific vehicle by ID
 * @access  Public
 */
router.get('/:id', getVehicleInfoById);

/**
 * @route   POST /api/vehicles/create
 * @desc    Create vehicledata and vehicleinfo
 * @access  Public
 */
router.post('/create', createVehicle);

export default router;