// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const BookingContext = createContext();

// export const useBookingContext = () => useContext(BookingContext);

// export const BookingProvider = ({ children }) => {
//     const [formData, setFormData] = useState(() => {
//         const savedState = localStorage.getItem('bookingFormState');
//         return savedState ? JSON.parse(savedState) : {
//             activeStep: 0,
//             formValues: {
//                 firstName: '',
//                 lastName: '',
//                 wheels: '',
//                 vehicleTypeId: '',
//                 vehicleModelId: '',
//                 dateRange: [null, null]
//             },
//             vehicleTypes: [],
//             vehicleModels: [],
//             vehicleAvailable: null,
//             isSubmitting: false,
//             isCheckingAvailability: false
//         };
//     });

//     useEffect(() => {
//         localStorage.setItem('bookingFormState', JSON.stringify(formData));
//     }, [formData]);

//     const updateFormValues = (name, value) => {
//         setFormData(prevState => ({
//             ...prevState,
//             formValues: {
//                 ...prevState.formValues,
//                 [name]: value
//             }
//         }));
//     };

//     const setActiveStep = (step) => {
//         setFormData(prevState => ({
//             ...prevState,
//             activeStep: step
//         }));
//     };

//     const setVehicleTypes = (types) => {
//         setFormData(prevState => ({
//             ...prevState,
//             vehicleTypes: types
//         }));
//     };

//     const setVehicleModels = (models) => {
//         setFormData(prevState => ({
//             ...prevState,
//             vehicleModels: models
//         }));
//     };

//     const setVehicleAvailable = (isAvailable) => {
//         setFormData(prevState => ({
//             ...prevState,
//             vehicleAvailable: isAvailable
//         }));
//     };

//     const setIsSubmitting = (isSubmitting) => {
//         setFormData(prevState => ({
//             ...prevState,
//             isSubmitting
//         }));
//     };

//     const setIsCheckingAvailability = (isChecking) => {
//         setFormData(prevState => ({
//             ...prevState,
//             isCheckingAvailability: isChecking
//         }));
//     };

//     // Reset the form
//     const resetForm = () => {
//         setFormData({
//             activeStep: 0,
//             formValues: {
//                 firstName: '',
//                 lastName: '',
//                 wheels: '',
//                 vehicleTypeId: '',
//                 vehicleModelId: '',
//                 dateRange: [null, null]
//             },
//             vehicleTypes: [],
//             vehicleModels: [],
//             vehicleAvailable: null,
//             isSubmitting: false,
//             isCheckingAvailability: false
//         });
//     };

//     const value = {
//         ...formData,
//         updateFormValues,
//         setActiveStep,
//         setVehicleTypes,
//         setVehicleModels,
//         setVehicleAvailable,
//         setIsSubmitting,
//         setIsCheckingAvailability,
//         resetForm
//     };

//     return (
//         <BookingContext.Provider value={value}>
//             {children}
//         </BookingContext.Provider>
//     );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        try {
            const savedState = localStorage.getItem('bookingFormState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);

                // Ensure dateRange has proper Date objects if stored as strings
                if (parsedState.formValues.dateRange && Array.isArray(parsedState.formValues.dateRange)) {
                    parsedState.formValues.dateRange = parsedState.formValues.dateRange.map(date =>
                        date ? new Date(date) : null
                    );
                }

                return parsedState;
            }
        } catch (error) {
            console.error("Error loading form state from localStorage:", error);
            localStorage.removeItem('bookingFormState');  // Clear corrupted data
        }

        // Default initial state if nothing in localStorage or error parsing
        return {
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

    // Save form state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('bookingFormState', JSON.stringify(formData));
        } catch (error) {
            console.error("Error saving form state to localStorage:", error);
        }
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

    // Reset the form completely
    const resetForm = () => {
        // First, remove from localStorage
        localStorage.removeItem('bookingFormState');

        // Then reset state to defaults
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