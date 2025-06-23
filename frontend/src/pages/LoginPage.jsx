import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mobile })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name || '');
        localStorage.setItem('userMobile', data.user.mobile);
        window.location.href = '/chat';
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#89a9d8] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md px-8 py-10 w-full max-w-sm relative">

        {/* Top Right Dots */}
        <div className="absolute top-2 right-2 space-y-0.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-0.5">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-[3px] h-[3px] bg-blue-600 rounded-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Left Dots */}
        <div className="absolute bottom-2 left-2 space-y-0.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-0.5">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-[3px] h-[3px] bg-blue-600 rounded-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 mb-2" />
          <h2 className="text-xl font-medium text-black">DirectLink</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C7A9C] transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C7A9C] transition"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6C7A9C] text-white text-sm font-medium py-3 rounded-md hover:bg-[#5a6a89] transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
