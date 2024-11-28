import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaTimes, FaClock } from "react-icons/fa";

const ReservationProfile = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      restaurantName: "Bella Italia",
      reservationDate: "2024-12-15",
      reservationTime: "19:30",
      bannerImage: "https://via.placeholder.com/400x200/ff7f7f/333333?text=Bella+Italia",
      address: "123 Pasta Street, Rome, Italy",
    },
    {
      id: 2,
      restaurantName: "Sushi House",
      reservationDate: "2024-12-18",
      reservationTime: "20:00",
      bannerImage: "https://via.placeholder.com/400x200/7f9dff/333333?text=Sushi+House",
      address: "456 Sushi Lane, Tokyo, Japan",
    },
    {
      id: 3,
      restaurantName: "Le Bistro",
      reservationDate: "2024-12-20",
      reservationTime: "18:00",
      bannerImage: "https://via.placeholder.com/400x200/ffe57f/333333?text=Le+Bistro",
      address: "789 French Blvd, Paris, France",
    },
  ]);

  const handleCancel = (id) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  const handleReschedule = (id) => {
    alert(`Rescheduling reservation for ${id}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-primary min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center text-white mb-8"
      >
        <h1 className="text-3xl font-bold text-txtPrimary">Your Reservations</h1>
        <p className="text-lg text-txtSecondary">View and manage your restaurant reservations</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div
              className="w-full h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${reservation.bannerImage})` }}
            ></div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{reservation.restaurantName}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                <FaCalendarAlt className="text-gray-600" />
                <span>{reservation.reservationDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <FaClock className="text-gray-600" />
                <span className="text-2xl font-semibold text-gray-800">
                  {reservation.reservationTime}
                </span>
              </div>

              {/* Restaurant Address */}
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{reservation.address}</span>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                  onClick={() => handleReschedule(reservation.id)}
                >
                  <FaEdit />
                  <span>Reschedule</span>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
                  onClick={() => handleCancel(reservation.id)}
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReservationProfile;
