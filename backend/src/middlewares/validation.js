import { body, query, param, validationResult } from 'express-validator';

//Validate booking input of usre and from server side

export const validateBookingInput = [
    body('vehicleId')
        .isInt()
        .withMessage('Vehicle ID must be an integer'),

    body('startDate')
        .isDate()
        .withMessage('Start date must be a valid date'),

    body('endDate')
        .isDate()
        .withMessage('End date must be a valid date')
        .custom((endDate, { req }) => {
            const startDate = new Date(req.body.startDate);
            const endDateObj = new Date(endDate);
            if (endDateObj <= startDate) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    body('customerFirstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),

    body('customerLastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

//Validate availability check queries

export const validateAvailabilityCheck = [
    query('vehicleId')
        .isInt()
        .withMessage('Vehicle ID must be an integer'),

    query('startDate')
        .isDate()
        .withMessage('Start date must be a valid date'),

    query('endDate')
        .isDate()
        .withMessage('End date must be a valid date')
        .custom((endDate, { req }) => {
            const startDate = new Date(req.query.startDate);
            const endDateObj = new Date(endDate);
            if (endDateObj <= startDate) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

//Validate ID parameter

export const validateIdParam = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];