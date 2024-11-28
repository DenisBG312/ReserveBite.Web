import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Jhonov",
    email: "john.doe@example.com",
    phone: "+1234567890",
    profilePicture: "https://via.placeholder.com/150",
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-primary min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.img
            src={profile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-acent shadow-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.h2
            className="text-2xl font-bold text-gray-800 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {profile.firstName}  {profile.lastName}
          </motion.h2>

          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {profile.email}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold">First Name</label>
              <input
                type="text"
                name="LastNa"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-bold">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* Edit/Save Button */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
