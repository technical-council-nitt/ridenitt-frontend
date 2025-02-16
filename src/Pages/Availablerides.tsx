import Navigation from "../Components/Navigation";
import React from "react";
import { useState } from "react";
import Header from "../Components/Header";
export const AvailableRidesComponent: React.FC = () => {
    const [ishidden, setishidden] = useState(true);



    return (
        <div className="page bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] min-h-max w-[100vw] relative [@media(min-height:900px)]:h-min overflow-y-scroll">
            <Header />
            <section className="fixed z-20 top-20 p-6 pt-0 pb-0 bg-white w-[100vw]">
                <p className="connect text-2xl text-[#2F2E6B] font-Quicksand text-left font-[600]">Connect. Ride. Save. Repeat.</p>
                <p className="welcome text-0.5xl  text-[#01653F] font-Quicksand text-left font-[600]">Welcome Back, User_Name!</p>
                <img src="filter.svg" id="filter_img" className="absolute h-[max] w-[max] right-[5%] block" onClick={() => setishidden(!ishidden)}></img>
                <p className="ridematch text-2xl text-[#008955] font-Quicksand text-left font-[700]">Ride-Match</p>
                <div className="date relative">
                    <p className="leftbar border-[1px] border-[#B9B9B9] w-[30vw] absolute top-[50%] left-[0%]"></p>
                    <p className="datetext font-Quicksand font-[700px] text-[#91908E] text-[0.95em] relative left-[34.5%] inline">2nd May 2024</p>
                    <p className="rightbar border-[1px] border-[#B9B9B9] w-[30vw] absolute top-[50%] right-[0%]"></p>
                </div>
            </section>
            <main className="feed relative w-[100vw] flex flex-wrap p-6 pt-2 gap-y-4 top-[35vh] [@media(min-height:900px)]:top-[20vh] mb-[52vh] [@media(min-height:900px)]:mb-[35vh]">
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="border-2 border-[#08B783] rounded-lg p-4 bg-[#C1EDE08C] w-[400px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#5A5A5A]">Chathiram Bus Stand</h2>
                            <p className="text-sm text-gray-400 font-semibold">10:00 - 11:00 AM | 2 people sharing</p>
                        </div>
                        <div>
                            <img src="car.svg" alt="Car" className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span><img src="profile.svg" className="h-[15px] mr-2"></img></span>
                        <p className="font-semibold text-gray-800">Posted by Laxmi</p>
                    </div>

                    <div className="flex justify-end mr-4 -mt-8">
                        <span className="text-gray-800 font-semibold">Car</span>
                    </div>

                    <div className="mt-10">
                        <button className="w-full py-2 text-green-700 font-semibold rounded-lg border-2 border-[#08B783]">
                            Requested
                        </button>
                    </div>
                </section>
                <section className="unable_to_find ml-[20%] fixed bottom-[80px] flex justify-center items-center">
                    <button className="postridebutton  mt-[10px] bg-[#008955] border-2 h-[50px] w-[200px] border-[#000000] rounded-[90px] text-white font-semibold">
                        Post a ride
                    </button>
                </section>
                <div className={ishidden ? "hidden" : "block"} id="filter">
                    <section className="filter fixed top-[40vh] left-0 opacity-1 h-[50vh] w-[100vw] bg-[#F3FCF9] grid grid-cols-[2vw,0.5fr,5vw,1fr,6vw] pt-[10px] [@media(min-height:900px)]:top-[45vh]">
                        <div className="time col-start-2 col-end-3 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Time</div>
                        <div className="time col-start-4 col-end-5 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">5:30 PM - 6:30 PM</div>
                        <div className="time col-start-2 col-end-3 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Date</div>
                        <div className="time col-start-4 col-end-5 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">2nd May 2025</div>
                        <div className="time col-start-2 col-end-3 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center pl-[20px]">Preferred Gender</div>
                        <div className="time col-start-4 col-end-5 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Not selected</div>
                        <div className="time col-start-2 col-end-3 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Share Count</div>
                        <div className="time col-start-4 col-end-5 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Not Selected</div>
                        <div className="time col-start-2 col-end-3 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Vehicle Type</div>
                        <div className="time col-start-4 col-end-5 border-2 bg-[#FFFFFF] border-[#008955] h-[60px] rounded-[13px] flex justify-center items-center">Car</div>
                    </section>
                </div>
            </main>
            <Navigation />
        </div>

    )

}
export default AvailableRidesComponent;