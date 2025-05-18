import React, { useEffect } from 'react'
import { Link,redirect } from 'react-router-dom';

const Home = () => {
  
  useEffect(()=>{
    let authToken = localStorage.getItem("authToken");
    if(authToken){
      redirect("/dashboard");
    }
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-extrabold mb-6">Welcome to Cloud IDE</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
        >
          Login
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Home