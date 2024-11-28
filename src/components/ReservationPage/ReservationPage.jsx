import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaCalendarAlt,
    FaUsers,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaClock,
    FaTimes,
} from 'react-icons/fa';
import Calendar from 'react-calendar';
import './style.css';

const ReservationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [partySize, setPartySize] = useState(2);
    const [reservationDate, setReservationDate] = useState(new Date());
    const [reservationHour, setReservationHour] = useState('');
    const [reservationMinute, setReservationMinute] = useState('');
    const [orderNow, setOrderNow] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    
    // Error state
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reservationHour: '',
        reservationMinute: '',
    });

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Validate each field
        if (!firstName) {
            newErrors.firstName = 'First name is required.';
            isValid = false;
        }
        if (!lastName) {
            newErrors.lastName = 'Last name is required.';
            isValid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email.';
            isValid = false;
        }
        if (!phone) {
            newErrors.phone = 'Phone number is required.';
            isValid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number.';
            isValid = false;
        }
        if (!reservationHour) {
            newErrors.reservationHour = 'Reservation hour is required.';
            isValid = false;
        }
        if (!reservationMinute) {
            newErrors.reservationMinute = 'Reservation minute is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleReservation = () => {
        if (!validateForm()) {
            return;
        }

        const orderMessage = orderNow
            ? 'Order will be placed now.'
            : 'No meal order included.';
        alert(`Reservation confirmed for ${partySize} on ${reservationDate.toLocaleDateString()} at ${reservationHour}:${reservationMinute}.
Name: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}. ${orderMessage}`);
        navigate('/menu');
    };

    const handleConfirmOrderNow = () => {
        setOrderNow(true);
        setShowOrderConfirmation(false);
        handleReservation();
    };

    const handleCancelOrderNow = () => {
        setOrderNow(false);
        setShowOrderConfirmation(false);
        alert("Reservation is confirmed without meal order.");
        handleReservation();
    };

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <div className="container mx-auto py-8 px-4 bg-primary">
            {/* Restaurant Banner */}
            <div className="relative mb-8">
                <img
                    src="https://cdn.printnetwork.com/production/assets/themes/5966561450122033bd4456f8/imageLocker/5f206dc35d4bff1ada62fb4c/blog/blog-description/1647973541988_restaurant-banner.png"
                    alt="Restaurant Banner"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Reservation Header */}
            <h2 className="text-4xl font-bold text-txtPrimary mb-6 mt-6 text-center">
                Reserve a Table
            </h2>

            {/* Reservation Form */}
            <motion.div className="bg-white p-6 shadow-xl rounded-3xl max-w-3xl mx-auto">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className={`flex items-center border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary`}>
                        <FaUser className="text-secondary mr-3 text-xl" />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    
                    <div className={`flex items-center border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary`}>
                        <FaUser className="text-secondary mr-3 text-xl" />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                    <div className={`flex items-center border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary`}>
                        <FaEnvelope className="text-secondary mr-3 text-xl" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <div className={`flex items-center border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary`}>
                        <FaPhoneAlt className="text-secondary mr-3 text-xl" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Party Size and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaUsers className="text-secondary mr-3 text-xl" />
                        <input
                            type="number"
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                            min="1"
                            placeholder="Party Size"
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className={`flex items-center border-2 ${errors.reservationHour || errors.reservationMinute ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary`}>
                        <FaClock className="text-secondary mr-3 text-xl" />
                        <select
                            value={reservationHour}
                            onChange={(e) => setReservationHour(e.target.value)}
                            className="outline-none flex-1 mr-2">
                            <option value="">Hour</option>
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        <span>:</span>
                        <select
                            value={reservationMinute}
                            onChange={(e) => setReservationMinute(e.target.value)}
                            className="outline-none flex-1 ml-2">
                            <option value="">Min</option>
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                    {(errors.reservationHour || errors.reservationMinute) && (
                        <p className="text-red-500 text-sm">Please select both time fields.</p>
                    )}
                </div>

                {/* Calendar */}
                <div className="mb-8 flex justify-center">
                    <Calendar
                        value={reservationDate}
                        onChange={setReservationDate}
                        minDate={new Date()}
                        className="rounded-xl bg-accent border border-secondary"
                        tileClassName={({ date, view }) =>
                            date.toDateString() === reservationDate.toDateString()
                                ? 'bg-secondary text-white rounded-full'
                                : ''
                        }
                    />
                </div>

                {/* Confirm Reservation Button */}
                <motion.button
                    className="bg-secondary text-white font-bold py-3 px-6 rounded-full w-full transition-transform transform hover:scale-110"
                    onClick={() => setShowOrderConfirmation(true)}
                >
                    Confirm Reservation
                </motion.button>
            </motion.div>

            {/* Order Confirmation Modal */}
            {showOrderConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-3/4 relative">
                        <h3 className="text-2xl font-semibold mb-4 text-center">
                            Do you want to order meals now?
                        </h3>
                        <div className="flex justify-between space-x-4">
                            <button
                                onClick={handleConfirmOrderNow}
                                className="bg-secondary text-white py-2 px-6 rounded-md w-full"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancelOrderNow}
                                className="bg-gray-300 text-black py-2 px-6 rounded-md w-full"
                            >
                                No
                            </button>
                        </div>
                        <button
                            onClick={() => setShowOrderConfirmation(false)}
                            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationPage;
