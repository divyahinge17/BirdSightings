"use client";
import React, { useState } from "react";
import { getUser } from "../api/request";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await getUser(email, password);
    // Remove after testing
    await sleep(2000);

    if (response.message == "Login Successful!") {
      const params = new URLSearchParams();
      params.set("userName", response.data.name);
      params.set("userEmail", response.data.email);

      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);

      setMessage(response.message);
      router.push("/main");
    } else {
      setMessage(response.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <Image
            className="border-gray-200 rounded-lg"
            src="/gif/giphy.gif"
            width={100}
            height={100}
            alt="Login GIF"
            priority={true}
            unoptimized
          />
        </div>
      ) : null}
      <div className="sm:flex sm:mx-auto sm:w-full sm:max-w-sm items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9">
          Log In
        </h2>
        <Image
          className="logingif border-gray-200 rounded-lg"
          src="/gif/login.gif"
          width={100}
          height={100}
          alt="Login GIF"
          priority={true}
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                maxLength={30}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="formpadding block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="formpadding block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="button-background w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg"
            >
              Log in
            </button>
          </div>
        </form>
        {message != "Login Successful!" && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an Account?&nbsp;
          <a
            href="/signup"
            className="textcolor font-semibold leading-6 text-indigo-600 hover:text-green-500"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
