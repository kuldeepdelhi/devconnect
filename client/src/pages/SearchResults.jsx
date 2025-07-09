import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import API from '../utils/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get('q');
  const [results, setResults] = useState({ users: [], projects: [] });

  useEffect(() => {
    const fetchResults = async () => {
      const res = await API.get(`/search?q=${query}`);
      setResults(res.data);
    };
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for “{query}”</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        {results.users.length === 0 && <p>No users found.</p>}
        {results.users.map((user) => (
          <div key={user._id} className="p-2 border rounded mb-2">
            <p>{user.name}</p>
            <Link to={`/profile/${user._id}`} className="text-blue-600 underline text-sm">View Profile</Link>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        {results.projects.length === 0 && <p>No projects found.</p>}
        {results.projects.map((proj) => (
          <div key={proj._id} className="p-2 border rounded mb-2">
            <p>{proj.title} <span className="text-sm text-gray-500">by {proj.userId?.name}</span></p>
            <Link to={`/projects/${proj._id}`} className="text-blue-600 underline text-sm">View Project</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
