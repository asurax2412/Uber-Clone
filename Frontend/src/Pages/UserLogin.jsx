import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContextData } from '../context/userContext'; // path depends on your folder structure


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContextData);

  const submitHandler = async (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as sending the email and password to your backend for authentication.
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form fields after submission

    const newUserData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUserData)
    console.log('Response:', response.data);
    console.log('status:', response.status);

    if (response.status === 201) {
      const data = response.data;
      setUserData(data.user);
      console.log('User Data:', userData);
      navigate('/home'); // Redirect to home page after successful login
    }

    setEmail('');
    setPassword('');
  };


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />

        <form onSubmit={(e => {
          submitHandler(e);
          e.target.reset();
        })}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-gray-500'
            type="email"
            placeholder='email.example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-gray-500'
            type="password"
            placeholder='password' />

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg'>
            Login</button>
        </form>

        <p className='text-center'>New Here ? <Link to='/usersignup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link to='/captainlogin' className='inline-block bg-[#FFCA00] flex item-center justify-center text-black font-semibold mb-5 rounded px-4 py-2  w-full text-lg'>
          Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin