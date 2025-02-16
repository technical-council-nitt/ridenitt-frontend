 import Navigation from "../Components/Navigation";
import React from "react";
import {useState} from "react";
import Header from "../Components/Header";
export const AvailableRidesComponent: React.FC = () => {
    const [ishidden,setishidden]=useState(true);

    
    
    return(
        <div className="page bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] min-h-min w-[100vw] relative [@media(min-height:900px)]:h-min overflow-y-scroll">
            <Header />
            <section className="fixed z-20 top-[13vh] p-6 pt-0 pb-0 bg-white w-[100vw]">
                <p className="connect text-2xl text-[#2F2E6B] font-Quicksand text-left font-[600]">Connect. Ride. Save. Repeat.</p>
                <p className="welcome text-0.5xl  text-[#01653F] font-Quicksand text-left font-[600]">Welcome Back, User_Name!</p>
                <img src="filter.svg" id="filter_img" className="absolute h-[max] w-[max] right-[5%] block" onClick={()=> setishidden(!ishidden)}></img>
                <p className="ridematch text-2xl text-[#008955] font-Quicksand text-left font-[700]">Ride-Match</p>
                <div className="date relative">
                    <p className="leftbar border-[1px] border-[#B9B9B9] w-[30vw] absolute top-[50%] left-[0%]"></p>
                    <p className="datetext font-Quicksand font-[700px] text-[#91908E] text-[0.95em] relative left-[34.5%] inline">2nd May 2024</p>
                    <p className="rightbar border-[1px] border-[#B9B9B9] w-[30vw] absolute top-[50%] right-[0%]"></p>
                </div>
            </section>
            <main className="feed relative w-[100vw] flex flex-wrap p-6 pt-2 gap-y-4 top-[35vh] [@media(min-height:900px)]:top-[25vh] mb-[55vh]">
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[100%] rounded-[10px] relative">
                    <div className="dest text-xl font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[9%] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[3%] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className="img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[8%] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="unable_to_find ml-[20vw] fixed bottom-[80px]">
                    <div className="postridebutton left-[15%] mt-[10px] bg-[#008955] border-2 h-[50px] w-[200px] border-[#000000] rounded-[90px]">
                        <div className="postridetext  text-[#FFFFFF] font-Quicksand font-[700] text-md pt-3 pl-12">Post a ride</div>
                    </div> 
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