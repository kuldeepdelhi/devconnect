// Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await API.get('/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
   <div className="max-w-6xl mx-auto px-6 py-10">
  <h1 className="text-3xl font-bold mb-8 text-gray-800">🌟 Latest Projects</h1>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map(proj => (
      <div key={proj._id} className="rounded-2xl shadow-lg border border-gray-100 bg-gradient-to-tr from-white to-gray-50 hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{proj.title}</h2>
          <p className="text-sm text-gray-500 mb-1">👤 {proj.userId?.name || 'Anonymous'}</p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{proj.description}</p>
        </div>
        <Link
          to={`/projects/${proj._id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium underline transition"
        >
          🔗 View Project
        </Link>
      </div>
    ))}
  </div>
</div>

  );
}
