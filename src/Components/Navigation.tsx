import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { IoSpeedometer, IoSpeedometerOutline } from "react-icons/io5";
import { FaBell, FaEnvelope, FaRegBell, FaRegEnvelope, FaRegUser, FaUser } from "react-icons/fa";

const Navigation: React.FC = () => {
    const { user } = useAuth()
    const location = useLocation()

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    return (

        <footer className="fixed bottom-[0px] h-[70px] left-0 right-0 text-white bg-[#008955] grid grid-cols-4 place-items-center">
            <Link className={`grid place-items-center p-4 rounded-full aspect-square ${location.pathname === "/" ? "bg-green-600" : "bg-[#008955]"}`} to="/">
                {location.pathname === "/" ? (
                    <IoSpeedometer size={26} />
                ) : (
                    <IoSpeedometerOutline className="opacity-80" size={26} />
                )}
            </Link>
            <Link className={`grid place-items-center p-4 rounded-full aspect-square ${location.pathname === "/requests" ? "bg-green-600" : "bg-[#008955]"}`} to="/requests">
                {location.pathname === "/requests" ? (
                    <FaEnvelope size={24} />
                ) : (
                    <FaRegEnvelope className="opacity-80" size={24} />
                )}
            </Link>
            <Link className={`grid place-items-center p-4 rounded-full aspect-square ${location.pathname === "/notifications" ? "bg-green-600" : "bg-[#008955]"}`} to="/notifications">
                {location.pathname === "/notifications" ? (
                    <FaBell size={24} />
                ) : (
                    <FaRegBell className="opacity-80" size={24} />
                )}
            </Link>
            <Link className={`grid place-items-center p-4 rounded-full aspect-square ${location.pathname === "/profile" ? "bg-green-600" : "bg-[#008955]"}`} to={user ? "/profile" : "/signup"}>
                {location.pathname === "/profile" ? (
                    <FaUser size={24} />
                ) : (
                    <FaRegUser className="opacity-80" size={24} />
                )}
            </Link>
        </footer>

    );
};

export default Navigation;
