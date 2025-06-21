import { useState } from 'react';
import { motion } from 'framer-motion';

const Sigin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with:', form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </motion.div>
  );
};

export default Sigin;
