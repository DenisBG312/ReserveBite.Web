import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [user, setUser] = useState(null);  // For storing user data
  const [isEditing, setIsEditing] = useState(false);  // Flag to toggle between view and edit mode
  const [formData, setFormData] = useState({ name: '', email: '' });  // For storing form data
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Redirect to login if the user is not authenticated
    } else {
      fetch('https://localhost:7297/api/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setFormData({ name: data.name, email: data.email });
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update the user profile
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    fetch('https://localhost:7297/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUser(updatedUser);
        setIsEditing(false); // Switch back to view mode
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {!isEditing ? (
          // View Mode
          <>
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-bold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
