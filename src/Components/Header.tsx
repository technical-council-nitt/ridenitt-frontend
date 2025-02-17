import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <header className="header w-screen">
            <div className="input relative rounded-[50px] p-2 flex">
                <input type="text" placeholder="Search" className="border-[1px] border-black w-[73vw] h-[40px] rounded-[50px] p-[20px] text-[2vh] mr-[-3vw]" />
                <img src="search-glass.svg" className="h-6 w-6 mt-2.5 -ml-5"></img>
                <Link to="/faq"><img src="faq.svg" className="h-10 w-10 ml-5"></img></Link>
            </div>
        </header>
    );

};
export default Header