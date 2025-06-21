import { useState } from 'react';


const SignUp = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div
     
      className="max-w-md flex justify-center items-center flex-col  mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10 border border-gray-200"
    >
      <h2 className="text-2xl  font-semibold text-center mb-6 text-gray-800">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johndoe123"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

          <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="johndoe123"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
