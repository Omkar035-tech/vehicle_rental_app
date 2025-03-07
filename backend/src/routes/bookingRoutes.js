import express from 'express';
import { checkAvailability, createBooking, getAllBookings, getBookingById, cancelBooking } from "../controllers/bookingcontroller.js";
import { validateAvailabilityCheck, validateBookingInput, validateIdParam, } from "../middlewares/validation.js"
const router = express.Router();
/**
 * @route   GET /api/bookings/check-availability
 * @desc    Check vehicle availability for given date range
 * @access  Public
 */
router.get('/check-availability', validateAvailabilityCheck, checkAvailability);

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', validateBookingInput, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings
 * @access  Public
 */
router.get('/', getAllBookings);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 * @access  Public
 */
router.get('/:id', validateIdParam, getBookingById);

/**
 * @route   GET /api/bookings/cancel/:id
 * @desc    cancle ride booking by ID
 * @access  Public
 */
router.get('/cancel/:id', cancelBooking);

export default router;