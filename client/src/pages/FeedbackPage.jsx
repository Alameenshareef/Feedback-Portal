import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { submitFeedback } from "../services/feedbackService";

export default function FeedbackPage() {
  const { auth } = useAuth();
  const [form, setForm] = useState({ text: "", rating: 5 });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      text: form.text,
      rating: form.rating,
      image: image ? image : null,
    };

    try {
      await submitFeedback(data, auth?.token);
      setMessage("Feedback submitted successfully!");
      setForm({ text: "", rating: 5 });
      setImage(null);
    } catch (err) {
      setMessage("Error submitting feedback.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      {message && (
        <p className="text-sm text-center text-blue-600 mb-2">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="text"
          value={form.text}
          onChange={handleChange}
          rows="4"
          placeholder="Your feedback..."
          className="w-full border px-3 py-2 rounded resize-none"
          required
        />
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
