import trello from "..//assets/trello-logo.svg"
import at from "..//assets/atlassian.png"
import { useRef, useState } from "react"
import { valid } from "./Validate"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [sign, setSign] = useState(true)
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const email = useRef(null);
    const password = useRef(null);

    const handleToggle = () => {
        setSign(!sign)
    }
    const handleValidate = () => {
        const msg = valid(email.current.value, password.current.value)
        setErr(msg);
        if(msg) return

        navigate("/browse")
    }

  return (
    <div className="container grid grid-cols-3 min-h-[700px] md:gap-36">
        <div className="flex justify-end items-end">
            <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-left.4f52d13c.svg" alt="leftimg" />
        </div>

        <div>
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols my-24 shadow-lg hover:shadow-xl px-8">

                <div className="flex justify-center items-center">
                    <img src={trello} alt="logo" className="w-[36%] py-8 " /></div>

                <p className="text-center font-semibold">{sign? "Log in to continue" : "Sign up to continue"}</p>

                {!sign && <input type="text" placeholder="Enter your name"   className="p-2 m-2 rounded-sm border border-2"/>}  
                <input type="email" ref={email} placeholder="Enter your email"   className="p-2 m-2 rounded-sm border border-2"/>
                <input type="password" ref={password} placeholder="Enter your password" className="p-2 m-2 rounded-sm border border-2" />
                
                <p className="text-red-600 text-sm px-2">{err}</p>
                
                <button onClick={handleValidate}
                className="bg-blue-600 text-white p-2 m-2 rounded-sm">{sign? "Continue" : "Sign up"}</button>
               
                <p className="text-xs text-slate-400 px-2 cursor-pointer ">{sign? "" : "By signing up, I accept the Atlassian Cloud Terms of Service and acknowledge the Privacy Policy."}</p>

                <p onClick={handleToggle}
                 className="text-blue-700 text-center text-sm py-4 cursor-pointer">{sign? "Can't log in? • Create an account" : "Already have an Atlassian account? Log in"}</p>
                
                <hr className=" m-2 py-2"/>
                
                <div className="flex justify-center items-center py-2">
                    <img src={at} alt="logo" className="w-[36%] p-2 bg-slate-400 " /></div>
                    <p className="text-xs text-center py-2">One account for Trello, Jira, Confluence and more.</p>
                    <p className="text-xs text-center py-2">{sign?"Privacy Policy • User Notice":""}</p>
                    <p className="text-xs text-center cursor-pointer">This site is protected by reCAPTCHA and the Google Privacy</p>
                    <p className="text-xs text-center cursor-pointer pb-8">Policy and Terms of Service apply.</p>

                
            </form>
        </div>

        <div className="flex justify-end items-end">
            <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-right.e6e102c7.svg" alt="rightimg" />
        </div>
    </div>
  )
}

export default Login