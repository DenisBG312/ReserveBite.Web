import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT token

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate();

  // Check if the user is authenticated and retrieve user info from JWT token
  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      
      // Extract the full name from the token's 'name' claim
      const fullName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const [firstName, lastName] = fullName.split(' '); // Assuming the name is in "FirstName LastName" format

      setUser({ firstName, lastName });

      // Verify token with the server (optional)
      const response = await fetch('https://localhost:7297/api/users/checkauth', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold">ReserveBite</a>
          <nav>
            <ul className="flex space-x-4">
              {!isAuthenticated ? (
                <>
                  <li><a href="/login" className="text-gray-700">Login</a></li>
                  <li><a href="/register" className="text-gray-700">Register</a></li>
                </>
              ) : (
                <>
                  <li>
                    <span className="text-gray-700">
                      Hello, {user.firstName} {user.lastName}
                    </span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
