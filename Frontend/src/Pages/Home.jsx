import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_715,w_1072/v1558544433/assets/d9/d659d2-3eed-4186-9fb8-a62d763f8724/original/Law_PIllar.svg)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
        <div className='bg-white pb-7 py-4 px-4 '>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/userlogin' className='flex itme-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home