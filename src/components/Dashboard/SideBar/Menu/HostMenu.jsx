import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const HostMenu = ({ closeSidebar }) => {
    return (
        <>
            <MenuItem closeSidebar={closeSidebar} icon={BsFillHouseAddFill} label='Add Room' address='add-room' />
            <MenuItem closeSidebar={closeSidebar} icon={MdHomeWork} label='My Listings' address='my-listings' />
            <MenuItem
                closeSidebar={closeSidebar}
                icon={MdOutlineManageHistory}
                label='Manage Bookings'
                address='manage-bookings'
            />
        </>
    )
}

export default HostMenu