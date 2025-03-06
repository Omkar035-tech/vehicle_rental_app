import { NavLink, useLocation } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';
import DynamicModal from './DynamicModal';

const Navbar = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const vehicleFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'wheelCount', label: 'Wheel Count', type: 'number', required: true },
        { name: 'vehiclePlaceholder', label: 'Vehicle Placeholder', type: 'text' },
        { name: 'model', label: 'Model', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text', required: true },
        { name: 'releasedIn', label: 'Released In', type: 'number', required: true },
        { name: 'dailyCost', label: 'Daily Cost', type: 'text', required: true },
        { name: 'vehicleImage', label: 'Vehicle Image URL', type: 'text', required: true },
    ];

    const handleSubmit = (formData) => {
        console.log('Form Data Submitted:', formData);
        // Handle form submission (e.g., send data to an API)
    };

    console.log('isModalOpen:', isModalOpen); // Debugging

    return (
        <div>
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
                        <NavLink to="/about" className={location.pathname === '/about' ? 'nav-link' : ''}>
                            About
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
                            console.log('Button clicked'); // Debugging
                            setIsModalOpen(true);
                        }}
                        className="bg-black flex justify-center items-center text-white hover:bg-gray-800 rounded-xl outline-0 font-semibold px-4 py-3"
                    >
                        <CirclePlus size={18} className="mr-2 cursor-pointer" /> Add Vehicle
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