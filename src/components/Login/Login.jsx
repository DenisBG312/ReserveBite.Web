import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import registerImage from '../../assets/images/register.png'; // Replace with your image path

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://localhost:7297/api/users/login', formData);
      const { token } = response.data;
      setSuccessMessage('Login successful! Redirecting...');
      
      // Save the token (localStorage/sessionStorage or context)
      localStorage.setItem('token', token);

      // Redirect to dashboard or home page after login
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column - Image (hidden on small screens) */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${registerImage})` }}
      >
        <div className="h-full bg-black bg-opacity-30"></div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-primary py-6 px-4">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          {/* Title */}
          <motion.h2
            className="text-xl font-bold text-center text-orange-500 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Вход
          </motion.h2>

          {/* Error/Success Messages */}
          {errorMessage && <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>}
          {successMessage && <div className="text-green-500 text-sm mb-4 text-center">{successMessage}</div>}

          {/* Login Form */}
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имейл</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Въведи имейл"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Парола</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Въведи парола"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-orange-500'} text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300`}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              transition={{ duration: 0.3 }}
              disabled={loading}
            >
              {loading ? 'Влизане...' : 'Вход'}
            </motion.button>
          </motion.form>

          {/* Register Link */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-gray-600 text-sm">Нямате акаунт?</span>
            <a href="/register" className="ml-2 text-orange-500 font-semibold text-sm hover:underline">
              Регистрирай се
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
