import trello from "..//assets/trello-logo.png"
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
        if (msg) return

        navigate("/browse")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Центруємо контейнер */}
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-24 shadow-lg hover:shadow-xl px-8 py-6 bg-white rounded-lg max-w-md">
                <div className="flex justify-center items-center mb-4 col-span-1 md:col-span-2 lg:col-span-4"> {/* Логотип займає всю ширину */}
                    <img src={trello} alt="logo" className="w-[50%]" />
                </div>

                <p className="text-center font-semibold col-span-1 md:col-span-2 lg:col-span-4">Авторизуйтесь для входу</p>

                <input type="email" ref={email} placeholder="Введіть email" className="p-2 m-2 rounded-sm border border-gray-300 col-span-1 md:col-span-2 lg:col-span-4" />
                <input type="password" ref={password} placeholder="Введіть пароль" className="p-2 m-2 rounded-sm border border-gray-300 col-span-1 md:col-span-2 lg:col-span-4" />

                <p className="text-red-600 text-sm px-2 col-span-1 md:col-span-2 lg:col-span-4">{err}</p>

                <button onClick={handleValidate} className="bg-blue-600 text-white p-2 m-2 rounded-sm col-span-1 md:col-span-2 lg:col-span-4">Вхід</button>

                <hr className="m-2 py-2 col-span-1 md:col-span-2 lg:col-span-4" />
            </form>
        </div>
    )
}

export default Login