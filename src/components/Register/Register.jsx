import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import registerImage from '../../assets/images/register.png'; // Replace with your image path

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:7297/api/users/register',
        formData
      );
      setSuccessMessage(response.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setTimeout(() => navigate('/login'), 2000); // Redirect to login
    } catch (error) {
      setErrorMessage(error.response?.data || 'An error occurred.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column - Image (hidden on small screens) */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${registerImage})` }}
      ></div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-primary py-6 px-4">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <motion.h2
            className="text-xl font-bold text-center text-acent mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Регистриране
          </motion.h2>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}

          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">
                Първо име
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Въведи първо име"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">
                Последно име
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Въведи фамилия"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">
                Имейл
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Въведи имейл"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">
                Парола
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Въведи парола"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">
                Потвърди паролата
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-2 bg-secondary text-primary font-semibold rounded-md hover:bg-acent transition duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Регистриране
            </motion.button>
          </motion.form>

          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-txtSecondary">Вече имате акаунт?</span>
            <a href="/login" className="ml-2 text-secondary font-semibold">
              Вход
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
