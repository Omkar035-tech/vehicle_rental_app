import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
    Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import CustomRadioCardGroup from './RadioCard';
import CustomDateRangePicker from './CustomDateRangePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBookingContext } from '../context/BookingContext';

// Dummy data for wheel options
const wheelOptions = [
    {
        value: "2",
        label: "2 Wheels",
        description: "Perfect for motorcycles and bikes",
        image: "https://cdn3d.iconscout.com/3d/premium/thumb/motorcycle-3d-icon-download-in-png-blend-fbx-gltf-file-formats--transportation-transport-vehicle-land-sea-pack-icons-8949619.png"
    },
    {
        value: "4",
        label: "4 Wheels",
        description: "Standard for cars and small trucks",
        image: "https://cdn3d.iconscout.com/3d/premium/thumb/car-3d-icon-download-in-png-blend-fbx-gltf-file-formats--trip-vehicle-transport-holiday-and-travel-pack-holidays-icons-8662797.png"
    }
];

// Form steps
const steps = [
    'Your Name',
    'Number of Wheels',
    'Type of Vehicle',
    'Specific Model',
    'Booking Dates',
    'Confirmation'
];

const BookingForm = () => {
    // Use the booking context
    const {
        activeStep,
        formValues,
        vehicleTypes,
        vehicleModels,
        vehicleAvailable,
        isSubmitting,
        isCheckingAvailability,
        updateFormValues,
        setActiveStep,
        setVehicleTypes,
        setVehicleModels,
        setVehicleAvailable,
        setIsSubmitting,
        setIsCheckingAvailability,
        resetForm
    } = useBookingContext();

    // Form validation schema with Yup
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        wheels: Yup.string().required('Please select the number of wheels'),
        vehicleTypeId: Yup.number().when('wheels', {
            is: wheels => wheels,
            then: schema => schema.required('Please select a vehicle type')
        }),
        vehicleModelId: Yup.number().when('vehicleTypeId', {
            is: vehicleTypeId => vehicleTypeId,
            then: schema => schema.required('Please select a vehicle model')
        }),
        dateRange: Yup.array()
            .of(Yup.date())
            .min(2, 'Both start and end dates are required')
            .test(
                'date-range-valid',
                'End date must be after start date',
                function (value) {
                    if (!value || value.length !== 2) return true;
                    if (!value[0] || !value[1]) return true;
                    return value[1] > value[0];
                }
            )
            .required('Booking dates are required')
    });

    // Initialize formik with context values
    const formik = useFormik({
        initialValues: formValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Get vehicle type and model details for the final output
                const selectedType = vehicleTypes.find(type => type.id === values.vehicleTypeId);
                const selectedModel = vehicleModels.find(model => model.id === values.vehicleModelId);

                const bookingDetails = {
                    ...values,
                    vehicleType: selectedType?.name || '',
                    vehicleModel: selectedModel ? `${selectedModel.company} ${selectedModel.model}` : '',
                    dailyCost: selectedModel?.dailyCost || '0.00'
                };

                const DataToPost = {
                    vehicleId: values.vehicleModelId,
                    startDate: values.dateRange[0].toISOString().split('T')[0],
                    endDate: values.dateRange[1].toISOString().split('T')[0],
                    customerFirstName: values.firstName,
                    customerLastName: values.lastName
                }

                const response = await fetch("http://localhost:3001/api/bookings", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(DataToPost)
                });
                const data = await response.json();
                if (data.success) {
                    toast.success('Booking successful!');
                    resetForm();
                    formik.resetForm();
                } else {
                    toast.error('Sorry, this vehicle is not available for the selected dates.');
                    // resetForm();
                }
                setIsSubmitting(false);
            } catch (error) {
                console.error('Submission error:', error);
                toast.error('Error submitting booking. Please try again.');
                setIsSubmitting(false);
            }
        }
    });

    // Update context whenever formik values change
    useEffect(() => {
        Object.keys(formik.values).forEach(key => {
            if (JSON.stringify(formik.values[key]) !== JSON.stringify(formValues[key])) {
                updateFormValues(key, formik.values[key]);
            }
        });
    }, [formik.values]);

    // Check vehicle availability
    const checkVehicleAvailability = async () => {
        if (!formik.values.vehicleModelId || !formik.values.dateRange[0] || !formik.values.dateRange[1]) {
            return false;
        }

        setIsCheckingAvailability(true);
        try {
            // Format dates for API call
            const startDate = formik.values.dateRange[0].toISOString().split('T')[0];
            const endDate = formik.values.dateRange[1].toISOString().split('T')[0];
            const vehicleId = formik.values.vehicleModelId;

            const params = new URLSearchParams({
                startDate: startDate,
                endDate: endDate,
                vehicleId: vehicleId
            });

            const response = await fetch(`http://localhost:3001/api/bookings/check-availability?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Data:', data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const isAvailable = data.data.isAvailable;
            setVehicleAvailable(isAvailable);

            if (isAvailable) {
                toast.success('Vehicle is available for the selected dates!');
            } else {
                toast.error('Sorry, this vehicle is not available for the selected dates.');
            }

            setIsCheckingAvailability(false);
            return isAvailable;

        } catch (error) {
            console.error('Error checking availability:', error);
            toast.error('Error checking vehicle availability. Please try again.');
            setIsCheckingAvailability(false);
            return false;
        }
    };

    // Update vehicle types when wheels selection changes
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            if (formik.values.wheels) {
                try {
                    // For demo purposes, create some sample vehicle types based on wheel count
                    const wheelCount = parseInt(formik.values.wheels);
                    const params = new URLSearchParams({
                        wheelCount: wheelCount,
                    });
                    const response = await fetch(`http://localhost:3001/api/vehicles/types?${params.toString()}`,
                        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
                    );
                    const data = await response.json();
                    const filteredTypes = data.data.filter(type => type.wheelCount == wheelCount);
                    setVehicleTypes(filteredTypes);

                    // Reset vehicle type and model when wheels change
                    formik.setFieldValue('vehicleTypeId', '');
                    formik.setFieldValue('vehicleModelId', '');
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchVehicleTypes();
    }, [formik.values.wheels]);

    // Update vehicle models when vehicle type changes
    useEffect(() => {
        const fetchVehicleModels = async () => {
            if (formik.values.vehicleTypeId) {
                try {
                    // For demo purposes, create some sample vehicle models based on type
                    const typeId = parseInt(formik.values.vehicleTypeId);
                    // let models = [];

                    // switch (typeId) {
                    //     case 1: // Motorcycle
                    //         models = [
                    //             { id: 101, company: 'Honda', model: 'CBR', releasedIn: 2022, dailyCost: '45.00', vehicleDataId: 1, VehicleDatum: { wheelCount: 2 } },
                    //             { id: 102, company: 'Yamaha', model: 'R1', releasedIn: 2023, dailyCost: '50.00', vehicleDataId: 1, VehicleDatum: { wheelCount: 2 } }
                    //         ];
                    //         break;
                    //     case 2: // Scooter
                    //         models = [
                    //             { id: 201, company: 'Vespa', model: 'Primavera', releasedIn: 2022, dailyCost: '30.00', vehicleDataId: 2, VehicleDatum: { wheelCount: 2 } },
                    //             { id: 202, company: 'Honda', model: 'Activa', releasedIn: 2023, dailyCost: '25.00', vehicleDataId: 2, VehicleDatum: { wheelCount: 2 } }
                    //         ];
                    //         break;
                    //     case 3: // Sedan
                    //         models = [
                    //             { id: 301, company: 'Toyota', model: 'Camry', releasedIn: 2022, dailyCost: '75.00', vehicleDataId: 3, VehicleDatum: { wheelCount: 4 } },
                    //             { id: 302, company: 'Honda', model: 'Accord', releasedIn: 2023, dailyCost: '70.00', vehicleDataId: 3, VehicleDatum: { wheelCount: 4 } }
                    //         ];
                    //         break;
                    //     case 4: // SUV
                    //         models = [
                    //             { id: 401, company: 'Toyota', model: 'RAV4', releasedIn: 2022, dailyCost: '85.00', vehicleDataId: 4, VehicleDatum: { wheelCount: 4 } },
                    //             { id: 402, company: 'Honda', model: 'CR-V', releasedIn: 2023, dailyCost: '80.00', vehicleDataId: 4, VehicleDatum: { wheelCount: 4 } }
                    //         ];
                    //         break;
                    //     case 5: // Truck
                    //         models = [
                    //             { id: 501, company: 'Ford', model: 'F-150', releasedIn: 2022, dailyCost: '95.00', vehicleDataId: 5, VehicleDatum: { wheelCount: 4 } },
                    //             { id: 502, company: 'Chevrolet', model: 'Silverado', releasedIn: 2023, dailyCost: '90.00', vehicleDataId: 5, VehicleDatum: { wheelCount: 4 } }
                    //         ];
                    //         break;
                    // }

                    const response = await fetch(`http://localhost:3001/api/vehicles/byType/${typeId}`,
                        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
                    );
                    const data = await response.json();
                    const filteredModels = data.data.filter(model => model.vehicleDataId == typeId);
                    console.log('Filtered models:', filteredModels);
                    setVehicleModels(filteredModels);

                    // Reset vehicle model when type changes
                    formik.setFieldValue('vehicleModelId', '');
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchVehicleModels();
    }, [formik.values.vehicleTypeId]);

    // Reset vehicle availability when selection changes
    useEffect(() => {
        setVehicleAvailable(null);
    }, [formik.values.vehicleModelId, formik.values.dateRange]);

    // Convert vehicle types to radio card options format
    const getVehicleTypeOptions = () => {
        return vehicleTypes.map(type => ({
            value: type.id.toString(),
            label: type.name,
            description: `${type.wheelCount}-wheel vehicle type`,
            image: type.wheelCount == 4 ? `https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg` : `https://www.algonquinequipment.ca/wp-content/uploads/2017/11/moto-placeholder.png`,
        }));
    };

    // Convert vehicle models to radio card options format
    const getVehicleModelOptions = () => {
        return vehicleModels.map(model => ({
            value: model.id.toString(),
            label: `${model.company} ${model.model}`,
            description: `Released: ${model.releasedIn} - Daily Cost: $${model.dailyCost}`,
            image: model.VehicleDatum.wheelCount == 4 ? `https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg` : `https://www.algonquinequipment.ca/wp-content/uploads/2017/11/moto-placeholder.png`,
        }));
    };

    const handleNext = async () => {
        let canProceed = false;

        switch (activeStep) {
            case 0:
                // Name step
                if (formik.values.firstName && formik.values.lastName &&
                    !formik.errors.firstName && !formik.errors.lastName) {
                    canProceed = true;
                }
                break;
            case 1:
                // Wheels step
                if (formik.values.wheels && !formik.errors.wheels) {
                    canProceed = true;
                }
                break;
            case 2:
                // Vehicle type step
                if (formik.values.vehicleTypeId && !formik.errors.vehicleTypeId) {
                    canProceed = true;
                }
                break;
            case 3:
                // Vehicle model step
                if (formik.values.vehicleModelId && !formik.errors.vehicleModelId) {
                    canProceed = true;
                }
                break;
            case 4:
                // Date range step
                if (formik.values.dateRange[0] && formik.values.dateRange[1] && !formik.errors.dateRange) {
                    // Check vehicle availability before proceeding
                    await checkVehicleAvailability();
                    canProceed = true;
                }
                break;
            case 5:
                // Confirmation step - submit if vehicle is available
                if (vehicleAvailable) {
                    formik.handleSubmit();
                    return;
                }
                break;
            default:
                break;
        }

        if (canProceed) {
            setActiveStep(activeStep + 1);
        } else {
            // Mark fields as touched to show validation errors
            switch (activeStep) {
                case 0:
                    formik.setFieldTouched('firstName', true);
                    formik.setFieldTouched('lastName', true);
                    break;
                case 1:
                    formik.setFieldTouched('wheels', true);
                    break;
                case 2:
                    formik.setFieldTouched('vehicleTypeId', true);
                    break;
                case 3:
                    formik.setFieldTouched('vehicleModelId', true);
                    break;
                case 4:
                    formik.setFieldTouched('dateRange', true);
                    break;
                default:
                    break;
            }
        }
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box component={motion.div}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            What is your name?
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                margin="normal"
                            />
                        </Box>
                    </Box>
                );

            case 1:
                return (
                    <CustomRadioCardGroup
                        formik={formik}
                        name="wheels"
                        label="Number of wheels"
                        options={wheelOptions}
                    />
                );

            case 2:
                return (
                    <CustomRadioCardGroup
                        formik={formik}
                        name="vehicleTypeId"
                        label="Type of vehicle"
                        options={getVehicleTypeOptions()}
                    />
                );

            case 3:
                return (
                    <CustomRadioCardGroup
                        formik={formik}
                        name="vehicleModelId"
                        label="Select a model"
                        options={getVehicleModelOptions()}
                    />
                );

            case 4:
                return (
                    <CustomDateRangePicker formik={formik} />
                );

            case 5:
                // Confirmation step with availability status
                const selectedType = vehicleTypes.find(type => type.id === parseInt(formik.values.vehicleTypeId));
                const selectedModel = vehicleModels.find(model => model.id === parseInt(formik.values.vehicleModelId));

                // Convert date objects to strings if needed
                let startDate = formik.values.dateRange[0];
                let endDate = formik.values.dateRange[1];

                if (startDate && typeof startDate !== 'string') {
                    startDate = startDate.toLocaleDateString();
                }

                if (endDate && typeof endDate !== 'string') {
                    endDate = endDate.toLocaleDateString();
                }

                return (
                    <Box component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Booking Summary
                        </Typography>

                        <Box sx={{ mt: 2, mb: 3 }}>
                            <Typography variant="body1">
                                <strong>Name:</strong> {formik.values.firstName} {formik.values.lastName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Vehicle Type:</strong> {selectedType?.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Vehicle Model:</strong> {selectedModel ? `${selectedModel.company} ${selectedModel.model}` : ''}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Daily Cost:</strong> ${selectedModel?.dailyCost}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Booking Period:</strong> {startDate} to {endDate}
                            </Typography>
                        </Box>

                        {isCheckingAvailability ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <CircularProgress />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    Checking availability...
                                </Typography>
                            </Box>
                        ) : (
                            vehicleAvailable !== null && (
                                <Alert
                                    severity={vehicleAvailable ? "success" : "error"}
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    {vehicleAvailable
                                        ? "Vehicle is available for the selected dates!"
                                        : "Sorry, this vehicle is not available for the selected dates."}
                                </Alert>
                            )
                        )}

                        {!vehicleAvailable && vehicleAvailable !== null && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Please go back and modify your selection or choose different dates.
                            </Typography>
                        )}
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <ToastContainer position="top-right" autoClose={5000} />
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    background: 'linear-gradient(to right, #f5f7fa, #ffffff)'
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Vehicle Booking
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={formik.handleSubmit}>
                    {renderStepContent()}

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        {activeStep > 0 && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    // If not available in confirmation step, go back to vehicle selection
                                    if (activeStep === 5 && vehicleAvailable === false) {
                                        setActiveStep(1); // Go back to wheels selection
                                    } else {
                                        setActiveStep(activeStep - 1);
                                    }
                                }}
                                disabled={isSubmitting || isCheckingAvailability}
                            >
                                {activeStep === 5 && vehicleAvailable === false ? "Change Selection" : "Back"}
                            </Button>
                        )}
                        <Box sx={{ flex: '1 1 auto' }} />

                        {/* Next/Check/Submit Button */}
                        {(activeStep < 5 || (activeStep === 5 && vehicleAvailable === true)) && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={isSubmitting || isCheckingAvailability}
                                sx={{
                                    minWidth: '120px',
                                    position: 'relative'
                                }}
                            >
                                {isSubmitting || isCheckingAvailability ? (
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                ) : activeStep === 4 ? (
                                    <div>Check Availability</div>
                                ) : activeStep === 5 ? (
                                    <div>Complete Booking</div>
                                ) : (
                                    'Next'
                                )}
                            </Button>
                        )}

                        {/* Re-check availability button */}
                        {activeStep === 5 && vehicleAvailable !== true && !isCheckingAvailability && (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={checkVehicleAvailability}
                                disabled={isSubmitting}
                                sx={{ ml: 2 }}
                            >
                                Re-check Availability
                            </Button>
                        )}
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default BookingForm;