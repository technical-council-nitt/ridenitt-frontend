import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Navigation: React.FC = () => {
    const { user } = useAuth()

    return (
        <footer className="fixed bottom-[0px] h-[70px] left-0 right-0 bg-[#008955] flex justify-around items-center">
            <Link to ="/">
                <img src="speed.svg" className="h-[40px]" />
            </Link>
            <Link to="/requests"><img src="calender.svg" /></Link>
            <Link to="/notifications"><img src="notification.svg" /></Link>
            {
                user ? (
                    <Link to="/profile"><img src="profile-footer.svg" className="h-[50px] w-[50px] rounded-[50%]" /></Link>
                ) : (
                    <Link to="/signup"><img src="profile-footer.svg" className="h-[50px] w-[50px] rounded-[50%]" /></Link>
                )
            }
        </footer>

    );
};

export default Navigation;
