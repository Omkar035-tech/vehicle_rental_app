// components/BookingForm.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormHelperText,
    Box,
    Stepper,
    Step,
    StepLabel,
    CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import CustomRadioCardGroup from './RadioCard';
import CustomDateRangePicker from './CustomDateRangePicker';

// Dummy data for vehicle types
const vehicleTypesData = [
    {
        "id": 1,
        "name": "Hatchback",
        "wheelCount": 4
    },
    {
        "id": 2,
        "name": "SUV",
        "wheelCount": 4
    },
    {
        "id": 3,
        "name": "Sedan",
        "wheelCount": 4
    },
    {
        "id": 4,
        "name": "Cruiser Bike",
        "wheelCount": 2
    }
];

// Dummy data for vehicle models
const vehicleModelsData = [
    {
        "id": 1,
        "model": "Civic",
        "company": "Honda",
        "releasedIn": 2022,
        "dailyCost": "500.00",
        "createdAt": "2025-03-06T12:04:38.506Z",
        "updatedAt": "2025-03-06T12:04:38.506Z",
        "vehicleDataId": 1,
        "VehicleDatum": {
            "name": "Hatchback",
            "wheelCount": 4
        }
    },
    {
        "id": 2,
        "model": "Tawero 350",
        "company": "Royal",
        "releasedIn": 2021,
        "dailyCost": "400.00",
        "createdAt": "2025-03-06T12:04:38.506Z",
        "updatedAt": "2025-03-06T12:04:38.506Z",
        "vehicleDataId": 4,
        "VehicleDatum": {
            "name": "Cruiser Bike",
            "wheelCount": 2
        }
    },
    {
        "id": 3,
        "model": "CR-V",
        "company": "Honda",
        "releasedIn": 2023,
        "dailyCost": "800.00",
        "createdAt": "2025-03-06T12:04:38.506Z",
        "updatedAt": "2025-03-06T12:04:38.506Z",
        "vehicleDataId": 2,
        "VehicleDatum": {
            "name": "SUV",
            "wheelCount": 4
        }
    },
    {
        "id": 4,
        "model": "Camry",
        "company": "Toyota",
        "releasedIn": 2022,
        "dailyCost": "600.00",
        "createdAt": "2025-03-06T12:04:38.506Z",
        "updatedAt": "2025-03-06T12:04:38.506Z",
        "vehicleDataId": 3,
        "VehicleDatum": {
            "name": "Sedan",
            "wheelCount": 4
        }
    }
];

// Sample images for wheel options
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
    'Booking Dates'
];

const BookingForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);

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

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            wheels: '',
            vehicleTypeId: '',
            vehicleModelId: '',
            dateRange: [null, null]
        },
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

                console.log('Form submitted:', bookingDetails);
                alert('Booking successful! Details: ' + JSON.stringify(bookingDetails, null, 2));
                setIsSubmitting(false);
                // Reset form after submission
                formik.resetForm();
                setActiveStep(0);
            } catch (error) {
                console.error('Submission error:', error);
                setIsSubmitting(false);
            }
        }
    });

    // Update vehicle types when wheels selection changes
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            if (formik.values.wheels) {
                try {
                    const response = await fetch('http://localhost:3001/api/vehicles/types');
                    const data = await response.json();
                    console.log(data.data);

                    const wheelCount = parseInt(formik.values.wheels);
                    const filteredTypes = data.data.filter(type => type.wheelCount == wheelCount);
                    setVehicleTypes(filteredTypes);

                    // Reset vehicle type and model when wheels change
                    formik.setFieldValue('vehicleTypeId', '');
                    formik.setFieldValue('vehicleModelId', '');
                } catch (error) {
                    console.log(error)
                }
            }
        };
        fetchVehicleTypes();
    }, [formik.values.wheels]);

    // Update vehicle models when vehicle type changes
    useEffect(() => {
        if (formik.values.vehicleTypeId) {
            const typeId = formik.values.vehicleTypeId;
            console.log('Selected vehicle type:', typeId);
            const filteredModels = vehicleModelsData.filter(model => model.vehicleDataId == typeId);
            console.log('Filtered models:', filteredModels);
            setVehicleModels(filteredModels);

            // Reset vehicle model when type changes
            formik.setFieldValue('vehicleModelId', '');
        }
    }, [formik.values.vehicleTypeId]);

    // Convert vehicle types to radio card options format
    const getVehicleTypeOptions = () => {
        return vehicleTypes.map(type => ({
            value: type.id.toString(),
            label: type.name,
            description: `${type.wheelCount}-wheel vehicle type`,
            image: `https://via.placeholder.com/150?text=${type.name}`
        }));

        // try {
        //     const response = await fetch('http://localhost:3001/api/vehicles/types');
        //     const data = await response.json();
        //     console.log(data.data);
        //     return  data.data.map(type => ({
        //         value: type.id.toString(),
        //         label: type.name,
        //         description: `${type.wheelCount}-wheel vehicle type`,
        //         image: `https://via.placeholder.com/150?text=${type.name}`
        //     }));
        // } catch (error) {
        //     console.log(error)
        // }
    };

    // Convert vehicle models to radio card options format
    const getVehicleModelOptions = () => {
        return vehicleModels.map(model => ({
            value: model.id.toString(),
            label: `${model.company} ${model.model}`,
            description: `Released: ${model.releasedIn} - Daily Cost: $${model.dailyCost}`,
            image: `https://via.placeholder.com/150?text=${model.company}+${model.model}`
        }));
    };

    const handleNext = () => {
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
                    formik.handleSubmit();
                    return;
                }
                break;
            default:
                break;
        }

        if (canProceed) {
            setActiveStep(prevStep => prevStep + 1);
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

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
                                onClick={() => setActiveStep(prevStep => prevStep - 1)}
                                disabled={isSubmitting}
                            >
                                Back
                            </Button>
                        )}
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={isSubmitting}
                            sx={{
                                minWidth: '120px',
                                position: 'relative'
                            }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default BookingForm;