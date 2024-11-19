import { Link } from "react-router-dom"
import trello from "..//assets/trello-logo.svg"
const Header = () => {
  return (
    <div className="  w-100 h-12 p-5 bg-slate-900 flex flex-row justify-between text-gray-300">
      
            <div className="left flex justify-center items-center  flex">
         <img src={trello} alt="logo" className="w-80 h-7 pr-44 brightness-150" />
            </div>
            <div className="right flex items-center space-x-4">
                <span className="font-semibold text-lg">Вихід</span>
           <Link to="/">     <img className='rounded-full cursor-pointer' src="https://placehold.co/28x28/png" alt="" />
           </Link> </div>
       
    </div>
  )
}

export default Header