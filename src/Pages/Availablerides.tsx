import Navigation from "../Components/Navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Redirect from "../Components/Redirect";
import { useCurrentRide } from "../Hooks/useCurrentRide";
import axios from "axios";
import { Link } from "react-router-dom";
import RideDetailsCard from "../Components/RideDetailsCard";

export const AvailableRidesComponent: React.FC = () => {
    const { currentRide, loading: currentRideLoading } = useCurrentRide();

    const [ishidden, setishidden] = useState(true);
    const { user, authLoading } = useAuth();
    const [rides, setRides] = useState<Ride[]>([]);

    const fetchRides = () => {
        axios.get(`/api/suggestions`)
            .then(res => {
                setRides(res.data.data);
            })
            .catch(err => {
                console.error("Error fetching suggestions", err);
            })
    }

    useEffect(() => {
        fetchRides()
    }, [currentRideLoading, currentRide])

    if (currentRide) {
        return (
            <Redirect to="/" />
        )
    }

    if (!user) {
        return (
            <Redirect to="/start" />
        )
    }

    return (
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] min-h-screen relative">
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
                <Link to="/create-ride" className="fixed bottom-20 text-white rounded-lg p-1 bg-green-600 drop-shadow-2xl font-bold right-4">
                    Post a Ride?
                </Link>

                {rides.length === 0 && (
                    <p className="mt-8 text-center text-xl">
                        No rides available
                    </p>
                )}

                <ul className="flex flex-col gap-4">
                    {rides.map(ride => (
                        <RideDetailsCard refreshRide={fetchRides} key={ride.id} ride={ride} />
                    ))}
                </ul>
            </main>
        </div>

    )

}
export default AvailableRidesComponent;