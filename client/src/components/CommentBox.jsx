
export default function CommentBox({ comments = [] }) {
    if (!comments.length) return <p>No comments yet.</p>;
  
    return (
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-800">{comment.text}</p>
            <span className="text-xs text-gray-500">– {comment.user?.name || 'Anonymous'}</span>
          </div>
        ))}
      </div>
    );
  }