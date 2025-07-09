import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get(`/projects/${id}`); // ✅ Correct endpoint
        setProject(res.data);

        const commentRes = await API.get(`/comments/project/${id}`);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const res = await API.post('/comments', {
        projectId: id,
        text: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment. Are you logged in?');
    }
  };

  if (!project) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-4 inline-block"
      >
        View Project
      </a>

      <h3 className="text-xl font-semibold mt-6 mb-2">Comments</h3>
      {comments.map((c, i) => (
        <div key={i} className="bg-gray-100 p-3 rounded mb-2">
          <p>{c.text}</p>
          <p className="text-sm text-gray-500">— {c.userId?.name || 'Anonymous'}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        {error && <p className="text-red-600">{error}</p>}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded h-24"
        />
        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Post Comment
        </button>
      </form>
    </div>
  );
}
