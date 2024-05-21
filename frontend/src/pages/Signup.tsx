import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Gender from '../components/Gender';
import useSignup from '../hooks/useSignup';
import { IoEye, IoEyeOff, IoPerson, IoKey, IoText } from "react-icons/io5";

const SignUp = () => {

  const [data, setData] =  useState({
    name: '', username: '', password: '', confirmPassword: '', gender: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, signup } = useSignup();

  const handleGender: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data, gender: e.target.value});
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await signup(data);
  }

  return (
    <div className='flex flex-col items-center justify-center w-76 sm:w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-cryptext-gray'>
        <h1 className='text-3xl font-semibold text-center text-cryptext-white'>
          Sign Up
          <span className='text-cryptext-red'>{" {CrypText} "}</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="mt-6 input input-bordered flex items-center gap-2 focus:outline-none">
              <IoText/>
              <input
                type='text'
                placeholder='Name'
                className='grow'
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
              />
            </label>
          </div>

          <div>
            <label className="mt-4 input input-bordered flex items-center gap-2 focus:outline-none">
              <IoPerson/>
              <input
                type='text'
                placeholder='Username'
                className='grow'
                value={data.username}
                onChange={(e) => setData({...data, username: e.target.value})}
              />
            </label>
          </div>
          <div>
            <label className="mt-4 input input-bordered flex items-center gap-2 focus:outline-none">
              <IoKey/>
              <input
                type={`${ showPassword? 'text' : 'password'}`}
                placeholder='Password'
                className='grow'
                value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <IoEye/>: <IoEyeOff/>}
              </div>
            </label>
          </div>
          <div>
            <label className="mt-4 input input-bordered flex items-center gap-2 focus:outline-none">
              <IoKey/>
              <input
                type={`${ showConfirmPassword? 'text' : 'password'}`}
                placeholder='Confirm Password'
                className='grow'
                value={data.confirmPassword}
              onChange={(e) => setData({...data, confirmPassword: e.target.value})}
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                { showConfirmPassword ? <IoEye/>: <IoEyeOff/>}
              </div>
            </label>
          </div>

          <Gender onUpdate={handleGender} selectedGender={data.gender} />

          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block hover:text-cryptext-green'>
           {" Already"} have a CrypText account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm h-10 mt-2' disabled={loading}>
              {loading?
              <span className='loading loading-spinner'></span>:
              "Join CrypText"}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp;
