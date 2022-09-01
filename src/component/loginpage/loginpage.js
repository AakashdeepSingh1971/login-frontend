import "./loginpage.css"
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { useState, useEffect } from "react"
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { API } from "../../API";



const Loginpage = ({ setLoginUser, userData }) => {
    const history = useHistory()
    const [user, setUser] = useState({

        email: "",
        password: ""

    })
    useEffect(() => {
        if(userData){
            history.push("/")
        }
    }, [userData, history])

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const [passwordType, setPasswordType] = useState(true);
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = () => {

        setPasswordType(!passwordType)
    }
    const login = () => {
        axios.post(`${API}/login`, user)
            .then(async (res) => {
                // alert(res.data.message)
                setLoginUser(res.data.user)
                await localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token: res.data.token,
                    })
                );
                history.push("/")
            })
    }
    return (
<div className="body">
<div className="userpage">
            <h1>Login</h1>

            <div className="contact-form">

                <label className="lable"> EMAIL</label>
                <input className="email" name="email" value={user.email} type="text" onChange={handleChange} placeholder="Example@gmail.com" />
                <label className="lable"> Enter your Password</label>
                <div>
                    <input name="password" value={user.password} type={passwordType ? "password" : "text"} onChange={handleChange} className="pass" placeholder="XXXXXXXX" />
                    <button className="eye" onClick={togglePassword} >
                        {passwordType ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </button>
                </div>
                <div className="button" >
                    <input className="submit-btn " type="submit" value="Login" onClick={login} />
                    <div>or</div>
                    <input className="submit-btn" id="left" type="submit" onClick={() => history.push("/register")} value="Register" />
                </div>
            </div>
            <div className="login">
            </div>
        </div>
</div>
        

    )
}

export default Loginpage
