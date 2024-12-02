import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    try {
      const response = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          required
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          required
        />
        <button
          disabled={loading}
          className="uppercase bg-slate-800 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-5 gap-3">
        <span>Have an Account ? </span>
        <Link to="/sign-in" className="text-blue-800 hover:underline">
          Sign-in
        </Link>
      </div>
      {error && <p className="text-red-700 mt-4">{error}</p>}
      {success && <p className="text-green-700 mt-4">{success}</p>}
    </div>
  );
};

export default SignUp;