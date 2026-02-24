import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

function SingUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl
        rounded-2xl flex'>
        {/* Left side */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col
            items-center justify-center gap-3'>
          <div>
            <h1 className='font-semibold text-[black] text-2xl'>Let's get started</h1>
            <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
          </div>
          <div className='flex flex-col gap-1 w-[80%] items-start
          justify-center px-3 relative'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input id="name" type="text"  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]
            ' placeholder='Your name'/>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input id="email" type="text"  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]
            ' placeholder='Your email'/>
            <label htmlFor="password" className='font-semibold'>password</label>
            <input id="password" type={show ? "text" : "password"}  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]
            ' placeholder='Your password'/>
            {show ? <FaEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer
            right-[5%] bottom-[10%]' 
            onClick={() => setShow(!show)}/>
             :
            <FaEye  className='absolute w-[20px] h-[20px] cursor-pointer
            right-[5%] bottom-[10%]' onClick={() => setShow(!show)}/>}
          </div>
          <div className='flex md:w-[50%] w-[70%] items-center
          justify-between'>
            <span className='px-[10px] py-[5px] border-[2px]
            border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Student</span>
            <span className='px-[10px] py-[5px] border-[2px]
            border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Educator</span>
          </div>
          <button className='w-[80%] h-[40px] bg-black text-white
          cursor-pointer flex items-center justify-center rounded-[5px]'>
            Signup
          </button>
          <div className='w-[80%] flex items-center gap-2'>
            <div className='w-[25%] h-[.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f]
            flex items-center justify-center '>or continue</div>
            <div className='w-[25%] h-[.5px] bg-[#c4c4c4]'></div>
          </div>
          <div className='w-[80%] h-[40px] border-1 
          border-[black] rounded-[5px] flex item-center
          justify-center'>
            <img src={google} alt=""  className='w-[25px] '/>
            <span>oogle</span>
          </div>
          <div className='text-[#6f6f6f]'>
            already have an account?
            <span className='underline underline-offset-1 text-[black] cursor-pointer'
            onClick={()=>navigate("/login")}>
              Login
            </span>
          </div>
        </div>
        {/* Right side */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black]
            md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" />
          <span className='text-2xl text-white'>VIRTUAL COURSES</span>
        </div>
      </form>
    </div>
  )
}

export default SingUp