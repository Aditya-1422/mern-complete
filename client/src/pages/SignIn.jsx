import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signinStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormdata] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart())
    setSuccess(null); 
    try {
      const response = await fetch('/api/v1/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) {
        dispatch(signInFailure(data.message))
        return;
      }
      setSuccess(data.message);
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className="mt-5 gap-3">
        <span>Dont have an account ? </span>
        <Link to="/sign-up" className="text-blue-800 hover:underline">
          Sign-up
        </Link>
      </div>
      {error && <p className="text-red-700 mt-4">{error}</p>}
      {success && <p className="text-green-700 mt-4">{success}</p>}
    </div>
  );
};

export default SignIn