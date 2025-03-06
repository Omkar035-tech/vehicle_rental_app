import React, { createContext, useContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const savedState = localStorage.getItem('bookingFormState');
        return savedState ? JSON.parse(savedState) : {
            activeStep: 0,
            formValues: {
                firstName: '',
                lastName: '',
                wheels: '',
                vehicleTypeId: '',
                vehicleModelId: '',
                dateRange: [null, null]
            },
            vehicleTypes: [],
            vehicleModels: [],
            vehicleAvailable: null,
            isSubmitting: false,
            isCheckingAvailability: false
        };
    });

    useEffect(() => {
        localStorage.setItem('bookingFormState', JSON.stringify(formData));
    }, [formData]);

    const updateFormValues = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            formValues: {
                ...prevState.formValues,
                [name]: value
            }
        }));
    };

    const setActiveStep = (step) => {
        setFormData(prevState => ({
            ...prevState,
            activeStep: step
        }));
    };

    const setVehicleTypes = (types) => {
        setFormData(prevState => ({
            ...prevState,
            vehicleTypes: types
        }));
    };

    const setVehicleModels = (models) => {
        setFormData(prevState => ({
            ...prevState,
            vehicleModels: models
        }));
    };

    const setVehicleAvailable = (isAvailable) => {
        setFormData(prevState => ({
            ...prevState,
            vehicleAvailable: isAvailable
        }));
    };

    const setIsSubmitting = (isSubmitting) => {
        setFormData(prevState => ({
            ...prevState,
            isSubmitting
        }));
    };

    const setIsCheckingAvailability = (isChecking) => {
        setFormData(prevState => ({
            ...prevState,
            isCheckingAvailability: isChecking
        }));
    };

    // Reset the form
    const resetForm = () => {
        setFormData({
            activeStep: 0,
            formValues: {
                firstName: '',
                lastName: '',
                wheels: '',
                vehicleTypeId: '',
                vehicleModelId: '',
                dateRange: [null, null]
            },
            vehicleTypes: [],
            vehicleModels: [],
            vehicleAvailable: null,
            isSubmitting: false,
            isCheckingAvailability: false
        });
    };

    const value = {
        ...formData,
        updateFormValues,
        setActiveStep,
        setVehicleTypes,
        setVehicleModels,
        setVehicleAvailable,
        setIsSubmitting,
        setIsCheckingAvailability,
        resetForm
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};