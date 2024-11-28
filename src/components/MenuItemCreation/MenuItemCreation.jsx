import React, { useState } from 'react';
import axios from 'axios';

const MenuItemCreation = ({ menuId, onClose, fetchMenuItems }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateItem = async () => {
        try {
            const newItem = {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                menuId
            };
            console.log('Creating item with payload:', newItem);  // Log the payload
            
            // Sending the POST request to the backend
            const response = await axios.post(`https://localhost:7297/api/menu/create-menu-item/${menuId}`, newItem);
            
            console.log('Item created successfully:', response.data);

            // Refetch the menu items and close the modal
            fetchMenuItems(menuId);
            onClose();
        } catch (error) {
            console.error('Error creating menu item:', error);
            // Display detailed error message to the user
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred while creating the menu item.');
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3">
                <h3 className="text-2xl font-semibold text-center mb-4">Create New Menu Item</h3>

                {/* Display error message if any */}
                {errorMessage && (
                    <div className="mb-4 text-red-600 text-center">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Item Name"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Item Description"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleCreateItem}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Create Item
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCreation;
