import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Chart from './Chart';
import Profile from './Profile';

const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/allpost', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const votePlayer = (id, userId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once selected, you will not be able to reselect the options!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch('http://localhost:5000/vote', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          },
          body: JSON.stringify({
            postId: id,
            userId,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const newData = data.map((item) => {
              if (item._id === result._id) {
                return result;
              } else {
                return item;
              }
            });
            setData(newData);
          })
          .catch((err) => {
            console.log(err);
          });
        swal('You successfully have given your vote!', {
          icon: 'success',
        });
      } else {
        swal('Again, select your option!');
      }
    });
  };

  let isVote;
  if (JSON.parse(localStorage.getItem('user')) !== null) {
    isVote = JSON.parse(localStorage.getItem('user'))._id;
  }

  const userId = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))._id
    : null;

  const userIdExist = data.map((item) => item.votes.filter((item) => item));
  let newVlaue = false;
  for (let key of userIdExist) {
    if (key.length > 0) {
      for (let key2 of key) {
        if (key2 === isVote) {
          newVlaue = true;
        }
      }
    }
  }

  return (
    <div>
      <div style={{marginTop: "20px", marginLeft: "400px", boxShadow: "1px 4px 10px rgb(1 0 0 / 0.2)", borderRadius: "7px", width: "fit-Content", padding: "3px", paddingLeft:"1%", paddingRight: "1%", backgroundColor: "rgb(244, 245, 246)"}}><h3> Cast your Vote for the below political parties </h3> </div>
      <div className="col-md-8" style={{ margin: 'auto', paddingTop: '2%' }}>
        <div className="col-md-3" style={{ float: 'left', border: '1px solid green' }}>
          <Profile />
        </div>
        <div className="col-md-8" style={{ float: 'right', backgroundColor: 'white', padding: '10px', borderRadius: "10px" }}>
          {data.map((item, index) => {
            return (
              <div
                key={item._id}
                style={{
                  marginBottom: '10px',
                  backgroundColor: '#f2f4f6',
                  height: '100px',
                  borderRadius: '15px',
                  padding: '25px',
                  fontSize: "18px"
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <h6>
                    <b>{index + 1}</b>
                  </h6>
                  <h6>
                    <b>{item.title.split(' ')[0]}</b>
                  </h6>
                  <img src={item.photo} alt="Description" style={{ height: '80px', width: '70px'}} />
                  <div className="card-content">
                    {!item.votes.includes(state._id) && newVlaue === false ? (
                      <button className="btn btn-success" onClick={() => votePlayer(item._id, userId)}>
                        Vote
                      </button>
                    ) : (
                      ''
                    )}
                    {newVlaue ? (
                      <button className="btn disabled" style={{ marginLeft: '47px', background: 'red' }}>
                        Already Voted
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;