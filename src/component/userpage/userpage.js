import "./userpage.css"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { isAutheticated } from "../Auth/authhelper";
import { API } from "../../API";


const Userpage = ({ setLoginUser, userData }) => {


    const { token } = isAutheticated();


    const [user, setUser] = useState({
        age: "",
        mobile: "",
        dob: "",
        gender: ""
    })
    const history = useHistory()

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    useEffect(() => {
        if(userData.profileCompleted){
            history.push("/profile")
        }
    }, [userData, history])

    const Submit = () => {
        if (!user.age || !user.mobile || !user.dob || !user.gender) {
            alert("all fields required")
            return
        }

        axios.patch(`${API}/updateProfile`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                // alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/profile")
            })
    }


    return (
        <div className="userpage">
            <h1> Hello User </h1>
            <div className="contact-form">
                <label> AGE</label>
                <input className="input-field" value={user.age} onChange={handleChange} type="number" placeholder="Age" name="age" />
                <label> Mobile Number</label>
                <input type="number" id="phone" value={user.mobile} onChange={handleChange} className="input-field" name="mobile" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                <label> Date Of Birth</label>
                <input class="DOB" type="Date" value={user.dob} onChange={handleChange} name="dob" />
                <label> Gender</label>
                <select name="gender" onChange={handleChange} value={user.gender} className="DOB" id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <div className="button" >
                    <input className="submit-btn" id="left" type="submit" onClick={Submit} value="Save" />
                    <input className="submit-btn " type="submit" onClick={() => {
                        window.localStorage.clear();
                        window.location.reload();
                    }} value="Logout" />
                </div>
            </div>
        </div>
    )
}

export default Userpage