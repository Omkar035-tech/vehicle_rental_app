import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Tag, User } from 'lucide-react';
import DynamicModal from '../components/DynamicModal';
import { ToastContainer, toast } from 'react-toastify';

const VehicleBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const vehicleFields = [];

    const handleSubmit = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:3001/api/bookings/cancel/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.success) {
            toast.success(data.message)
            fetchBookings();
        } else {
            toast.error(data.message)
        }
    };

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data.data);
        } catch (err) {
            setError(err.message);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);

    const calculateTotalPrice = (startDate, endDate, dailyCost) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return (days * parseFloat(dailyCost)).toFixed(2);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const toggleBookingDetails = (id) => {
        if (selectedBooking === id) {
            setSelectedBooking(null);
        } else {
            setSelectedBooking(id);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Vehicle Bookings</h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && !loading && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                {!loading && bookings.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No bookings found</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {bookings.map(booking => {
                        const totalPrice = calculateTotalPrice(
                            booking.startDate,
                            booking.endDate,
                            booking.VehicleInfo.dailyCost
                        );

                        return (
                            <div
                                key={booking.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                            >
                                <div
                                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
                                    onClick={() => toggleBookingDetails(booking.id)}
                                >
                                    <div className="md:w-1/6 flex justify-center">
                                        <img
                                            src={booking.VehicleInfo.vehicleImg ? booking.VehicleInfo.vehicleImg : "https://i.ibb.co/KcgZtDrh/pngwing-com.png"}
                                            alt={`${booking.VehicleInfo.company} ${booking.VehicleInfo.model}`}
                                            className="h-20 object-contain"
                                        />
                                    </div>

                                    <div className="md:w-5/6">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {booking.VehicleInfo.company} {booking.VehicleInfo.model} ({booking.VehicleInfo.releasedIn})
                                            </h2>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Booking Period</p>
                                                    <p className="font-medium">
                                                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <User className="w-5 h-5 text-gray-500 mr-2" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Customer</p>
                                                    <p className="font-medium">{booking.customerFirstName} {booking.customerLastName}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Total Price</p>
                                                    <p className="font-medium">${booking.totalPrice == totalPrice ? booking.totalPrice : totalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedBooking === booking.id && (
                                    <div className="px-6 pb-6 border-t border-gray-100 pt-4 bg-gray-50">
                                        <h3 className="font-semibold text-gray-800 mb-3">Booking Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Booking ID</p>
                                                <p className="font-medium">{booking.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Vehicle ID</p>
                                                <p className="font-medium">{booking.vehicleId}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Daily Cost</p>
                                                <p className="font-medium">${booking.VehicleInfo.dailyCost}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Created At</p>
                                                <p className="font-medium">{new Date(booking.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <p className="font-medium">{new Date(booking.updatedAt).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-2">
                                            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                                Edit Booking
                                            </button> */}
                                            {
                                                booking.status == "CONFIRMED" ?
                                                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" onClick={() => {
                                                        console.log('Button clicked');
                                                        setIsModalOpen(true);
                                                    }}>
                                                        Cancel Booking
                                                    </button> : false
                                            }
                                        </div>
                                        <DynamicModal
                                            isOpen={isModalOpen}
                                            onClose={() => setIsModalOpen(false)}
                                            onSubmit={() => { handleSubmit(booking.id) }}
                                            title={`Are You sure You Want to Cancle Your Ride from  ${formatDate(booking.startDate)} to ${formatDate(booking.endDate)} of ${booking.VehicleInfo.company} ${booking.VehicleInfo.model}  `}
                                            fields={vehicleFields}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VehicleBookings;