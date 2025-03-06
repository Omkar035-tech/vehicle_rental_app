import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText
} from '@mui/material';

// Custom Radio Card component
const RadioCard = ({ id, label, description, image, checked, onChange, value }) => {
    return (
        <label htmlFor={id} className="cursor-pointer">
            <input
                type="radio"
                name="radio-card"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                className="appearance-none"
            />
            <div className={`bg-white rounded-md max-w-[280px] min-h-[330px] p-4 grid shadow-sm transition-all duration-200 ${checked ? 'shadow-md ring-2 ring-[#3057d5]' : ''
                }`}>
                <span className={`relative w-5 h-5 inline-block rounded-full border-2 transition-all duration-200 ${checked ? 'bg-[#3057d5] border-[#3057d5] scale-110' : 'border-[#e3e3e3]'
                    }`}>
                    {checked && (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.93552 4.58423C0.890286 4.53718 0.854262 4.48209 0.829309 4.42179C0.779553 4.28741 0.779553 4.13965 0.829309 4.00527C0.853759 3.94471 0.889842 3.88952 0.93552 3.84283L1.68941 3.12018C1.73378 3.06821 1.7893 3.02692 1.85185 2.99939C1.91206 2.97215 1.97736 2.95796 2.04345 2.95774C2.11507 2.95635 2.18613 2.97056 2.2517 2.99939C2.31652 3.02822 2.3752 3.06922 2.42456 3.12018L4.69872 5.39851L9.58026 0.516971C9.62828 0.466328 9.68554 0.42533 9.74895 0.396182C9.81468 0.367844 9.88563 0.353653 9.95721 0.354531C10.0244 0.354903 10.0907 0.369582 10.1517 0.397592C10.2128 0.425602 10.2672 0.466298 10.3112 0.516971L11.0651 1.25003C11.1108 1.29672 11.1469 1.35191 11.1713 1.41247C11.2211 1.54686 11.2211 1.69461 11.1713 1.82899C11.1464 1.88929 11.1104 1.94439 11.0651 1.99143L5.06525 7.96007C5.02054 8.0122 4.96514 8.0541 4.90281 8.08294C4.76944 8.13802 4.61967 8.13802 4.4863 8.08294C4.42397 8.0541 4.36857 8.0122 4.32386 7.96007L0.93552 4.58423Z" fill="white" />
                            </svg>
                        </span>
                    )}
                </span>
                <div className="text-center">
                    {image && (
                        <img src={image} alt={label} className="mb-2 mx-auto" />
                    )}
                    <h4 className="text-base font-semibold text-[#1f2949] mb-2">{label}</h4>
                    <h5 className="text-sm leading-relaxed text-[#686d73]">{description}</h5>
                </div>
            </div>
        </label>
    );
};

// Main component that integrates with Material UI
const CustomRadioCardGroup = ({
    formik,
    name,
    label,
    options,
    gridClassName = "grid grid-flow-col gap-8 place-items-center place-content-center"
}) => {
    console.log('formik.values:', options); // Debugging
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FormControl component="fieldset" error={formik.touched[name] && Boolean(formik.errors[name])}>
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => {
                        formik.setFieldValue(name, e.target.value);
                    }}
                >
                    {/* Hidden MUI radio buttons (for form logic) */}
                    <div className="hidden">
                        {options.map((option) => (
                            <FormControlLabel
                                key={`hidden-${option.value}`}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </div>

                    {/* Custom styled radio cards */}
                    <div className={gridClassName}>
                        {options.map((option) => (
                            <RadioCard
                                key={option.value}
                                id={`radio-card-${option.value}`}
                                label={option.label}
                                description={option.description}
                                image={option.image}
                                value={option.value}
                                checked={formik.values[name] === option.value}
                                onChange={(e) => {
                                    formik.setFieldValue(name, e.target.value);
                                }}
                            />
                        ))}
                    </div>
                </RadioGroup>
                {formik.touched[name] && formik.errors[name] && (
                    <FormHelperText>{formik.errors[name]}</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default CustomRadioCardGroup;