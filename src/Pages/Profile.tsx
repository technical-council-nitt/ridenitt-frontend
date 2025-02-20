import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Redirect from "../Components/Redirect";

const ProfileComponent: React.FC = () => {
    const navigate = useNavigate()
    const { user, refreshAuth, setOngoingUpdatePh } = useAuth();
    const [editing, setEditing] = React.useState(false);
    const [name, setName] = React.useState(user?.name || '');
    const [phoneNumber, setPhoneNumber] = React.useState(user?.phoneNumber?.slice(3) || '');
    const [gender, setGender] = React.useState<'MALE' | 'FEMALE'>(user?.gender || 'MALE')
    // const [address, setAddress] = React.useState(user?.address || '');
    const [loading, setLoading] = React.useState(false);

    const handleCancelEdit = () => {
        setEditing(false);
        setName(user?.name || '');
        setPhoneNumber(user?.phoneNumber?.slice(3) || '');
        // setAddress(user?.address || '');
    }

    const handleUpdate = async () => {
        //validate
        const n = name.trim();
        const p = "+91" + phoneNumber.trim().replaceAll(/\s+/g, '');

        if (!user) {
            toast.error("User not found");
            return
        }
        if (n.length < 3) {
            toast.error("Name must be atleast 3 characters long");
            return;
        }
        if (p.length !== 13) {
            toast.error("Invalid phone number");
            return;
        }

        setLoading(true);

        try {
            if (
                n !== user.name
                || gender !== user?.gender
                // || address !== user?.address
            ) {
                await axios.post("/api/users/me", {
                    name: n,
                    gender: user?.gender,
                    address: user?.address || "",
                })

                setEditing(false);
                if (phoneNumber === user.phoneNumber) toast.success("Profile updated successfully");
                refreshAuth();
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error("Failed to update profile");
            return;
        }

        if (user.phoneNumber === p) return

        setOngoingUpdatePh({
            name,
            oldPh: user.phoneNumber,
            newPh: p
        })

        try {
            setLoading(true);
            
            await axios.post("/auth/send-otp", { phoneNumber: p })
            
            toast.success("OTP Sent for phone number update");
            navigate("/update-phone-number")
        } catch (e) {
            console.log(e);
            toast.error("Failed to send OTP for phone number update");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!editing) return

        const firstInput = document.getElementById("name-input") as HTMLInputElement;
        if (firstInput) {
            firstInput.focus();
        }
    }, [editing])

    if (!user) {
        return (
            <Redirect to="/start" />
        )
    }

    return (
        <div className="p-8 pb-40  bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] relative">
            <div>
                <header className="header h-[max] relative">
                    <div className="text-4xl font-semibold text-[#008955] font-Quicksand">My Profile</div>
                    <div className="mt-2 text-neutral-600 font-Quicksand font-[600]">Stay updated!</div>
                </header>
                {/* <section className="mt-4 w-fit mx-auto">
                    <img src="profilepic.svg" className="profilepic relative h-32 w-32"></img>
                    <div className="name text-black font-[700] text-center text-2xl">
                        {user.name}
                    </div>
                </section> */}
                <main className="details grid grid-cols-1 gap-4 mt-4">
                    {editing ? <>
                        <span className="-mb-3">
                            Username
                        </span>
                        <input id="name-input" placeholder="John Doe" value={name} onChange={e => setName(e.currentTarget.value)} className="p-2 px-4 text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins] relative">
                        </input>

                        <span className="-mb-3">
                            Gender
                        </span>
                        <select className="p-2 px-4 font-[600] font-[Poppins] relative text-neutral-600 rounded-[10px] border-[#989393] border-[1.5px] bg-transparent" aria-placeholder="Gender" value={gender} onChange={e => setGender(e.currentTarget.value as any)}>
                            <option value="MALE"> MALE </option>
                            <option value="FEMALE"> FEMALE </option>
                        </select>

                        <span className="-mb-3">
                            Mobile
                        </span>
                        <div className="py-2 pl-12 pr-4 outline-2 outline-transparent outline has-[input:focus]:outline-blue-700 has-[input:focus]:border-transparent relative text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins]">
                            <div className="bg-green-100 rounded-l-[10px] p-2 absolute inset-y-0 left-0 grid place-items-center">+91</div>
                            <input placeholder="+91 xxxxx xxxxx" value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)} className="bg-transparent outline-none" />
                        </div>
                        {/* <input placeholder="Enter Address" value={address} onChange={e => setAddress(e.currentTarget.value)} className="email text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] p-2 px-4 font-[600] font-[Poppins] relative">
                        </input> */}
                    </> : <>
                        <span className="-mb-3">
                            Username
                        </span>
                        <div className="p-2 px-4 text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins] relative">
                            {name}
                        </div>
                        <span className="-mb-3">
                            Gender
                        </span>
                        <div className="p-2 px-4 text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins] relative">
                            {gender}
                        </div>
                        <span className="-mb-3">
                            Mobile
                        </span>
                        <div className="p-2 pl-12 px-4 relative text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] font-[600] font-[Poppins]">
                            <div className="bg-green-100 rounded-l-[10px] p-2 absolute inset-y-0 left-0 grid place-items-center">+91</div>
                            {phoneNumber}
                        </div>
                        {/* <div className="email text-[#414141] border-[1.5px] border-[#989393] rounded-[10px] p-2 px-4 font-[600] font-[Poppins] relative">
                            {address || "Address"}
                        </div> */}
                    </>}
                </main>
                <section className="mt-4 grid grid-cols-2 gap-4">
                    {editing ? (
                        <>
                            <button disabled={loading} onClick={handleCancelEdit} className="p-2 disabled:opacity-50 border-[1.5px] border-[black] rounded-[90px] text-[#008955] font-[Quicksand] font-[700]">Cancel</button>
                            <button disabled={loading} onClick={handleUpdate} className="p-2 disabled:opacity-50 border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700]">Save</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setEditing(true)} className="p-2 border-[1.5px] border-[black] rounded-[90px] bg-[#008955] text-[white] font-[Quicksand] font-[700]">Update</button>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default ProfileComponent;