import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'
import { getInitials, getUserHomeRoom } from '../utils/helpers';
import { Avatar } from 'antd';
import logo from '../assets/zartlogo.png'

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  }
  const openMyRooms = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    try {
      const room = await getUserHomeRoom(user.data.id);
      navigate(`/${room.id}`)
    } catch (error) {
      console.log('Error occured')
    }
  }


  return (
    <nav className='navbar'>
      <div className='container navbar-content'>
        <Link className=' font-bold flex gap-x-2' to={"/"}><img src={logo} className=' h-6'/> <span>Zarttech RTC</span></Link>

        {user && <span onClick={openMyRooms} className='link font-medium text-blue-700'>My Rooms</span>}

        <div className='navbar-buttons'>

          {!user && <> <Link to="/signin"><button className=' whitespace-nowrap bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded'>SignIn</button></Link>
            <Link to="/signup"><button className=' whitespace-nowrap bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded'>Signup</button></Link>
          </>}

          {user && <span><Avatar>{getInitials(user.data.name)}</Avatar> {user.data.name}</span>}
          {user && <button className=' whitespace-nowrap bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded' onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
