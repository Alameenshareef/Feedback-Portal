import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error,setError] = useState()
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      login(data);
      navigate(data.user.role === 'admin' ? '/admin' : '/feedback');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');

    }
  };


  const handleClick = ()=>{
    navigate('/register')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        <div>
          <h4 className=' text-red-500'>{error}</h4>
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded">Login</button>
      </form>
      <div>
          <h4 className='text-center'>OR</h4>
        </div>
        <button onClick={handleClick} className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
    </div>
  );
}
