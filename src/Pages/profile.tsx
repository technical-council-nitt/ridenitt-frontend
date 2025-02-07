import { Link } from "react-router-dom";
import Navigation from "../Components/Navigation";
import React from "react";

export const ProfileComponent: React.FC = () => {
    return (
        <div className="page bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] h-[120vh] w-[100vw] relative [@media(min-height:900px)]:h-[110vh]">
            <header className="header w-screen h-[max] relative top-[10vh] pl-[10px]">
                <div className="heading text-[#008955] text-[10vw] font-Quicksand font-[700]">My Profile</div>
                <div className="stayupdated font-Quicksand font-[600] mt-[-5px]">Stay updated!</div>
            </header>
            <section className="profile top-[12vh] h-[max] w-[100vw] relative">
                <img src="profilepic.svg" className="profilepic left-[30%] relative h-[40%] w-[40%]"></img>
                <img src="camera.svg" className="h-[23%] w-[23%] absolute top-[50%] right-[25%]"></img>
                <div className="name text-[#5A5A5A] font-[700] mt-[5px] text-[7vw] font-[Poppins] ml-[30%]">Navin Kumar</div>
            </section>
            <main className="details grid grid-cols-1 relative top-[12vh] p-[4vw] gap-y-[10px]">
                <div className="email text-[#414141] text-[5.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-[15px] font-[600] font-[Poppins] relative">navinnit2006@gmail.com
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
                <div className="email text-[#414141] text-[5.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-[15px] font-[600] font-[Poppins] relative">+919985483586
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
                <div className="email text-[#414141] text-[5.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-[15px] font-[600] font-[Poppins] relative">Address
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
            </main>
            <section className="relative top-[10vh] w-[100vw] grid grid-cols-[1fr,1fr] p-[4vw] gap-y-[20px] gap-x-[13px]">
                <Link to="/my-rides" className="myrides h-[50px] w-[50vw] flex justify-center items-center border-[2px] border-[#008955] rounded-[10px] bg-[white] font-[Quicksand] font-[900] text-[#414141] text-[20px] pr-[20px]">My Rides</Link>
                <div className="myrides"></div>
                <div className="myrides h-[50px] flex justify-center items-center border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700] text-[22px]">Update</div>
                <div className="myrides h-[50px] flex justify-center items-center border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700] text-[22px]">Logout</div>
            </section>
            <Navigation />
        </div>


    )

}
export default ProfileComponent;