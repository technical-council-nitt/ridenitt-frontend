import React, { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Redirect from "../Components/Redirect";

const ProfileComponent: React.FC = () => {
    const { user, hasSignedUp, refreshAuth } = useAuth();
    const [editing, setEditing] = React.useState(false);
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [gender, setGender] = React.useState<'MALE' | 'FEMALE'>('MALE')
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setName(user?.name || "")
        setPhoneNumber(user?.phoneNumber?.slice(3) || "")
        setGender(user?.gender || 'MALE')
    }, [user])

    const handleCancelEdit = () => {
        setEditing(false);
        setName(user?.name || '');
        setPhoneNumber(user?.phoneNumber?.slice(3) || '');
    }

    const handleUpdate = async () => {
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
            await axios.post("/api/users/me", {
                name: n,
                phoneNumber: p,
                gender,
            })

            setEditing(false);
            toast.success("Profile updated successfully");
            refreshAuth(true);
        } catch (e) {
            console.log(e);
            toast.error("Failed to update profile");
            return;
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

    if (!hasSignedUp) {
        return (
            <Redirect to="/sign-up" />
        )
    }

    return (
        <div className="p-8 pb-40  bg-gradient-to-b from-[#E0F6EF8C] via-[#FFFFFF] to-[#C1EDE08C] min-h-screen relative">
            <div>
                <header className="header h-[max] relative">
                    <div className="text-4xl font-semibold text-[#008955] font-Quicksand">My Profile</div>
                    <p className="mt-2 text-sm text-neutral-600">
                        Signed in as <br />
                        {user.email}
                    </p>
                </header>
                <main className="details grid grid-cols-1 gap-4 mt-4">
                    {editing ? <>
                        <span className="-mb-3">
                            Name
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
                    </> : <>
                        <span className="-mb-3">
                            Name
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