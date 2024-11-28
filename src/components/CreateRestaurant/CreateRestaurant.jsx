import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    cuisineId: '',
    description: '',
    rating: '',
    address: '',
    phone: '',
    imageUrl: '',
  });
  const [cuisines, setCuisines] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cuisines from the API to populate the cuisine dropdown
    const fetchCuisines = async () => {
      try {
        const response = await fetch('https://localhost:7297/api/cuisines/get-cuisines'); // Adjust this to your API
        const data = await response.json();
        console.log("Cuisines fetched: ", data); // Debugging log
  
        if (data && Array.isArray(data.$values)) {
          setCuisines(data.$values); // Use the $values property which contains the array of cuisines
        } else {
          setCuisines([]); // Set an empty array if the response is not in the expected format
          setMessage('Invalid data received for cuisines.');
        }
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setMessage('Error fetching cuisines.');
      }
    };
  
    fetchCuisines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before sending data
    if (!formData.name || !formData.cuisineId || !formData.description) {
      setMessage('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7297/api/restaurants/create-restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Restaurant created successfully!');

        // Reset the form after creation
        setFormData({
          name: '',
          cuisineId: '',
          description: '',
          rating: '',
          address: '',
          phone: '',
          imageUrl: '',
        });

        // Find the cuisine by its ID
        const cuisine = cuisines.find((c) => c.id === Number(formData.cuisineId));

        console.log("Cuisine found: ", cuisine); // Log to see the result of the find operation

        if (cuisine) {
          console.log(`Redirecting to category page for: ${cuisine.name}`);
          navigate(`/categories/${cuisine.name}`); // Redirecting to the cuisine category page without modifying the name
        } else {
          setMessage('Cuisine not found. Redirect failed.');
        }
      } else {
        const error = await response.json();
        setMessage(error.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Error creating restaurant.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Restaurant</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="cuisineId">
            Cuisine
          </label>
          {cuisines.length === 0 ? (
            <p>Loading cuisines...</p> // Show loading message while cuisines are being fetched
          ) : (
            <select
              id="cuisineId"
              name="cuisineId"
              value={formData.cuisineId}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="rating">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            min="1"
            max="5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
