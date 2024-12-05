import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col'>
        <img src={currentUser.user.avatar} alt="User profile" className='h-24 w-24 rounded-full self-center hover:cursor-pointer' />
        <input type="text" placeholder='username' className='border p-3 rounded-lg mt-2'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg mt-2'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg mt-2'/>
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg my-2 hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-700 hover:underline hover:cursor-pointer mt-5'> Delete user</span>
        <span className='text-red-700 hover:underline hover:cursor-pointer mt-5'> Sign out</span>
      </div>
    </div>
  )
}

export default Profile