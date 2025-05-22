import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';

// Main dashboard component
const App = () => {
  // State for user info, ship data, search input, errors, menu visibility, and last updated time
  const [user, setUser] = useState(null);
  const [ships, setShips] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

  // Check for token and fetch user info on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://maritimeod.onrender.com/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          setError(err.response?.data?.error || 'Failed to fetch user data');
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch ship data based on search input and update lastUpdated timestamp
  useEffect(() => {
    axios
      .get(`https://maritimeod.onrender.com/api/ships${search ? `?name=${search}` : ''}`)
      .then((res) => {
        setShips(Array.isArray(res.data) ? res.data : [res.data]);
        // Update the last updated timestamp
        const now = new Date();
        setLastUpdated(now);
      })
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch ship data'));
  }, [search]);

  // Handle window resize to close menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close menu on desktop (md: breakpoint)
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle logout and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Toggle menu visibility for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Format the last updated timestamp
  const formatDateTime = (date) => {
    if (!date) return 'Not yet updated';
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata', // IST timezone
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar for Desktop, Hamburger for Mobile */}
      <nav className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          {/* Navbar Title */}
          <h2 className="text-xl md:text-2xl font-bold">Maritime Dashboard</h2>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Navbar Links for Desktop */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Ships
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-blue-300">
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu (Slide-in) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                  onClick={toggleMenu}
                >
                  Ships
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-blue-700 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main content area */}
      <div className="p-4 md:p-6">
        <ErrorAlert message={error} onClose={() => setError('')} />
        {user && (
          <div>
            {/* Welcome message with user name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome, {user.name}</h1>
            {/* Ship search input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search ship by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border rounded w-full max-w-md"
              />
            </div>
            {/* Ship data table with last updated timestamp */}
            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold">Ship Data</h2>
                <p className="text-sm text-gray-600">
                  Last updated: {formatDateTime(lastUpdated)}
                </p>
              </div>
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left text-sm md:text-base">Name</th>
                    <th className="border p-2 text-left text-sm md:text-base">Type</th>
                    <th className="border p-2 text-left text-sm md:text-base">IMO</th>
                    <th className="border p-2 text-left text-sm md:text-base">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {ships.map((ship, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-sm md:text-base">{ship.name}</td>
                      <td className="border p-2 text-sm md:text-base">{ship.type}</td>
                      <td className="border p-2 text-sm md:text-base">{ship.imo}</td>
                      <td className="border p-2 text-sm md:text-base">{ship.flag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;