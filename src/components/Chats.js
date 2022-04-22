import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import {  ChatEngine } from 'react-chat-engine';
import axios from 'axios';
//styles
import styles from './Chats.module.css'
//components
import Navbar from './Navbar';
//context
import { AuthContext } from '../contexts/AuthContextProvider';

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();


    useEffect(() => {
        if (!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "23c1422d-15c9-40d0-82d9-019e53e237be",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email)
                formdata.append("username", user.email)
                formdata.append("secret", user.uid)
                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append("avatar", avatar, avatar.name)
                        axios.post("https://api.chatengine.io/users/", formdata, {
                            headers: {
                                "private-key": "1af164e7-b12e-4fdd-91cf-baa8dff008ae"
                            }
                        })
                            .then(() => setLoading(false))
                            .catch(error => console.log(error))
                    })
            })

    }, [user, history])


    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })
    }



    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/");
    }

    if (!user || loading) return "Loading...";

    return (
        <div className={styles.container}>

            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                width="calc(100vh - 50px)"
                projectID="23c1422d-15c9-40d0-82d9-019e53e237be"
                userName={user.email}
                userSecret={user.uid}

            />
        </div>
    );
};

export default Chats;