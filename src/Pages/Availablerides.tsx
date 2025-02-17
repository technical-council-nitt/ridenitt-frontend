

import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Redirect from "../Components/Redirect";
import { useCurrentRide } from "../Hooks/useCurrentRide";
import axios from "axios";
import { Link } from "react-router-dom";
import RideDetailsCard from "../Components/RideDetailsCard";
import Header from "../Components/Header";

export const AvailableRidesComponent: React.FC = () => {
    const { currentRide, loading: currentRideLoading } = useCurrentRide();

    const [ishidden, setishidden] = useState(true);
    const { user } = useAuth();
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

    if (!user) {
        return (
            <Redirect to="/start" />
        )
    }

    return (
        <div className="p-4 bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] min-h-screen relative">
            <Header />
            <section className="mt-4">
                <p className="connect text-[26px] text-[#2F2E6B] font-Quicksand text-left font-[600]">Connect. Ride. Save. Repeat.</p>
                <p className="welcome text-[21px]  text-[#01653F] font-Quicksand text-left font-[600]">Welcome Back, {user.name}!</p>
                <div className="flex justify-between items-center gap-4">
                    <p className="ridematch text-[34px] text-[#008955] font-Quicksand text-left font-[700]">Ride-Match</p>
                    <img src="filter.svg" id="filter_img" className="" onClick={() => setishidden(!ishidden)}></img>
                </div>
                <div className="flex items-center gap-2">
                    <div className="grow border border-[#B9B9B9]"></div>
                    <div className="w-fit font-Quicksand font-[700px] text-[#91908E]">
                        {new Date().toDateString()}
                    </div>
                    <div className="grow border border-[#B9B9B9]"></div>
                </div>
            </section>
            <main className="pb-60 mt-4 p-2">
                {rides.length === 0 && (
                    <p className="mt-8 text-center text-xl">
                        No rides available
                    </p>
                )}

                <ul className="flex flex-col gap-4">
                    {rides.map(ride => (
                        <RideDetailsCard alreadyInGroup={!!currentRide} refreshRide={fetchRides} key={ride.id} ride={ride} />
                    ))}
                </ul>


                <div className="fixed bottom-[70px] border-t border-solid border-neutral-300 p-4 inset-x-0 flex flex-col justify-center items-center gap-2 backdrop-blur-3xl">
                    <p className="leading-5">
                        Unable to find a match? Fret not, click here to post your ride.
                    </p>

                    <Link to="/create-ride" className="text-white w-full max-w-60 text-center p-2 bg-green-600 border border-black border-solid rounded-full drop-shadow-2xl font-bold right-4">
                        Post a Ride
                    </Link>
                </div>

            </main>

        </div>

    )

}
export default AvailableRidesComponent;