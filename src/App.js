import './App.css';
import Register from './component/Register/register';
import Loginpage from './component/loginpage/loginpage';
import Userpage from './component/userpage/userpage';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { isAutheticated } from './component/Auth/authhelper';
import axios from 'axios';
import { API } from './API';
import Profile from './component/profile/profile';

const { token } = isAutheticated();

function App() {
  const [user, setLoginUser] = useState()



  useEffect(() => {
    const getUser = async () => {
      // let existanceData = JSON.parse(localStorage.getItem("userData"));
      // if (existanceData) {
      //   // console.log(existanceData.userData)
      //   setUserData(JSON.parse(localStorage.getItem("userData")).userData);
      if (!token) {
        setLoginUser(false)
        return;
      } else {
        try {
          console.log("requesting user data from server");
          const response = await axios.get(`${API}/getProfile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data)

          //setUserData(response.data.data);
          // localStorage.setItem(
          //   "userData",
          //   JSON.stringify({
          //     userData: response.data.data
          //   })
          // );
          setLoginUser(response.data.user);
        } catch (err) {
          console.log(err);
          setLoginUser(false)
        }
      }
    };
    getUser();
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Userpage setLoginUser={setLoginUser} userData={user} /> : <Loginpage setLoginUser={setLoginUser} />
            } </Route>
          <Route exact path="/profile">
            {
              user && user._id ? <Profile setLoginUser={setLoginUser} userData={user} /> : <Loginpage setLoginUser={setLoginUser} />
            } </Route>
          <Route path="/login">
            <Loginpage setLoginUser={setLoginUser} userData={user} />
          </Route>
          <Route path="/register" >
            <Register userData={user}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
