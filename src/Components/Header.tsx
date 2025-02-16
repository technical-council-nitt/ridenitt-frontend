const Header: React.FC = () => {
    return (
        <header className="header h-[20vh] w-[100vw] fixed left-[4vw] z-10 bg-white pt-[9vw]">
            <div className="input relative rounded-[50px] p-2">
                <input type="text" placeholder="Search" className="border-[1px] border-black w-[73vw] h-[20%] rounded-[50px] p-[3vw] text-[2vh] mr-[-3vw]" />
                <img src="search-glass.svg" className="absolute inline right-[15%] top-[30%] h-[35%] w-[35%]"></img>
                <img src="faq.svg" className="h-[4.5vh] w-[4.5vh] relative inline ml-[20px] "></img>
            </div>
        </header>
    );

};
export default Header