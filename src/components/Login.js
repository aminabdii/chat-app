import React from 'react';

//backData
import firebase from 'firebase/app';
import  {auth}  from '../firebase';

//icons
import Google from '../assets/google.svg'
//styles
import styles from '../components/Login.module.css'



const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2>Welcome to messenger!</h2>
                <div
                    className={styles.button}
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <img src={Google} alt="google" /> Sign in with Google
                </div>
            </div>
        </div>
    );
};

export default Login;