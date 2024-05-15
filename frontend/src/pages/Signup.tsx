import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Gender from '../components/Gender';
import useSignup from '../hooks/useSignup';

const SignUp = () => {

  const [data, setData] =  useState({
    name: '', username: '', password: '', confirmPassword: '', gender: ''
  });

  const { loading, signup } = useSignup();

  const handleGender: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data, gender: e.target.value});
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await signup(data);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-cryptext-gray'>
        <h1 className='text-3xl font-semibold text-center text-cryptext-white'>
          Sign Up
          <span className='text-cryptext-red'> CrypText</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Name</span>
            </label>
            <input
              type='text'
              placeholder='e.g. Gaurav Mehra'
              className='w-full input input-bordered h-10'
              value={data.name}
              onChange={(e) => setData({...data, name: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='gauravmehraa'
              className='w-full input input-bordered h-10'
              value={data.username}
              onChange={(e) => setData({...data, username: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input input-bordered h-10'
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password again'
              className='w-full input input-bordered h-10'
              value={data.confirmPassword}
              onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            />
          </div>

          <Gender onUpdate={handleGender} selectedGender={data.gender} />

          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
           {" Already"} have a CrypText account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
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
