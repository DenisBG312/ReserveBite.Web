import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter, FaStar } from 'react-icons/fa'; // Add Star icon for Rating
import axios from 'axios';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Off-Canvas visibility state
    const [restaurants, setRestaurants] = useState([]); // State to store all restaurants
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State to store filtered restaurants
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [selectedRating, setSelectedRating] = useState(''); // State to store selected rating
    const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected categories (moods)

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Function to fetch all restaurants based on category
    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`https://localhost:7297/api/restaurants/get-restaurants-by-cuisine/${categoryName}`);
            
            // Check if the response contains $values and it is an array
            if (response.data && Array.isArray(response.data.$values)) {
                setRestaurants(response.data.$values); // Store all fetched restaurants
                setFilteredRestaurants(response.data.$values); // Initially, no filter is applied
            } else {
                console.error("Expected an array, but got:", response.data);
                setError("Unexpected data format.");
            }
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load restaurants. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Filter the restaurants based on selected filters
    const applyFilters = () => {
        let filtered = [...restaurants]; // Copy the original list of restaurants

        // Filter by Category (Mood)
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(restaurant =>
                selectedCategories.some(category => restaurant.categories.includes(category))
            );
        }

        // Filter by Rating
        if (selectedRating) {
            filtered = filtered.filter(restaurant => restaurant.rating === parseInt(selectedRating));
        }

        setFilteredRestaurants(filtered); // Set the filtered restaurants
    };

    // Fetch restaurants when the component is loaded or filters change
    useEffect(() => {
        fetchRestaurants();
        window.scrollTo(0, 0); // Scroll to top on page load
    }, [categoryName]);

    useEffect(() => {
        applyFilters(); // Apply filters every time a filter changes
    }, [selectedRating, selectedCategories]); // Re-run filter logic when filters change

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    className="text-2xl font-bold text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Loading restaurants...
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    // Handle Category (Mood) Filter Change
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    // Handle Rating Filter Change
    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    return (
        <div className="flex flex-row container mx-auto py-8 px-4 bg-primary">
            {/* Left Filters (Sidebar) */}
            <motion.div
                className="w-full sm:w-1/4 bg-acent text-white p-6 rounded-lg shadow-xl h-[85vh] sm:block"
                style={{ position: 'sticky', top: '6rem' }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-2xl font-bold mb-6 mt-10 flex items-center space-x-2">
                    <FaFilter className="text-white mr-2" />
                    <span>Filters</span>
                </h3>

                {/* Filter Options */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Category</label>
                    <div className="space-y-2">
                        {["Energetic", "Dark", "Sad", "Happy", "Angry"].map((mood) => (
                            <label key={mood} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="mood"
                                    value={mood.toLowerCase()}
                                    onChange={handleCategoryChange}
                                    className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary"
                                />
                                <span>{mood}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Rating</label>
                    <div className="space-y-2">
                        {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map((rating) => (
                            <label key={rating} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating.split(' ')[0]} // Extract star count for filtering
                                    onChange={handleRatingChange}
                                    className="form-radio h-5 w-5 text-secondary focus:ring-secondary"
                                />
                                <span>{rating}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main Content (Right Section - Restaurant List) */}
            <div className="w-full sm:w-3/4 ml-0 sm:ml-6">
                {/* Header with Filter Button */}
                <div className="flex justify-between items-center mb-8">
                    {/* Page Title */}
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-txtPrimary"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {categoryName} Restaurants
                    </motion.h2>

                    {/* Filter Button for Mobile */}
                    <button
                        className="sm:hidden flex items-center bg-secondary text-primary font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
                        onClick={toggleFilter}
                    >
                        <FaFilter className="mr-2" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Restaurant List */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {Array.isArray(filteredRestaurants) && filteredRestaurants.map((restaurant, index) => (
                        <motion.div
                            key={restaurant.id}
                            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                            <Link to={`/restaurant/${restaurant.id}`} className="block">
                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-bold text-acent mb-3">{restaurant.name}</h3>
                                <div className="flex items-center mb-3">
                                    <FaStar className="text-yellow-500" />
                                    <span className="ml-1 text-lg">{restaurant.rating}</span>
                                </div>
                                <p className="text-txtSecondary mb-4">
                                    {restaurant.description}
                                </p>
                                <button className="bg-secondary text-white px-6 py-2 rounded-md w-full hover:bg-accentTransition transition">
                                    View
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;
