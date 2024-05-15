import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-cryptext-gray'>
        <h1 className='text-3xl font-semibold text-center text-cryptext-white'>
          Login
          <span className='text-cryptext-green'> CrypText</span>
        </h1>

        <form>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
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
            />
          </div>

          <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
           {" Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2'>Login</button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login