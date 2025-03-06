import { Booking, VehicleInfo } from '../models/index.js';
import { Op } from 'sequelize';

export const checkAvailability = async (req, res) => {
    try {
        const { vehicleId, startDate, endDate } = req.query;
        console.log(vehicleId, startDate, endDate)
        if (!vehicleId || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle ID, start date and end date are required'
            });
        }

        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate date range
        if (start >= end) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Check if the vehicle exists
        const vehicle = await VehicleInfo.findByPk(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check for overlapping bookings
        const overlappingBookings = await Booking.findAll({
            where: {
                vehicleId,
                status: 'CONFIRMED', // Only check confirmed bookings
                [Op.or]: [
                    {
                        // Start date falls within existing booking
                        startDate: {
                            [Op.lte]: end
                        },
                        endDate: {
                            [Op.gte]: start
                        }
                    }
                ]
            }
        });

        const isAvailable = overlappingBookings.length === 0;

        return res.status(200).json({
            success: true,
            data: {
                isAvailable,
                overlappingBookings: isAvailable ? [] : overlappingBookings
            }
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to check availability',
            error: error.message
        });
    }
};

//Create a new booking

export const createBooking = async (req, res) => {
    try {
        const {
            vehicleId,
            startDate,
            endDate,
            customerFirstName,
            customerLastName
        } = req.body;

        // Validate required fields
        if (!vehicleId || !startDate || !endDate || !customerFirstName || !customerLastName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required booking information'
            });
        }

        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate date range
        if (start >= end) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Check if the vehicle exists
        const vehicle = await VehicleInfo.findByPk(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check for overlapping bookings
        const overlappingBookings = await Booking.findAll({
            where: {
                vehicleId,
                status: 'CONFIRMED', // Only check confirmed bookings
                [Op.or]: [
                    {
                        // Start date falls within existing booking
                        startDate: {
                            [Op.lte]: end
                        },
                        endDate: {
                            [Op.gte]: start
                        }
                    }
                ]
            }
        });

        if (overlappingBookings.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Vehicle is not available for selected dates',
                overlappingBookings
            });
        }

        // Calculate rental duration in days
        const durationMs = end.getTime() - start.getTime();
        const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));

        // Calculate total price
        const totalPrice = durationDays * parseFloat(vehicle.dailyRate);

        // Create new booking
        const booking = await Booking.create({
            vehicleId,
            startDate: start,
            endDate: end,
            customerFirstName,
            customerLastName,
            totalPrice,
            status: 'CONFIRMED'
        });

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
};

// Get all bookings

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Vehicle }]
        });

        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

//Get booking by ID

export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByPk(id, {
            include: [{ model: Vehicle }]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
};