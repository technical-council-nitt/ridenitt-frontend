import { FaComments, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <header className='w-full flex justify-between items-center gap-4'>
            <div className='relative grow'>
                <input type="text" placeholder="Search" className="p-2 pl-4 pr-12 w-full rounded-full border border-solid border-black grow"></input>
                <FaSearch size={20} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400' />
            </div>
            <Link to="/faq" className='bg-green-600 p-2 w-10 grid place-items-center aspect-square rounded-full text-white'>
                <FaComments size={20} />
            </Link>
        </header>
    );

};
export default Header