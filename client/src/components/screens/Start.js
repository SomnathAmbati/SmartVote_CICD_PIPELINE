import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Start.css';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL); // Should print http://localhost:5000


function Start() {
  const [candidates, setCandidates] = useState([]); // Define candidates state

  useEffect(() => {
    // Use AbortController to handle unmounting
    const controller = new AbortController();
    const signal = controller.signal;

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allpost`, { signal })
 // Attach signal to request
      .then((response) => {
        if (!signal.aborted) {
          setCandidates(response.data.posts);
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error fetching candidates:', error);
        }
      });

    // Cleanup function: Abort request when component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <section id="Home">
        <div className="Home container">
          <div></div>
          <div>
            <h1>Vote, <span> </span></h1>
            <h1>For Your Better <span> </span></h1>
            <h1>Future <span> </span></h1>
            <a href="#about" type="button" className="team">About Us</a>
          </div>
        </div>
      </section><br /><br />

      <section id="candidates" style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
        <div className="candidates-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="candidates-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 className="section-title" style={{ fontSize: '5em', color: '#333' }}>
              Can<span style={{ color: '#e44d26' }}>didates</span>
            </h1>
          </div>
          <div className="all-candidates" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {candidates.map((candidate, index) => (
              <div
                className={`project-item ${index % 2 === 0 ? 'even' : 'odd'}`}
                key={candidate._id}
                style={{
                  width: '20%',
                  marginBottom: '100px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                }}
              >
                <div className="project-info" style={{ padding: '20px' }}>
                  <h1 style={{ fontSize: '1.5em', color: '#333' }}>{candidate.title}</h1>
                </div>
                <div className="project-img">
                  <img
                    src={candidate.photo}
                    alt={candidate.title}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services">
        <div className="services container">
          <div className="service-top">
            <h1 className="section-title">Re<span>su</span>lts</h1>
          </div>
          <div className="service-item">
            <div className="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" alt="" /></div>
            <h2 style={{ textAlign: "center" }}>Results </h2>
            <p style={{ textAlign: "center" }}> Still Not Posted.....</p>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="about container">
          <div className="col-left">
            <div className="about-img">
              <img src="https://previews.123rf.com/images/kasya2k/kasya2k2202/kasya2k220200021/182264988-business-startup-flat-line-icon-launch-project-strategy-development-plan-outline-sign-for-mobile.jpg" alt="" />
            </div>
          </div>
          <div className="col-right">
            <h1 className="section-title">About <span>us</span></h1><br /><br /><br />
            <h2>
              Ambati Somnath - 21BCE9501 <br /><br />
              Devapatla Reddy Nithish Kumar - 21BCE9054  <br /><br />
              Sreeram JVP - 21BCE9498 <br /><br />
              Vadla Dileep - 21BCE9650 <br /><br />
              Chenchugari Jayadeep - 21BCE9238
            </h2>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact container">
          <h1 className="section-title">Contact <span>info</span></h1>
          <div className="contact-items">
            <div className="contact-item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/100/000000/phone.png" alt="phone icon" /></div>
              <div className="contact-info">
                <h1>Phone</h1>
                <h2>+91 962*****</h2>
                <h2>+91 869*****</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/100/000000/new-post.png" alt="email icon" /></div>
              <div className="contact-info">
                <h1>Email</h1>
                <h2>Team305@gmail.com</h2>
                <h2>service@gmail.com</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" alt="address icon" /></div>
              <div className="contact-info">
                <h1>Address</h1>
                <h2>India</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="footer container">
          <div className="brand">
            <h1><span>T</span>eam<span>-</span>305</h1>
          </div>
          <div className="social-icon">
            <div className="social-item">
              <a href="https://github.com/SomnathAmbati"><img src="https://img.icons8.com/bubbles/100/000000/github.png" alt="" /></a>
            </div>
            <div className="social-item">
              <a href="https://www.instagram.com/"><img src="https://img.icons8.com/bubbles/100/000000/instagram-new.png" alt="Instagram icon" /></a>
            </div>
            <div className="social-item">
              <a href="https://www.linkedin.com/in/somnath-ambati-179583218/"><img src="https://img.icons8.com/bubbles/100/000000/linkedin.png" alt="LinkedIn icon" /></a>
            </div>
          </div>
          <p>Copyright © Team305. All rights reserved</p>
        </div>
      </section>
    </>
  );
}

export default Start;
