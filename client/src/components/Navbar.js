// NavBar.js
import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push('/signin');
  };

  return (
    <nav className='navbar navbar-dark' style={{ display: "grid", gridTemplateRows: "1fr", backgroundColor: "#36454F" }}>
      <div className="nav-wrapper" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>

        <div>
          <Link to={state ? "/" : "/signin"} className="brand-logo center"
            style={{ color: "white", marginLeft: "6px", fontSize: "30px", textDecoration: "none", fontFamily: "Railway" }}>
            Online Voting System
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginLeft: "350px" }}>
          {state && state.isAdmin && (
            <>
              <li style={{ fontSize: "24px", fontWeight: "600", color: "white", listStyleType: "none", marginRight: "22px" }}>
                <Link to="/result" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "600", fontFamily: "Railway" }}>
                  <i className="fas fa-poll"></i> {" "} Result
                </Link>
              </li>
              <li style={{ fontSize: "24px", fontWeight: "600", color: "white", listStyleType: "none", marginRight: "22px" }}>
                <Link to="/Chart" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "600", fontFamily: "Railway" }}>
                  <i className="fas fa-chart-pie"></i> {" "} Chart
                </Link>
              </li>
              <li style={{ fontSize: "24px", fontWeight: "600", color: "white", listStyleType: "none", marginRight: "22px" }}>
                <Link to="/PostTable" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "600", fontFamily: "Railway" }}>
                  <i className="fas fa-wrench"></i> {" "} Update_Posts
                </Link>
              </li>
            </>
          )}

          {state ? (
            <li style={{ fontSize: "20px", fontWeight: "600", color: "white", listStyleType: "none", cursor: "pointer", fontFamily: "Railway", marginRight: "22px" }}
              onClick={handleLogout}>
              <i className="far fa-sign-out "></i> {" "} Logout
            </li>
          ) : (
            <>
              {(location.pathname === '/signin' || location.pathname === '/signup') && (
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  <Link to="/Start" style={{ fontSize: "23px", fontWeight: "600", color: 'white', marginRight: "22px", fontFamily: "Railway" }}>Home</Link>
                  <Link to="/signin" style={{ fontSize: "23px", fontWeight: "600", color: 'white', marginRight: "22px", fontFamily: "Railway" }}>Signin</Link>
                  <Link to="/signup" style={{ fontSize: "23px", fontWeight: "600", color: 'white', fontFamily: "Railway", marginRight: "22px" }}>Signup</Link>
                </div>
              )}

              {/* Add the buttons for the Start page */}
              {location.pathname === '/Start' && (
                <div style={{ display: "grid",position: "relative", marginLeft: "-25%" }}>
                  <Link to="/signin" style={{ fontSize: "23px", fontWeight: "600", color: 'white', fontFamily: "Railway"}}>Login/Register</Link>

                </div>
              )}

            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
