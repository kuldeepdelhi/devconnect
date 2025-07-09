import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../pages/SearchBar'; // or wherever you placed it

export default function Navbar() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
      <Link to="/" className="font-bold text-xl text-gray-800">DevConnect</Link>

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <SearchBar />

        {token ? (
          <>
            <Link to={`/profile/${userId}`} className="text-gray-700 hover:underline">Profile</Link>
            <Link to="/create" className="text-gray-700 hover:underline">Create</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:underline">Login</Link>
            <Link to="/signup" className="text-gray-700 hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
