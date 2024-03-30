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
  const [loading, setLoading] = useState(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    setLoading(true);

    const response = await saveUser(username, email, password);

    //Remove after testing
    await sleep(2000);

    if (response == "User Created!") {
      setMessage(response);
      // router.push('/login');
      setLoading(false);
    } else {
      setMessage(response);
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  }

  return (
    <div className="flex justify-center items-center h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <Image
            className='border-gray-200 rounded-lg'
            src="/gif/giphy.gif"
            width={100}
            height={100}
            alt="Login GIF"
            priority={true}
          />

        </div>
      ) : null}
      {message == 'User Created!' && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-center text-lg font-semibold mb-4">
              User Created Successfully!
            </p>
            <button
              onClick={goToLogin}
              className="button-background w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      )} 

      <div className="sm:flex sm:mx-auto sm:w-full sm:max-w-sm items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9">
          Sign Up&nbsp;
        </h2>
        <Image
          className='signupgif border-gray-200 rounded-lg'
          src="/gif/signup.gif"
          width={50}
          height={50}
          alt="Sign Up GIF"
        />

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input type="text"
                maxLength={50}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} required className="formpadding block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
            <div className="mt-2">
              <input type="email"
                id="email"
                maxLength={30}
                value={email}
                onChange={(e) => setEmail(e.target.value)} required className="formpadding block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input type="password"
                id="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)} required className="formpadding block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <button type="submit" className="button-background w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg">
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
