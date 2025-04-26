import { useEffect, useState } from 'react';
import { getAllFeedback, commentOnFeedback } from '../services/feedbackService';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { auth } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('5');
  const [sort, setSort] = useState('desc');
  const [comments, setComments] = useState({});

  const API_URl  = import.meta.env.VITE_API_URI
  
  const fetchFeedbacks = async () => {
    try {
      const data = await getAllFeedback(auth.token, {
        rating: filter || undefined,
        sort,
      });
      setFeedbacks(data);
    } catch {
      alert('Error fetching feedback');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [filter, sort]);

  const handleComment = async (id) => {
    const comment = comments[id];
    if (!comment) return;
    try {
      await commentOnFeedback(id, comment, auth.token);
      setComments((prev) => ({ ...prev, [id]: '' }));
      fetchFeedbacks();
    } catch {
      alert('Error adding comment');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All Ratings</option>
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>{r} Star</option>
          ))}
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)} className="border px-2 py-1 rounded">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="space-y-4">
        {feedbacks.map(f => (
          <div key={f._id} className="border p-4 rounded-lg shadow">
            <p><strong>User:</strong> {f.user?.name}</p>
            <p><strong>Rating:</strong> {f.rating} ⭐</p>
            <p className="my-2">{f.text}</p>
            {f.image && (
              <img   src={`${API_URl}${f.image.replace(/\\/g, "/")}`} alt="uploaded" className="w-40 rounded border my-2" />
            )}
            {f.comment && (
              <p className="text-green-700"><strong>Admin Comment:</strong> {f.comment}</p>
            )}

            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Add comment..."
                value={comments[f._id] || ''}
                onChange={e => setComments({ ...comments, [f._id]: e.target.value })}
                className="border flex-1 px-2 py-1 rounded"
              />
              <button
                onClick={() => handleComment(f._id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Reply
              </button>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}
