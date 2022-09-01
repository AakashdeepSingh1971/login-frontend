import "./profile.css"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { isAutheticated } from "../Auth/authhelper";
import { API } from "../../API";


const Profile = ({ setLoginUser, userData }) => {


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

    const Submit = () => {
        if (!user.age || user.mobile || user.dob || user.gender) {
            alert("all fields required")
            return
        }

        axios.patch(`${API}/updateProfile`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/profile")
            })
    }


    return (
        <div className="userpage">
            <h1> Hello User </h1>
            <div className="contact-form">
                <label> Name: {userData.name}</label>
                <br />
                <label> Email: {userData.email}</label>
                <br />
                <label> AGE: {userData.age}</label>
                <br />
                <label> Mobile Number: {userData.mobile}</label>
                <br />
                <label> Date Of Birth: {userData.dob}</label>
                <br />
                <label> Gender: {userData.gender}</label>
                <div className="button" >
                    <input className="submit-btn " type="submit" onClick={() => {
                        window.localStorage.clear();
                        window.location.reload();
                    }} value="Logout" />
                </div>
            </div>
        </div>
    )
}

export default Profile