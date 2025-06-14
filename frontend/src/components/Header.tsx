import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { useEffect } from 'react';
import SignOutButton from './SignOutButton';

const Header = () => {
    const {isLoggedIn} = useAppContext();

    useEffect(()=> {
        console.log("Is logging ",isLoggedIn)
    },[])

    return (
        <div className='bg-blue-900 py-6'>
            <div className='container mx-auto flex justify-between'>
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Holidays.com</Link>
                </span>
                <span className='flex space-x-2'>
                    {
                        isLoggedIn ? <>
                            <Link to="/my-bookings" className='flex items-center text-white px-3 font-bold hover:bg-blue-900 hover:rounded-md'>My Bookings</Link>
                            <Link to="/my-hotels" className='flex items-center text-white px-3 font-bold hover:bg-blue-900 hover:rounded-md'>My Hotels</Link>
                            <SignOutButton/>
                        </> 
                        : <>
                            <Link to="/sign-in" className='flex bg-white items-center text-blue-900 px-3 font-bold hover:bg-gray-100 py-2 rounded-md shadow-md transition duration-200 ease-in-out '>
                                Sign In
                            </Link>
                        </>
                    }
                    
                </span>
            </div>
        </div>
    )
}

export default Header