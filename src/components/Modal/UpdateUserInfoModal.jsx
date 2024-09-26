import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import { MdCancel } from "react-icons/md";
import UserUpdateForm from '../Form/UserUpdateForm';
import { imageUploadFn } from '../../api/Utils';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const UpdateUserInfoModal = ({ setIsEditModalOpen, isOpen }) => {
  const { updateUserProfile } = useAuth()
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();


  const handleImage = async image => {
    setLoading(true);
    try {
      const imageUrl = await imageUploadFn(image);
      setImagePreview(imageUrl);

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    console.log(name, imagePreview);
    const image = imagePreview

    try {
      await updateUserProfile(name, image)
      toast.success('update successfull')
      setIsEditModalOpen(false)
    setLoading(false);


    } catch (error) {
      console.log(error);
    }

  }




  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
          
                <div className='mt-2 mb-2 w-full relative '>
                  <div className=' absolute top-2  right-2 '>
                    <button
                      type='button'
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      <MdCancel className='text-4xl text-white   focus:outline-none' />
                    </button>
                  </div>
                  {/* Update User Form */}
                  <UserUpdateForm

                    handleImage={handleImage}
                    handleUpdate={handleUpdate}
                    handleImageChange={handleImage}
                    imagePreview={imagePreview}
                    loading={loading}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateUserInfoModal.propTypes = {
  setIsEditModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default UpdateUserInfoModal;
