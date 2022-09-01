import "./register.css"
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { useEffect, useState } from "react";
import swal from 'sweetalert'
import axios from "axios"
import { useHistory } from "react-router-dom";
import { API } from "../../API";

const Register = ({userData}) => {
const history = useHistory()
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
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
    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }
    const togglePassword = () => {

        setPasswordType(!passwordType)
    }
    const register = async () => {
        const { name, email, password, reEnterPassword } = user
        if (!name || !email || !password || (password !== reEnterPassword)) {
            swal("Oh noes!!", " request failed!", "error")  
            return
        }
        try {
            const res = await axios.post(`${API}/register`, user)
            swal("vola!", "Your profile has been created!", "success");
            history.push("/login")
        } catch (e) {
            swal("Oh noes!!", " request failed!", "error");
        }
    }



return (
    <div className="register">
        <h1> Hello User </h1>
        <h2> Please enter your credentials </h2>
        <div className="contact-form">
            <label className="lable"> Name</label>
            <input name="name" value={user.name} class="email" type="text" placeholder="Enter your Name" onChange={handleChange} />
            <label className="lable"> Email</label>
            <input name="email" value={user.email} class="email" type="text" placeholder="Enter your Email" onChange={handleChange} />
            <label className="lable"> Enter your Password</label>
            <div>
                <input name="password" type={passwordType ? "password" : "text"} onChange={handleChange} value={user.password} className="pass" placeholder="XXXXXXXX" />
                <button className="eye" onClick={togglePassword} >
                    {passwordType ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </button>
            </div>
            <label className="lable"> Confirm your Password</label>
            <div>
                <input name="reEnterPassword" type={passwordType ? "password" : "text"} onChange={handleChange} value={user.reEnterPassword} className="pass" placeholder="XXXXXXXX" />
                <button className="eye" onClick={togglePassword}>
                    {passwordType ? <BsFillEyeFill /> : <BsFillEyeSlashFill />} </button>
            </div>
            <div className="button" >
                <input className="submit-btn" type="submit" value="Register" onClick={register} />
                <div>or</div>
                <input className="submit-two"  type="submit" value="Login" onClick={() => history.push("/login")} />
            </div>

        </div>

       

    </div>
)
}

export default Register