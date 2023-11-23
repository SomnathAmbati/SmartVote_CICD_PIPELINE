import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup2';
import CreatePost from './components/screens/CreatePost';
import Chart from './components/screens/Chart';
import PostTable from './components/screens/PostTable';
import Start from './components/screens/Start';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          if (isMounted) {
            dispatch({ type: 'USER', payload: user });
          }
        } else {
          if (isMounted) {
            history.push('/Start');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel any ongoing tasks or subscriptions
      isMounted = false;
    };

  }, [dispatch, history]);

  return (
    <Switch>
      <Route exact path="/start">
        <Start />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/result">
        <CreatePost />
      </Route>
      <Route path="/Chart">
        <Chart />
      </Route>
      <Route path="/PostTable">
        <PostTable />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
