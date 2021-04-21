import React, { useContext, useState } from 'react';
import firebaseConfig from '../../firebase.config';
import "firebase/auth";
import firebase from 'firebase/app';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const history = useHistory();
    const location = useLocation();
    const [error, setError] = useState('');

    let {from} = location.state || {from: {pathname: '/'}};

    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(facebookProvider)
        .then((result) => {
            var user = result.user;
            console.log(user);
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            const loggedInUser = {name: user.displayName, email: user.email, img: user.photoURL};
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoggedInUser(loggedInUser);
            history.replace(from);
        }).catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
  
    }

    window.onbeforeunload = function (e) {
        localStorage.clear();
    };

    return (
        <div className="container">
            <div className="row text-center">
                <div className="w-50 mx-auto">
                    <p>{error}</p>
                    <button onClick={handleGoogleSignIn} className='btn btn-primary mt-5 mb-2'>Continue With Google</button>
                    <br/>
                    <button onClick={handleFacebookSignIn} className='btn btn-success mb-5'>Continue With Facebook</button>
                </div>
                <div className="col-md-8 mx-auto">
                    <h2>Login</h2>
                    <form action="">
                        <input type="email" className="form-control" name="email" id="email" placeholder="email"/>
                        <br/><br/>
                        <input type="password" className="form-control" name="pass" id="pass" placeholder="password"/>
                        <br/>
                        <input type="submit" className="btn btn-primary" value="Login"/>
                    </form>
                    <br/>
                    <p className="text-center">Don't Have an account <Link to='/register'><span>Create Account</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;