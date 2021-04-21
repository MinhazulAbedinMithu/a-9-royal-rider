
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/blog'>
            <Blog/>
          </Route>
          <Route path='/contact'>
            <Contact/>
          </Route>
          <PrivateRoute path='/destination'>
            <Destination/>
          </PrivateRoute>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;