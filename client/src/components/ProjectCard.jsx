// ✅ components/ProjectCard.jsx
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
      <p className="text-sm text-gray-700 mb-2">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm block mb-2"
      >
        Visit Project
      </a>
      <Link
        to={`/projects/${project._id}`}
        className="inline-block bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}
