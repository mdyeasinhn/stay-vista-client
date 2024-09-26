import PropTypes, { object } from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import UpdateRoomForm from '../Form/UpdateRoomForm'
import { imageUploadFn } from '../../api/Utils'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { MdCancel } from "react-icons/md";
import toast from 'react-hot-toast'

const UpdateRoomModal = ({ setIsEditModalOpen, isOpen, room, refetch }) => {
  const queryClient = useQueryClient()
  const axiosSecure = useAxiosSecure()
  const [roomData, setRoomData] = useState(room);
  const [loading, setLoading] = useState();

  const [dates, setDates] = useState(
    {
      startDate: new Date(room?.from),
      endDate: new Date(room?.to),
      key: 'selection'
    }
  )

  //   handle image Update
  const handleImage = async image => {
    setLoading(true);

    try {
      const imageUrl = await imageUploadFn(image);
      console.log(imageUrl);
      setRoomData({ ...roomData, image: imageUrl })
      setLoading(false);

    } catch (error) {
      console.log(error);
    }

  }
  // handle dates range 
  const handleDates = range => {
    console.log(range);
    setDates(range.selection)
    setRoomData({...roomData, to: range.selection.endDate, from : range.selection.startDate})
  }


  // Put data form db
  const { mutateAsync } = useMutation({
    mutationFn: async updatedRoomData => {
      const { data } = await axiosSecure.put(`/room/update/${room?._id}`, updatedRoomData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room'] })
      refetch()
      setIsEditModalOpen(false)
      console.log('Data save at Mongodb');
      setLoading(false);
      toast.success('Home info updated')
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  // Handle Room Update 
  const handleUpdate = async e => {
    setLoading(true);

    e.preventDefault();
  const updatedRoomData = Object.assign({}, roomData);
    delete updatedRoomData._id
    await mutateAsync(updatedRoomData)

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
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Room Info
                </DialogTitle>
                <div className='mt-2 w-full mb-4'>{/* Update room form */}
                <div className='text-end -mt-8 mb-4'>
                  <button
                    type=''
                    className='  '
                    onClick={() => setIsEditModalOpen(false)}
                  >
                <MdCancel className='text-4xl text-rose-500  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'/>
                  </button>
                </div>
                  <UpdateRoomForm
                    dates={dates}
                    handleDates={handleDates}
                    handleUpdate={handleUpdate}
                    roomData={roomData}
                    handleImage={handleImage}
                    loading={loading}
                    setRoomData={setRoomData}
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

UpdateRoomModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UpdateRoomModal