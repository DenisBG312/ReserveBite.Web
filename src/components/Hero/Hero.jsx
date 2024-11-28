import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Dish2 from '../../assets/images/dish2.png';
import Dish3 from '../../assets/images/dish3.png';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    if (searchQuery.trim() === '') {
      return; // Don't fetch if the search query is empty
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://localhost:7297/api/restaurants/get-restaurants?searchQuery=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Error fetching restaurants: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    fetchRestaurants();
  };

  return (
    <div className="relative w-full h-[60vh] bg-primary overflow-hidden">
      {/* Background Images (Inline Centered) */}
      <div className="absolute inset-0 flex justify-between mx-2 items-center space-x-8">
        <motion.div
          className="w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden mr-4"
          style={{
            backgroundImage: `url(${Dish3})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          className="w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden ml-4"
          style={{
            backgroundImage: `url(${Dish2})`,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Central Content */}
      <div className="container mx-auto flex flex-col items-center justify-center h-full relative z-10 px-4">
        <motion.h1
          className="text-lg sm:text-2xl md:text-4xl lg:text-6xl px-4 sm:px-8 font-bold text-center text-txtPrimary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ReserveBite - бързо лесно и удобно резервирация
        </motion.h1>
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-center text-txtSecondary mb-6 sm:mb-8 pt-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Намерете най-добрите ресторанти близо до вас и резервирайте маса онлайн.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="bg-secondary rounded-full flex items-center w-full sm:w-3/4 lg:w-2/6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Търсене..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-secondary text-white placeholder-white focus:outline-none rounded-l-full py-3 px-4 w-full"
          />
          <button
            onClick={handleSearchClick}
            className="bg-accent text-primary font-semibold py-3 px-6 rounded-r-full h-full"
          >
            Търси
          </button>
        </motion.div>

        {/* Displaying loading or error messages */}
        {loading && <p className="text-white mt-4">Зареждане...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Scrollable Restaurant List */}
        <div className="mt-6 w-full max-h-[300px] overflow-y-auto space-y-4">
          {restaurants.length > 0 ? (
            <ul className="space-y-4">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`} // Use the Link component for navigation
                  className="block"
                >
                  <motion.li
                    className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 cursor-pointer"
                  >
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p>{restaurant.description}</p>
                      <p className="text-sm text-gray-500">Рейтинг: {restaurant.rating}</p>
                      <p className="text-sm text-gray-500">{restaurant.address}</p>
                      <p className="text-sm text-gray-500">{restaurant.phone}</p>
                    </div>
                  </motion.li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-white mt-4">Няма намерени ресторанти</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
