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
    const handleSubmit = (event) => {
        if(newUser && user.email && user.password) {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            console.log(res);
            const loggedInUser = {...user};
            loggedInUser.error = '';
            loggedInUser.success = true;
            setLoggedInUser(loggedInUser);
            history.replace(from);
          })
          .catch((error) => {
            var errorMessage = error.message;
          });
        }

        const handleBlur = (event) => {
            let isFieldValid = true;
        
            if(event.target.name === 'email'){
              isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            }
            if(event.target.name === 'password'){
              isFieldValid =  /((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,})/.test(event.target.value);
              // /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,})/ ===>>> number, upperCase, lowerCase, specialCharacter, minimumLength-8
            }
            if(isFieldValid){
              const newUserInfo = {...user};
              loggedInUser[event.target.name] = event.target.value;
              setUser(loggedInUser);
            }
            
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
                    <form action=""  onSubmit={handleSubmit}>
                        <input type="email" onBlur={handleBlur} className="form-control" name="email" id="email" placeholder="email"/>
                        <br/><br/>
                        <input type="password" onBlur={handleBlur} className="form-control" name="pass" id="pass" placeholder="password"/>
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