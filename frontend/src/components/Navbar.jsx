
import { NavLink, useLocation } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DynamicModal from './DynamicModal';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleFields, setVehicleFields] = useState([
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: "wheelCount",
            label: "Wheel Count",
            fieldType: "select",
            options: [
                { value: 2, label: "2 wheeler" },
                { value: 4, label: "4 wheeler" }
            ],
            required: true,
        },
        { name: 'vehiclePlaceholder', label: 'Vehicle Placeholder Image', type: 'text' },
        { name: 'model', label: 'Model', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text', required: true },
        { name: 'releasedIn', label: 'Released In', type: 'number', required: true },
        { name: 'dailyCost', label: 'Daily Cost', type: 'text', required: true },
        { name: 'vehicleImage', label: 'Vehicle Image URL', type: 'text', required: true },
    ]);

    const fetchVehicleTypes = async () => {
        try {
            const response = await fetch("https://vehiclerentalapp-production.up.railway.app/api/vehicles/types");
            const data = await response.json();

            if (data.data && Array.isArray(data.data)) {
                setVehicleTypes(data.data);

                // Update the name and vehiclePlaceholder fields to use the fetched data
                setVehicleFields(prevFields => {
                    return prevFields.map(field => {
                        if (field.name === 'name') {
                            return {
                                ...field,
                                fieldType: "select",
                                options: data.data.map(type => ({
                                    value: type.name,
                                    label: type.name
                                }))
                            };
                        } else if (field.name === 'vehiclePlaceholder') {
                            return {
                                ...field,
                                fieldType: "select",
                                options: data.data.map(type => ({
                                    value: type.placeholderImage,
                                    label: `${type.name} Placeholder`
                                }))
                            };
                        }
                        return field;
                    });
                });
            }
        } catch (error) {
            console.error("Error fetching vehicle types:", error);
        }
    };
    useEffect(() => {
        fetchVehicleTypes();
    }, []);

    const handleSubmit = async (formData) => {
        const DataToPost = {
            name: formData.name,
            wheelCount: formData.wheelCount,
            model: formData.model,
            company: formData.company,
            releasedIn: formData.releasedIn,
            dailyCost: formData.dailyCost,
            vehicleImg: formData.vehicleImage,
            placeImg: formData.vehiclePlaceholder,
        }

        const response = await fetch("https://vehiclerentalapp-production.up.railway.app/api/vehicles/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DataToPost)
        });
        const data = await response.json();
        if (data.status) {
            toast.success(data.message)
            setIsModalOpen(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex justify-between items-center p-4 bg-gray-100 mx-7 my-5 rounded-xl nav">
                <div className="flex items-center space-x-12 justify-between">
                    <img
                        src="https://i.ibb.co/mr4xrwhX/logo.png"
                        alt="logo"
                        width="100"
                        height="100"
                    />
                    <div className="flex space-x-12 font-semibold text-gray-600 text-lg">
                        <NavLink to="/" className={location.pathname === '/' ? 'nav-link' : ''}>
                            Home
                        </NavLink>
                        <NavLink to="/bookings" className={location.pathname === '/bookings' ? 'nav-link' : ''}>
                            Bookings
                        </NavLink>
                        <NavLink to="/contact" className={location.pathname === '/contact' ? 'nav-link' : ''}>
                            Contact
                        </NavLink>
                        <NavLink to="/support" className={location.pathname === '/support' ? 'nav-link' : ''}>
                            Support
                        </NavLink>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            fetchVehicleTypes();
                            setIsModalOpen(true);
                        }}
                        className="bg-black flex justify-center items-center text-white hover:bg-gray-800 rounded-xl outline-0 font-semibold px-4 py-3"
                    >
                        <CirclePlus size={18} className="mr-2 cursor-pointer" /> Insert Vehicle Data
                    </button>
                </div>
            </div>
            <DynamicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title="Add Vehicle"
                fields={vehicleFields}
            />
        </div>
    );
};

export default Navbar;