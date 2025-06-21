import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as sending the email and password to your backend for authentication.
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form fields after submission

    setCaptainData({
      email: email,
      password: password
    });
    console.log('userData:', captainData);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-5" src="https://pngimg.com/d/uber_PNG24.png" alt="" />

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

          <button className='bg-[#FFCA00] text-black font-semibold mb-2 rounded px-4 py-2  w-full text-lg'>
            Login</button>
        </form>

        <p className='text-center'>New Here ? <Link to='/captainsignup' className='text-blue-600'>Register as Captain</Link></p>
      </div>
            <div>
              <Link to ='/userlogin' className='inline-block bg-[#111] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg'>
                Sign in as User</Link>
            </div>
    </div>
  )
}

export default CaptainLogin