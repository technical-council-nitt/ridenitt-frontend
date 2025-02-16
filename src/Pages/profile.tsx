import Navigation from "../Components/Navigation";
import React from "react";

export const ProfileComponent: React.FC = () => {
    return (
        <div className="page bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] h-screen w-[100vw] relative">
            <header className="header w-screen h-[max] relative top-[3vh] pl-28 block">
                <div className="heading text-[#008955] text-[8.7vw] font-Quicksand font-semibold">My Profile</div>
                <div className="stayupdated font-Quicksand font-[600] mt-[-5px] text-[4.5vw]">Stay updated!</div>
            </header>
            <section className="profile  h-[max] w-[100vw] relative top-[5vh]">
                <img src="profilepic.svg" className="profilepic left-[30%] relative h-[35%] w-[35%]"></img>
                <img src="camera.svg" className="h-[20%] w-[20%] absolute top-[50%] right-[29%]"></img>
                <div className="name text-[#5A5A5A] font-semibold mt-[5px] text-[6vw] font-[Poppins] ml-[33%]">Navin Kumar</div>
            </section>
            <main className="details grid grid-cols-1 relative top-[1vh] p-8 gap-y-[10px]">
                <div className="email text-[#414141] text-[4.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-2.5 font-[600] font-[Poppins] relative">navinnit2006@gmail.com
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
                <div className="email text-[#414141] text-[4.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-2.5 font-[600] font-[Poppins] relative">+919985483586
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
                <div className="email text-[#414141] text-[4.5vw] border-[1.5px] border-[#989393] rounded-[10px] p-2.5 font-[600] font-[Poppins] relative">Address
                    <img src="edit.svg" className="absolute top-[20%] right-[5%]"></img>
                </div>
            </main>
            <section className="relative top-[-5vh] w-[100vw] grid grid-cols-[1fr,1fr] p-8 gap-y-[10px]">
                <div className="myrides h-12 flex justify-center items-center border-[2px] border-[#008955] rounded-[10px] bg-[white] font-[Quicksand] font-[900] text-[#414141] text-lg pr-[20px]">My Rides</div>
                <div className="myrides"></div>
                <div className="myrides h-[45px] flex justify-center items-center border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-semibold text-lg">Update</div>
                <div className="myrides h-[45px] flex justify-center items-center border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-semibold text-lg ml-[10px]">Logout</div>
            </section>
            <Navigation />
        </div>


    )

}
export default ProfileComponent;