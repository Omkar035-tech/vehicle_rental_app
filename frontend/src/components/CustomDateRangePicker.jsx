import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, FormHelperText, Button } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

const CustomDateRangePicker = ({ formik }) => {
    // Initialize state from formik values or with defaults
    const [dateState, setDateState] = useState([
        {
            startDate: formik.values.dateRange?.[0] || new Date(),
            endDate: formik.values.dateRange?.[1] || new Date(),
            key: 'selection'
        }
    ]);

    // Formatted dates for display
    const [formattedDates, setFormattedDates] = useState({
        startDate: format(dateState[0].startDate, 'MMM dd, yyyy'),
        endDate: format(dateState[0].endDate, 'MMM dd, yyyy')
    });

    // State to toggle the calendar visibility
    const [showCalendar, setShowCalendar] = useState(false);

    // Update formik when dates change
    useEffect(() => {
        formik.setFieldValue('dateRange', [dateState[0].startDate, dateState[0].endDate]);
    }, [dateState]);

    // Handle date changes
    const handleDateChange = (item) => {
        setDateState([item.selection]);
        setFormattedDates({
            startDate: format(item.selection.startDate, 'MMM dd, yyyy'),
            endDate: format(item.selection.endDate, 'MMM dd, yyyy')
        });
    };

    // Toggle calendar visibility
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <Typography variant="h6" gutterBottom>
                Select booking dates
            </Typography>

            {/* Date display and toggle button */}
            <Box
                className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer mb-2"
                onClick={toggleCalendar}
            >
                <span className="flex-1">
                    {formattedDates.startDate} to {formattedDates.endDate}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </Box>

            {/* Calendar dropdown */}
            {showCalendar && (
                <Box
                    className="absolute z-10 mt-1 bg-white shadow-lg rounded-md p-2 border border-gray-200"
                    component={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateState}
                        minDate={new Date()}
                    />
                    <Box className="flex justify-end mt-2">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={toggleCalendar}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Error message */}
            {formik.touched.dateRange && formik.errors.dateRange && (
                <FormHelperText error>{formik.errors.dateRange}</FormHelperText>
            )}
        </Box>
    );
};

export default CustomDateRangePicker;