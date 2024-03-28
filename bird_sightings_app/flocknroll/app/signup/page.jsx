"use client";
import React, { useState } from 'react';
import { saveUser } from '../api/request';
import { useRouter } from 'next/navigation';
import Image from "next/image";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Call loginFunction with form data
    const response = await saveUser(username, email, password);

    if (response == "User Created!") {
      setMessage(response);
      router.push('/login');
    } else {
      setMessage(response);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:flex sm:mx-auto sm:w-full sm:max-w-sm items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9">
          Sign Up&nbsp;
        </h2>
        <Image
          className='logingif border-gray-200 rounded-lg'
          src="/gif/signup.gif"
          width={50}
          height={50}
          alt="Picture of the author"
        />

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
            <div className="mt-2">
              <input type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <button type="submit" className="button-background flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign Up
            </button>
          </div>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.includes('User Created!') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an Account?&nbsp;
          <a href="/login" className="textcolor font-semibold leading-6 text-indigo-600 hover:text-green-500">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
