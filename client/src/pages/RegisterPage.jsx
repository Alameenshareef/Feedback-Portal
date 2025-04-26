import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });
  const [error,setError] = useState()
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      login(data);
      navigate(form.role === 'admin' ? '/admin' : '/feedback');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        <select name="role" onChange={handleChange} className="w-full border px-2 py-1 rounded">
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <div>
          <h4 className=' text-red-500'>{error}</h4>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
