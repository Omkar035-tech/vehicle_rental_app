import express from 'express';
import { checkAvailability, createBooking, getAllBookings, getBookingById } from "../controllers/bookingcontroller.js";
const router = express.Router();

/**
 * @route   GET /api/bookings/check-availability
 * @desc    Check vehicle availability for given date range
 * @access  Public
 */
router.get('/check-availability', checkAvailability);

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', createBooking);

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
router.get('/:id', getBookingById);

export default router;