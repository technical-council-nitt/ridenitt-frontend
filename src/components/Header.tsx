import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="p-2 px-4 has-[input:focus]:shadow-md outline-green-400 flex items-center space-x-2 border border-black border-solid rounded-full w-full">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full" // Makes the input field take up the full width
        />
        <button className="text-neutral-400">
          <FaSearch size={16} />
        </button>
      </div>
    </div>
  );
};

export default Header;
