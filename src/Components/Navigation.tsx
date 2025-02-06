import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <footer className="fixed bottom-[0px] h-[70px] w-[100%] bg-[#008955] flex justify-around items-center">
            <div className="speed">
                <img src="speed.svg" className="bg-[#C1EDE08C] h-[40px]" />
            </div>
            <Link to=""><img src="calender.svg" /></Link>
            <Link to=""><img src="notification.svg" /></Link>
            <Link to="/profile"><img src="profile-footer.svg" className="h-[50px] w-[50px] rounded-[50%]" /></Link>
        </footer>

    );
};

export default Navigation;
