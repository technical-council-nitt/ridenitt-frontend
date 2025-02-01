import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between p-4 bg-green-500 w-[375px] h-[677px]">
      <div className="flex items-center space-x-2 text-white w-full">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg w-full" // Makes the input field take up the full width
        />
        <button className="text-white">🔍</button>
      </div>
    </div>
  );
};

export default Header;
