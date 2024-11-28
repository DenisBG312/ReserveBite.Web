import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuItemCreation from '../MenuItemCreation/MenuItemCreation'; // Import the new MenuItemCreation component

const RestaurantDetailPage = () => {
    const { id } = useParams(); // Access restaurant ID from the URL parameter
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null); // Track selected menu for adding items
    const [menuItems, setMenuItems] = useState([]); // To store menu items
    const [showCreateMenuItem, setShowCreateMenuItem] = useState(false); // Track if creation form is visible
    const navigate = useNavigate(); // Hook for navigation

    // Function to fetch restaurant details and menu
    const fetchRestaurantDetails = async () => {
        setLoading(true);
        try {
            const restaurantResponse = await axios.get(`https://localhost:7297/api/restaurants/get-restaurant/${id}`);
            setRestaurant(restaurantResponse.data); // Set the restaurant details

            const menuResponse = await axios.get(`https://localhost:7297/api/menu/get-menu-by-restaurant/${id}`);
            if (menuResponse.data) {
                setRestaurant((prevState) => ({
                    ...prevState,
                    menus: [menuResponse.data], // Assuming the response is a single menu object
                }));
            } else {
                console.log("No menu found for this restaurant.");
            }
        } catch (error) {
            console.error("Error fetching restaurant details or menu:", error);
            setError("Failed to load restaurant details and menu. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMenuItems = async (menuId) => {
        try {
            const response = await axios.get(`https://localhost:7297/api/menu/get-menu-items-by-menu/${menuId}`);
            console.log('Fetched Menu Items:', response.data);
    
            // Access the items inside the "$values" array
            const menuItems = response.data.$values || []; // Use empty array if no values are found
            setMenuItems(menuItems); // Update state with the correct items
        } catch (error) {
            console.error("Error fetching menu items:", error);
            setError("Failed to load menu items.");
        }
    };

    useEffect(() => {
        fetchRestaurantDetails();  // Fetch updated restaurant details including menus
    }, [id]);

    const handleReserveNow = () => {
        navigate('/reservation'); // Navigate to reservation page
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu); // Select the menu but don't automatically open item creation
        fetchMenuItems(menu.id); // Fetch the items for the selected menu
    };

    const closeMenuItemModal = () => {
        setShowCreateMenuItem(false); // Close the modal
    };

    // Loading and Error States
    if (loading) {
        return <div className="loading-state text-center">Loading restaurant details...</div>;
    }

    if (error) {
        return <div className="error-state text-center text-red-500">{error}</div>;
    }

    // Get menus related to the restaurant
    const menus = Array.isArray(restaurant?.menus) ? restaurant.menus : []; // Ensure it's an array

    return (
        <div className="container mx-auto py-8 px-4 bg-primary relative">
            {/* Restaurant Banner */}
            <div className="relative">
                <img
                    src={restaurant.imageUrl || "https://cdn.printnetwork.com/production/assets/themes/5966561450122033bd4456f8/imageLocker/5f206dc35d4bff1ada62fb4c/blog/blog-description/1647973541988_restaurant-banner.png"}
                    alt="Restaurant Banner"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            {/* Restaurant Information */}
            <motion.div
                className="bg-white rounded-lg shadow-xl mt-6 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <div className="flex items-center mt-2">
                    <FaStar className="text-yellow-500" />
                    <span className="ml-1 text-lg">{restaurant.rating}</span>
                </div>
                <p className="text-lg text-txtSecondary mb-4">{restaurant.description}</p>
            </motion.div>

            <h2 className="text-3xl font-bold text-txtPrimary mt-6">Menus</h2>

            {/* Display Menus */}
            <motion.div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                {menus.length > 0 ? (
                    menus.map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-white rounded-lg shadow-xl p-4 transition-transform transform hover:scale-105"
                            onClick={() => handleMenuClick(menu)} // Select menu but no automatic item creation
                        >
                            <h3 className="text-xl font-semibold">{menu.name}</h3>
                            <p className="text-md text-txtSecondary">{menu.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No menus available.</p>
                )}
            </motion.div>

            {/* Menu Items Section */}
            {selectedMenu && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-xl p-4">
                                <img
                                    src={item.imageUrl || "https://via.placeholder.com/150"}  // Placeholder image if no imageUrl
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-md text-txtSecondary">{item.description}</p>
                                <span className="text-lg font-bold">${item.price}</span>
                            </div>
                        ))
                    ) : (
                        <p>No items available for this menu.</p>
                    )}
                </div>
            )}

            {/* Button to create menu item */}
            {selectedMenu && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowCreateMenuItem(true)} // Show the form
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Create New Item
                    </button>
                </div>
            )}

            {/* Show the MenuItemCreation modal when the button is clicked */}
            {showCreateMenuItem && selectedMenu && (
                <MenuItemCreation
                    menuId={selectedMenu.id}
                    onClose={closeMenuItemModal} // Close the modal
                    fetchMenuItems={fetchMenuItems} // Pass fetchMenuItems to refetch the items
                />
            )}
        </div>
    );
};

export default RestaurantDetailPage;
