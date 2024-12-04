import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async ()=> {
    
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)

      const res = await fetch('/api/v1/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(data)
      navigate('/');
    } catch (error) {
      console.log( "Error while signing in with google : ",error);
    }
  }
  return (
    <button type='button' onClick={handleClick} className='bg-red-700 text-white p-3 rounded-lg hover:opacity-90'>CONTINUE WITH GOOGLE</button>
  )
}

export default OAuth