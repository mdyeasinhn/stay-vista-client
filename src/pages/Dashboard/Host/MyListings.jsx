import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import RoomDataRow from '../../../components/Dashboard/TableRows/RoomDataRow';
import toast from 'react-hot-toast';
const MyListings = () => {
  const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    // fetch room data
    const {data : rooms = [], isLoading, refetch} = useQuery({
        queryKey : ['my-list', user?.email],
        queryFn : async() => {
          const {data} = await axiosSecure.get(`/my-list/${user?.email}`)
          return data
        }
      })
      // Delete
      const {mutateAsync} =useMutation({
        mutationFn : async (id) => {
          const {data} = await axiosSecure.delete(`/room/${id}`)
          return data
        },
        onSuccess: data =>{
          console.log(data);
          refetch()
          toast.success('Room deleted Successfully!')
        }
      })
      const handleDelete =async (id) =>{
        try {
        await mutateAsync(id)
          
        } catch (error) {
          console.log(error);
        }
      }

      // Loading spinner
      if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>Dashboard | My Listings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead className='gray-200'>
                  <tr >
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100    border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <RoomDataRow key={room._id} room={room}  handleDelete={handleDelete}  refetch={refetch}/>
                    ))}
                    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyListings