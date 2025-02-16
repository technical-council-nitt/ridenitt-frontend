import { Link, redirect } from "react-router-dom";
import React from "react";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Redirect from "../Components/Redirect";

export const ProfileComponent: React.FC = () => {
    const { user, refreshAuth } = useAuth();
    const [editing, setEditing] = React.useState(false);

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

    const handleEdit = () => {
        toast("Feature coming soon!");
    }

    if (!user) {
        return (
            <Redirect to="/start" />
        )
    }

    return (
        <div className="p-8 pb-40  bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] relative">
            {editing ? (
                <div>

                </div>
            ) : (
                <div>
                    <header className="header h-[max] relative">
                        <div className="text-4xl font-semibold text-[#008955] font-Quicksand">My Profile</div>
                        <div className="mt-2 text-neutral-600 font-Quicksand font-[600]">Stay updated!</div>
                    </header>
                    <section className="mt-4 w-fit mx-auto">
                        <img src="profilepic.svg" className="profilepic relative h-32 w-32"></img>
                        {/* <img src="camera.svg" className="h-[23%] w-[23%] absolute right-[25%]"></img> */}
                        <div className="name text-[#5A5A5A] font-[700] text-center text-2xl">
                            {user.name}
                        </div>
                    </section>
                    <main className="details grid grid-cols-1 gap-4 mt-4">
                        <div className="p-2 px-4 text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins] relative">
                            {user.name}
                            {/* <img src="edit.svg" className="absolute right-[5%]"></img> */}
                        </div>
                        <div className="p-2 pl-12 px-4 relative text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins]">
                            <div className="bg-neutral-300 p-2 absolute inset-y-0 left-0 grid place-items-center">+91</div>
                            {user.phoneNumber.slice(3)}
                            {/* <img src="edit.svg" className="absolute right-[5%]"></img> */}
                        </div>
                        <div className="email text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] p-2 px-4 font-[600] font-[Poppins] relative">
                            Address
                            {/* <img src="edit.svg" className="absolute right-[5%]"></img> */}
                        </div>
                    </main>
                    <section className="mt-8 grid grid-cols-2 gap-2">
                        <Link to="/my-rides" className="p-2 border-[2px] border-[#008955] rounded-lg bg-[white] font-[Quicksand] font-[900] text-[#414141] ">My Rides</Link>
                        <div/>
                        <button onClick={handleEdit} className="p-2 border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700]">Update</button>
                        <button onClick={handleLogout} className="p-2 border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700]">Logout</button>
                    </section>
                </div>
            )}
        </div>
    )

}
export default ProfileComponent;