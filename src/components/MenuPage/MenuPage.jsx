import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaShoppingCart, FaTimes } from 'react-icons/fa';

const MenuPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMeal, setDialogMeal] = useState(null);

    const categories = ['All', 'Pizza', 'Salad', 'Pasta'];
    const meals = [
        { id: 1, name: 'Pizza Margherita', price: 12, category: 'Pizza', img: 'https://via.placeholder.com/150', info: 'Classic Italian pizza with tomatoes and mozzarella.' },
        { id: 2, name: 'Caesar Salad', price: 8, category: 'Salad', img: 'https://via.placeholder.com/150', info: 'Fresh salad with crispy croutons and Caesar dressing.' },
        { id: 3, name: 'Pasta Carbonara', price: 15, category: 'Pasta', img: 'https://via.placeholder.com/150', info: 'Rich pasta with creamy sauce and pancetta.' },
        { id: 4, name: 'Pepperoni Pizza', price: 14, category: 'Pizza', img: 'https://via.placeholder.com/150', info: 'Loaded with pepperoni and cheese.' },
    ];

    const handleAddToCart = (meal) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === meal.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...meal, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (mealId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== mealId));
    };

    const handleUpdateQuantity = (mealId, increment) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === mealId ? { ...item, quantity: item.quantity + increment } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const filteredMeals =
        selectedCategory === 'All' ? meals : meals.filter((meal) => meal.category === selectedCategory);

    return (
        <div className="flex flex-col md:flex-row container mx-auto py-8 px-4 bg-primary">
            {/* Categories */}
            <div className="w-full md:w-3/4 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-txtPrimary mb-4">Restaurant Menu</h2>
                <div className="flex space-x-4 mb-6 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-white ${
                                selectedCategory === category ? 'bg-secondary' : 'bg-acent'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Meals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMeals.map((meal) => (
                        <motion.div
                            key={meal.id}
                            className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform"
                        >
                            <img
                                src={meal.img}
                                alt={meal.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-txtPrimary mb-2">{meal.name}</h3>
                            <p className="text-txtSecondary mb-2">${meal.price}</p>
                            <div className="flex justify-between items-center mt-3">
                                <button
                                    className="bg-secondary text-white px-4 py-2 rounded-md flex items-center"
                                    onClick={() => handleAddToCart(meal)}
                                >
                                    <FaPlus className="mr-2" />
                                    Add to Cart
                                </button>
                                <button
                                    className="bg-secondary text-white px-4 py-2 rounded-md flex items-center"
                                    onClick={() => setDialogMeal(meal) || setDialogOpen(true)}
                                >
                                    More Info
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="w-full md:w-1/4 bg-acent text-white p-6 rounded-lg shadow-xl h-[85vh] sticky top-[12vh] ml-0 md:ml-4 overflow-auto">
                <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
                {cart.length > 0 ? (
                    <div className="space-y-4">
                        <div className="max-h-[50vh] overflow-y-auto">
                            {cart.map((item) => (
                                <div key={item.id} className="flex mt-2 mx-2 justify-between items-center bg-white p-4 rounded-md">
                                    <div>
                                        <h4 className="text-lg font-bold text-txtPrimary">{item.name}</h4>
                                        <p className="text-sm text-txtPrimary">x{item.quantity}</p>
                                        <p className="text-txtPrimary">${item.price * item.quantity}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="bg-secondary text-white px-2 rounded"
                                            onClick={() => handleUpdateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="bg-secondary text-white px-2 rounded"
                                            onClick={() => handleUpdateQuantity(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 rounded"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <h4 className="text-lg font-bold">Total: ${total.toFixed(2)}</h4>
                            <button
                                className="bg-secondary text-primary font-bold py-3 px-6 rounded-md w-full mt-4"
                                onClick={() => alert('Order confirmed!')}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Your cart is empty. Please select from the menu.</p>
                )}
            </div>

            {/* Meal Dialog */}
            {dialogOpen && dialogMeal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
                        <button
                            className="absolute top-2 right-2 text-secondary"
                            onClick={() => setDialogOpen(false)}
                        >
                            <FaTimes />
                        </button>
                        <img
                            src={dialogMeal.img}
                            alt={dialogMeal.name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-bold text-txtPrimary mb-2">{dialogMeal.name}</h3>
                        <p className="text-txtSecondary mb-4">${dialogMeal.price}</p>
                        <p>{dialogMeal.info}</p>
                        <button
                            className="bg-secondary text-white px-4 py-2 rounded-md mt-4 w-full"
                            onClick={() => handleAddToCart(dialogMeal)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MenuPage;
