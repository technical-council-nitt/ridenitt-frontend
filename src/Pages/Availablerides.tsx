import Navigation from "../Components/Navigation";
import React from "react";
import {useState} from "react";

export const AvailableRidesComponent: React.FC = () => {
    const [ishidden,setishidden]=useState(true);

    
    
    return(
        <div className="page bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] h-[240vh] w-[100vw] relative [@media(min-height:900px)]:h-[180vh]">
            <header className="header h-[max] w-[100vw] top-[5vh] relative left-[4vw]">
                <div className="input relative rounded-[50px] p-2 bg-[white]">
                    <input type="text" placeholder="Search" className="border-[1px] border-black w-[73vw] h-[6vh] rounded-[50px] p-[3vw] text-[2vh] mr-[-3vw]"/>
                    <img src="search-glass.svg" className="absolute inline right-[13%] top-[30%] h-[35%] w-[35%]"></img>
                    <img src="faq.svg" className="h-[6vh] w-[6vh] relative inline ml-[20px]"></img>
                </div>
            </header>
            <section className="relative top-[8vh] px-2">
                <p className="connect text-[26px] text-[#2F2E6B] font-Quicksand text-left font-[600]">Connect. Ride. Save. Repeat.</p>
                <p className="welcome text-[21px]  text-[#01653F] font-Quicksand text-left font-[600]">Welcome Back, User_Name!</p>
                <img src="filter.svg" id="filter_img" className="absolute h-[max] w-[max] right-[5%] block" onClick={()=> setishidden(!ishidden)}></img>
                <p className="ridematch text-[34px] text-[#008955] font-Quicksand text-left font-[700]">Ride-Match</p>
                <div className="date relative">
                    <p className="leftbar border-[1px] border-[#B9B9B9] w-[34vw] absolute top-[50%] left-[0%]"></p>
                    <p className="datetext font-Quicksand font-[700px] text-[#91908E] text-[4vw] relative left-[37%] inline">2nd May 2024</p>
                    <p className="rightbar border-[1px] border-[#B9B9B9] w-[34vw] absolute top-[50%] right-[0%]"></p>
                </div>
            </section>
            <main className="pb-40 feed relative w-[100vw] top-[10vh] grid grid-cols-1 p-2 gap-y-4">
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
                    <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">Chathiram Bus Stand</div>
                    <img src="car.svg" className="h-[75px] absolute right-[5%]"></img>
                    <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">Car</div>
                    <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">10:00 - 11:00 AM  | 2 people sharing</div>
                    <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
                    <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by Laxmi</div>
                    <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
                        <div className="send absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">Requested</div>
                    </div>
                </section>
                <section className="unable_to_find relative">
                    <div className="textbox relative top-[0px] font-Poppins font-[480] text-[20px] text-[#000000] tracking-wide">Unable to find a match? Fret not, click here to post your ride.</div>
                    <div className="postridebutton absolute left-[15%] mt-[10px] bg-[#008955] border-2 h-[90%] w-[70%] border-[#000000] rounded-[90px]">
                        <div className="postridetext absolute top-[25%] left-[33%] text-[#FFFFFF] font-Quicksand font-[700] text-[100%]">Post a ride</div>
                    </div> 
                </section>
                <div className={ishidden ? "hidden" : "block"} id="filter">
                    <section className="filter fixed top-[40vh] opacity-1 h-[50vh] w-[100vw] bg-[#F3FCF9] grid grid-cols-[10px,0.5fr,30px,1fr,15px] pt-[10px] [@media(min-height:900px)]:top-[45vh]">
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