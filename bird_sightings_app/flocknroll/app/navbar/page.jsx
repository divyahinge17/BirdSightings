"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    const handleSignout = () => {
        // Try Resetting Login Totally
        // No Page should be rendered directly
        localStorage.setItem('userName', null);
        localStorage.setItem('userEmail', null);

        router.push('/login');
    };

    const handleClick = (url) => {
        router.push(url)
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <ul className="flex hover:cursor-pointer flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a onClick={() => handleClick('/main')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Search By Birds</a>
                    </li>
                    <li>
                        <a onClick={() => handleClick('/desktop/location')} className="block py-2 px-3 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Search by Location</a>
                    </li>
                </ul>
                
                <div className="flex items-center">
                    <p className="usernav">Welcome, {userName}!</p>
                    <button onClick={handleSignout} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm py-2 px-4 text-center">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;