import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='text-center font-bold text-[24px]'>
        <h1>Welcome to Cloud IDE</h1>
        <div>
          <Link to='/login'>Login</Link> |
          <Link to='/signup'> Sign Up</Link> 
        </div>
    </div>
  )
}

export default Home