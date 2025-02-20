import { useAuth } from '../Hooks/useAuth';
import Redirect from '../Components/Redirect';
import { FaCar, FaUser } from 'react-icons/fa';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AccountPage() {
  const { user, refreshAuth } = useAuth();

  const handleLogout = () => {
    axios.delete("/auth/logout")
      .then(() => {
        redirect("/start")
        refreshAuth()
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to logout");
      });
  }

  if (!user) {
    return (
      <Redirect to='/start' />
    )
  }

  return (
    <div className="p-8 pb-40  bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] min-h-screen relative">
      <div>
        <header className="header h-[max] relative">
          <div className="text-4xl font-semibold text-[#008955] font-Quicksand">My Account</div>
          <div className="mt-2 text-neutral-600 font-Quicksand font-[600]">Stay updated!</div>
        </header>

        <ul className='mt-4 flex flex-col gap-2'>
          <li>
            <Link className='flex items-center gap-2 p-2 bg-green-100 border border-solid border-black rounded-xl' to="/profile">
              <FaUser className='text-green-800' />
              <span> Profile </span>
            </Link>
          </li>

          <li>
            <Link className='flex items-center gap-2 p-2 bg-green-100 border border-solid border-black rounded-xl' to="/my-rides">
              <FaCar className='text-green-800' />
              <span> My Rides </span>
            </Link>
          </li>

          <li>
            <button onClick={handleLogout} className="p-2 border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700]">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
