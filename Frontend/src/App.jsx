import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './Pages/Start'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainSignup from './Pages/CaptainSignup'
import CaptainLogin from './Pages/CaptainLogin'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/captainsignup" element={<CaptainSignup/>} />
        <Route path="/captainlogin" element={<CaptainLogin/>} />
        <Route path="/usersignup" element={<UserSignup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App