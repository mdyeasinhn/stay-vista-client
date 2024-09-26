import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address, icon: Icon, closeSidebar }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'}`
            }
            onClick={closeSidebar}  // Close sidebar when clicked
        >
            <Icon className='w-5 h-5' />
            <span className='mx-4 font-medium'>{label}</span>
        </NavLink>
    )
}

MenuItem.propTypes = {
    label: PropTypes.string.isRequired, // Make sure the label is required
    address: PropTypes.string.isRequired, // Ensure address is required
    icon: PropTypes.elementType.isRequired, // icon should be a valid element/component type
    closeSidebar: PropTypes.func, // Define closeSidebar as a function
}

export default MenuItem
