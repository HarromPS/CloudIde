import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='text-center font-bold text-[24px]'>
            <h1>Login Here</h1>
            <div className='border border-2 rounded-xl mx-auto p-2 w-[50%]'>
                <div className="login-class-username m-1 p-2">
                    <label htmlFor="loginInputUsername">Username:</label>
                    <input className='border border-2 rounded-[10px] m-2' type="text" id='loginInputUsername' />
                </div>
                <div className="login-class-password m-1 p-2">
                    <label htmlFor="loginInputPassword">Password:</label>
                    <input className='border border-2 rounded-[10px] m-2' type="password" id='loginInputPassword' />
                </div>

                <div className="already-account">
                    <p>Create an account? <Link className='text-blue-600' to='/signup'>Sign Up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login