import React, { useState } from "react";
import Navigation from "../Components/Navigation";

interface FAQ {
    question: string;
    answer: string;
}

const FaqAccordion: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs: FAQ[] = [
        
        { question: "Can I opt out of the confirmed ride?", answer: "Yes, you can opt-out using the leave or cancel option." },
        { question: "Is my number visible to everyone when I post a ride?", answer: "No, your number is only shown to the ones who have sent you a request and you have accepted that. " },
        { question: "How do I create a ride if I don't find anything suitable for me? ", answer: "You can always click on the icon at the bottom right to create a new ride and ask people to join you." },
        { question: "Will I get transferred to a different ride if mine gets canceled?", answer: "No, you will be notified and it's on you to request another ride." },
        { question: "What if my ride partner doesn't turn up?", answer: "It's on the ride partners' mutual conversation and the app owners will not interfere." },
        { question: "Does the app book a ride/taxi/auto for me? ", answer: "No, the app only serves the purpose of connecting people with the same interests." },
       
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="p-4 bg-gradient-to-b from-[#FFFFFF] to-[#C1EDE08C] min-h-screen relative">
            <header className="">
                <div className="heading text-[#008955] text-5xl font-Quicksand font-[700]">FAQs</div>
                <div className="stayupdated font-Quicksand font-[450] mt-[5px] text-lg">Clear your doubts instantly</div>
            </header>
            <section className="mt-4 relative">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-[#008955] rounded-lg mb-2 overflow-hidden"
                    >
                        <div
                            className="bg-[#FFFFFF] flex justify-between items-center px-6 py-4 cursor-pointer"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h3 className="text-[#414141] font-[Quicksand] font-[600] text-lg">{faq.question}</h3>
                            <span className="text-xl font-bold">
                                {activeIndex === index ? "-" : "+"}
                            </span>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-screen py-4 px-6" : "max-h-0"
                                } overflow-hidden bg-white`}
                        >
                            <p className="text-[#414141] font-[Quicksand] text-lg font-[550]">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Navigation />
        </div>
    );
};

export default FaqAccordion;
