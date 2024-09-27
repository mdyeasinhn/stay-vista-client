import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import axios from 'axios';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUploadFn } from '../../api/Utils';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const from = location?.state || "/"
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();
  const handleSignup = async e => {
    e.preventDefault();
    const form = e.target
    const name = form.name.value;
    const image = form.image.files[0]
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true)
      // 1. upload image url get img url 
      const imageUrl = await imageUploadFn(image)
      // 2. create user acount
      const res = await createUser(email, password)
      console.log(res);


      // 3. Update profile user name and photo in firebase
      await updateUserProfile(name, imageUrl);
      navigate(from)
      toast.success('Registration successfull')

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }
  // handle google sing in 
  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate(from)
      toast.success('Signup successfull')

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'> Create an Acount</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSignup}
          className='space-y-6 '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div className='relative'>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input

                type={showPassword ? "text" : "password"}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              <span className="absolute top-10 right-2" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                }
              </span>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : " Register"}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          disabled={loading}
          onClick={handleGoogle}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
