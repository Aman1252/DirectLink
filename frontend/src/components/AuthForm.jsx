import { useState } from 'react';

export default function AuthForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userMobile', formData.mobile);
        window.location.href = '/chat';
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
        className="w-full border border-[#cbd5e1] rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C7A9C] transition"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border border-[#cbd5e1] rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C7A9C] transition"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="mobile"
        type="tel"
        placeholder="Phone Number"
        className="w-full border border-[#cbd5e1] rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C7A9C] transition"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-[#6C7A9C] text-white text-sm font-medium py-3 rounded-md hover:bg-[#5a6a89] transition duration-200"
      >
        Sign Up
      </button>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 font-medium hover:underline">
          Log in
        </a>
      </p>
    </form>
  );
}
