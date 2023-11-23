import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { sName, bName } from '../utils';
import M from 'materialize-css';

const SignUp = () => {
  const history = useHistory();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [mobile, setMobile] = useState('');
  const [branch, setBranch] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]); // Added uploadFields to the dependency array

  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'Project');
    data.append('cloud_name', 'dfebaqo69');
    fetch('https://api.cloudinary.com/v1_1/dfebaqo69/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ||
      !firstname ||
      !lastname ||
      !password ||
      !city ||
      !stateName ||
      !mobile ||
      !branch
    ) {
      M.toast({ html: 'Invalid input or missing fields', classes: '#c62828 red darken-3' });
      return;
    }

    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        password,
        email,
        city,
        stateName,
        mobile,
        branch,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="col-5" style={{height: "100%", width:"60%", display: "grid", placeItems: "center", height: "100vh", width: "100%",
    background: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfH_0fQuREthQDAtyxML6H6hAoGeEX356sw8fCvpW6gFkKecgM8Phvjm_UV0A65tx7hqU&usqp=CAU')no-repeat ", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
      <div className="card" style={{ height: "60%",width: "50%",margin: '%',  position: 'relative',background: 'transparent',border: '2px solid rgba(255, 255, 255, .5)',marginBottom:"7%",borderRadius: '20px',backdropFilter: 'blur(20px)',boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',justifyContent: 'center',alignItems: 'center',overflow: 'hidden',transition: 'transform .5s ease, height .2s ease',marginTop: '1%',paddingLeft: "40px", paddingRight: "40px", paddingTop: "20px", height: "fit-content", width: "30%", placeItems: "center", marginTop: "3%" }}>
        <h1 style={{ margin: 'auto', marginBottom: '7px', padding:"4%", fontSize: "25px" }}>Registration</h1>
         <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              style={{fontSize: "16px"}}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              style={{fontSize: "16px"}}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="Email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              style={{fontSize: "16px"}}
            />
          </div>
          <div className="col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{fontSize: "16px"}}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{fontSize: "16px"}}
            />
          </div>
          <div className="col">
            <select className="form-select" value={stateName} onChange={(e) => setStateName(e.target.value)} style={{fontSize: "16px"}}>
              {sName.map((item) => (
                <option value={item} key={item}>
                  {' '}
                  {item}{' '}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" placeholder="Mobile No" style={{fontSize: "16px"}} />
          </div>
          <div className="col">
            <select className="form-select" value={branch} onChange={(e) => setBranch(e.target.value)} style={{fontSize: "16px"}}>
              {bName.map((item) => (
                <option value={item} key={item}>
                  {' '}
                  {item}{' '}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br /><br></br>
        <div>
          <h5 style={{color: "#36454F"}}>Upload a Valid Proof (Aadhar/ Pan/ Driving License ) </h5>
        </div>
        <div className="input-group mb-3">
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          <label className="input-group-text" htmlFor="inputGroupFile02" style={{fontSize: "16px"}}>
            Upload
          </label>
        </div>
        <button className="btn btn mb-4 mt-2" style={{backgroundColor: "#c37f1a", fontSize: "16px"}} onClick={() => PostData()}>
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUp;
