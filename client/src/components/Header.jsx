import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200  shadow-md'>
        <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Ozalwar</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            <form className="bg-slate-100 p-3 rounded-lg  flex items-center">
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch/>
            </form>
            <ul className='flex gap-4 hover:cursor-pointer'>
                <Link to='/' className='hidden sm:inline hover:underline'><li>Home</li></Link>
                <Link to='/about' className='hover:underline'><li>About</li></Link>
                <Link to='/sign-in' className='hover:underline'><li>Sign-In</li></Link>
            </ul>
        </div>
    </header>
  )
}
