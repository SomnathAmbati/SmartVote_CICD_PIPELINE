import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userType } from '../utils';
import { UserContext } from '../../App';
import M from 'materialize-css';
import Image from "../../Image/Capture.png";
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';

const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [captcha, setcaptcha] = useState("");
  const [userItem, setUserItem] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  const PostData = () => {
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ) {
      M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
      return;
    };
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        userItem
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            history.push("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadCaptchaEnginge(6);
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div className='Body' style={{ display: "grid", placeItems: "center", width: "100%",
    background: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetNfq5HawD6XQgQA6Wjte6tliwYupx6mTLw&usqp=CAU')no-repeat ", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="card" style={{background: 'transparent',border: '2px solid rgba(255, 255, 255, .5)',marginBottom:"7%",borderRadius: '20px',backdropFilter: 'blur(20px)',boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',justifyContent: 'center',alignItems: 'center',overflow: 'hidden',transition: 'transform .5s ease, height .2s ease',marginTop: '1%',paddingLeft: "40px", paddingRight: "40px", paddingTop: "20px", height: "fit-content", width: "30%", display: "flex", placeItems: "center", marginTop: "3%" }}>
        <img src={Image} alt="" style={{ height: "90px", width: "90px", borderRadius: "50%", marginBottom: "15px" }} />
        <div style={{ width: "100%" }}>
          <div className="col">
            <input
              type="text"
              placeholder="Email"
              value={email}
              className="form-control"
              style={{ height: "40px", width: "80%", margin: "0 auto", fontSize: "12px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>
          <div className="col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              style={{ height: "40px", width: "80%", margin: "0 auto", fontSize: "12px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <br />
          <div className="col">
            <select className="form-select" value={userItem} onChange={(e) => setUserItem(e.target.value)} style={{ height: "40px", width: "80%", margin: "0 auto", fontSize: "16px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}>
              {userType.map((item) => (
                <option value={item} key={item}>
                  {" "}
                  {item}{" "}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="captcha-box" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px", width: "80%", margin: "0 auto" }}>
              <LoadCanvasTemplate />
              <input type="text" placeholder='Enter Captcha' onChange={(e) => setcaptcha(e.target.value)} style={{ height: "40px", width: "100%", marginTop: "10px", fontSize: "16px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }} />
            </div>
          </div>
        </div>
        <button className="btn btn mt-4" style={{ backgroundColor: "#c37f1a", fontSize: "16px", fontFamily: "Acme", height: "40px", width: "80%", margin: "0 auto" }} onClick={PostData}>
          Login
        </button>
        <p style={{ fontFamily: "Raleway", textAlign: "center", fontSize: "15px", marginTop: "20px" }}>
          Not Registered? <Link to="/signup" style={{ color: "black", fontWeight: "600" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
