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

                <p className="text-center font-semibold">Авторизуйтесь для входу</p>

                
                <input type="email" ref={email} placeholder="Введіть email"   className="p-2 m-2 rounded-sm border border-2"/>
                <input type="password" ref={password} placeholder="Введіть пароль" className="p-2 m-2 rounded-sm border border-2" />
                
                <p className="text-red-600 text-sm px-2">{err}</p>
                
                <button onClick={handleValidate}
                className="bg-blue-600 text-white p-2 m-2 rounded-sm">Вхід</button>
               
                
                
                <hr className=" m-2 py-2"/>
                
                
                    
                    
                
            </form>
        </div>

        <div className="flex justify-end items-end">
            <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-right.e6e102c7.svg" alt="rightimg" />
        </div>
    </div>
  )
}

export default Login