import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }


    return (
        <div className='mx-auto my-0 px-5 py-2.5 flex items-center justify-between  bg-slate-400 '>
            <div className='w-fit ml-56'>
                <Link to='/'>
                    <h2 className='text-2xl m-5 cursor-button hover:underline '>Workout Boy</h2>
                </Link>
            </div>
            <nav className='flex items-center justify-around mr-60'>
                {user && (
                    <div className='flex'>
                        <span className='mx-2 p-2'>{user.email}</span>
                        <button onClick={handleClick} className=' mx-2 p-2 bg-slate-200 whitespace-nowrap rounded hover:bg-slate-300'>Log out</button>
                    </div>
                )}
                {!user && (
                    <div className='flex items-center'>
                        <Link to='/login'>
                            <h3 className='mx-2 p-2 bg-slate-200 rounded hover:bg-slate-300 whitespace-nowrap'>Log in</h3>
                        </Link>
                        <Link to='/signup'>
                            <h3 className='mx-2 p-2 bg-slate-200 rounded hover:bg-slate-300 whitespace-nowrap'>Sign up</h3>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;