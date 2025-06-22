import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContextData } from '../context/userContext'; // path depends on your folder structure


const UserSignup = () => {

  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContextData);


  const submitHandler = async (e) => {
    e.preventDefault();
    // Here you would typically handle the signup logic, such as sending the user data to your backend for registration.
    console.log('User signed up');

    const newUserData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUserData)
    console.log('Response:', response.data);
    console.log('userData:', newUserData);

    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      navigate('/home');
    }


    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');

  };


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />

        <form onSubmit={(e => {
          submitHandler(e);
          e.target.reset();
        })}>

          <h3 className='text-base font-medium mb-2'>What's your Name</h3>
          <div className='flex gap-4 mb-7'>

            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-gray-500'
              type="text"
              placeholder='First Name' />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-gray-500'
              type="text"
              placeholder='Last Name' />
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-gray-500'
            type="email"
            placeholder='email.example.com' />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-gray-500'
            type="password"
            placeholder='password' />

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg'>
            Create Account</button>
        </form>

        <p className='text-center'>Already have a account ? <Link to='/userlogin' className='text-blue-600'>Login here</Link></p>
      </div>

    </div>
  )
}

export default UserSignup