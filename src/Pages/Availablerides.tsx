import Navigation from "../Components/Navigation";
import React from "react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Redirect from "../Components/Redirect";

export const AvailableRidesComponent: React.FC = () => {
    const [ishidden, setishidden] = useState(true);
    const { user, authLoading } = useAuth();
    const [rides, setRides] = useState<Ride[]>([]);

    if (authLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return (
            <Redirect to="/start" />
        )
    }

    return (
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] relative">
            <header className="header h-[max] top-[5vh] relative w-fit mx-auto">
                <div className="input relative rounded-[50px] p-2 bg-[white]">
                    <input type="text" placeholder="Search" className="border-[1px] border-black w-[73vw] h-[6vh] rounded-[50px] p-[3vw] text-[2vh]" />
                    <img src="search-glass.svg" className="absolute inline right-[13%] top-[30%] h-[35%] w-[35%]"></img>
                    <img src="faq.svg" className="h-[6vh] w-[6vh] relative inline ml-[20px]"></img>
                </div>
            </header>
            <section className="relative top-[8vh] px-2">
                <p className="connect text-[26px] text-[#2F2E6B] font-Quicksand text-left font-[600]">Connect. Ride. Save. Repeat.</p>
                <p className="welcome text-[21px]  text-[#01653F] font-Quicksand text-left font-[600]">Welcome Back, {user.name}!</p>
                <img src="filter.svg" id="filter_img" className="absolute h-[max] right-[5%] block" onClick={() => setishidden(!ishidden)}></img>
                <p className="ridematch text-[34px] text-[#008955] font-Quicksand text-left font-[700]">Ride-Match</p>
                <div className="date relative">
                    <p className="leftbar border-[1px] border-[#B9B9B9] w-[34vw] absolute top-[50%] left-[0%]"></p>
                    <p className="datetext font-Quicksand font-[700px] text-[#91908E] text-[4vw] relative left-[37%] inline">
                        {new Date().toDateString()}
                    </p>
                    <p className="rightbar border-[1px] border-[#B9B9B9] w-[34vw] absolute top-[50%] right-[0%]"></p>
                </div>
            </section>
            <main className="pb-40 feed relative top-[10vh] p-2">
                <ul className="flex flex-col gap-4">
                    {rides.map(ride => (
                        <li key={ride.id} className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                            <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                            <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                            <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                            <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                            <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                            <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                            <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                                <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>

    )

}
export default AvailableRidesComponent;