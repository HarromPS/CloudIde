import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    let [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    // After form submit
    const onSubmit = async (ele) => {
        ele.preventDefault();

        // check if the password & confirm passwords are correct or not
        if (credentials.password !== credentials.cpassword) {
            alert("Password did not match");
            setCredentials({ password: "", cpassword: "" });
            return;
        }

        // Fetch request to get the Authorization token if the credentials are valid
        let url = "http://localhost:3011/api/auth/createuser";

        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "username": credentials.name,
        //         "email": credentials.email,
        //         "password": credentials.password,
        //         "passwordConfirmation": credentials.cpassword
        //     })
        // });

        // const json = await response.json();
        const json = {
            "success":true
        }

        if (json.success) {
            // Storing the generated token in localStorage
            alert("Account created");
            return navigate("/login");
        }
        else {
            alert(json.error);
        }
    }

    const onChange = (e) => {
        // console.log(credentials);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Sign Up To Use Cloud IDE
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label forHtml="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john@gmail.com" required={true} onChange={onChange} value={credentials.email}/>
                            </div>
                            <div>
                                <label forHtml="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required={true} onChange={onChange} />
                            </div>
                            <div>
                                <label forHtml="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={onChange} value={credentials.password}/>
                            </div>
                            <div>
                                <label forHtml="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={onChange} value={credentials.cpassword}/>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500" to='/login'>Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp