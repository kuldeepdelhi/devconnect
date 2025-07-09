import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resUser = await API.get(`/users/${id}`);
        console.log(resUser)
        const resProjects = await API.get(`/projects/user/${id}`); 

        if (resUser?.data) setUser(resUser.data);

        setProjects(resProjects.data); 
      } catch (err) {
        console.error('Error fetching profile or projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user?.name}'s Profile</h2>
      <p className="text-gray-700 mb-6">📧 {user?.email}</p>

      <h3 className="text-xl font-semibold mb-4">Projects</h3>
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          projects.map((proj) => (
            <div key={proj._id} className="border p-4 rounded-lg bg-white shadow-md">
              <h4 className="font-semibold text-lg text-gray-900">{proj.title}</h4>
              <p className="text-sm text-gray-600">{proj.description}</p>
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-1 inline-block"
              >
                🔗 Project Link
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
