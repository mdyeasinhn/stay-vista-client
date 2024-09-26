import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = ({closeSidebar}) => {
  return (
    <>
      <MenuItem closeSidebar={closeSidebar} icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu