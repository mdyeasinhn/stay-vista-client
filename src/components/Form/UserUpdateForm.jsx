import React from 'react'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { LuFileEdit } from "react-icons/lu";
const UserUpdateForm = ({ handleImage, handleUpdate, imagePreview, loading }) => {
  const { user } = useAuth() || {}

  return (
    <form onSubmit={handleUpdate}>
      <div className='bg-white shadow-lg rounded-2xl w-full'>
        <img
          alt='profile background'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <div className='relative block'>
            <img
              alt='profile'
              src={imagePreview || user?.photoURL} 
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />

            {/* Hidden file  */}
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xl"><LuFileEdit/></span>
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={e => handleImage(e.target.files[0])}
              />
            </label>
          </div>

          <div className='w-full p-2 mt-4 rounded-lg'>
            <div>
              <input
                defaultValue={user?.displayName}
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div className='w-full mt-4'>
            <button disabled={loading} className='bg-rose-500 w-full rounded-md py-3 text-white '>
            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : " Update"}
            </button>
          </div>
        </div>
       
      </div>
      
    </form>
  )
}

export default UserUpdateForm;
