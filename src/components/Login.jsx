import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const user = sessionStorage.getItem("user_id");
        if (user !== null) {
            navigate("/");
        }
        else {
            setVisible(true);
        }
    }, []);
    const api = "https://todo-web-app-production.up.railway.app";
    const login_api = api + "/users/login";
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    })
    const handleLoginInput = (e) => {
        if (e.target.name === "email") {
            const email = e.target.value;
            const email_without_space = email.replaceAll(" ", "");
            const lowercase_email = email_without_space.toLocaleLowerCase();
            setLoginState({ ...loginState, email: lowercase_email })
        }
        else {
            setLoginState({ ...loginState, [e.target.name]: e.target.value })
        }        
    }

    const loginUser = () => {
        const email = loginState.email;
        const password = loginState.password;
        if (email && password !== "") {
            axios.post(login_api, {
                email: email,
                password: password
            }).then(res => {
                if (res.status === 404 || res.status === 200 && res.data.length === 0) {
                    alert_message("Info!", 'You are not registered, please register yourself.', "info");
                }
                else if (res.status === 200) {
                    sessionStorage.setItem('user_id', res.data[0]._id);
                    sessionStorage.setItem('user_email', res.data[0].email);
                    sessionStorage.setItem('user_name', res.data[0].name);
                    setLoginState({
                        email: '',
                        password: ''
                    })
                    navigate("/");
                }
            }).catch(error => {
                if (error.response.status === 404) {
                    alert_message("Info!", 'You are not registered, please register yourself.', "info");
                }
            });
        }
        else {
            alert_message("Info!", 'Kindly fill all the details  to proceed further.', "info");
        }
    }
    const alert_message = (title, text, icon) => swal({
        title: title,
        text: text,
        icon: icon,
        timer: 3000,
        button: {
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            }
        }
    });
    return (
        <div className="container">
            {visible ? (
                <div className="card">
                    <h2>Login to your account!</h2>
                    <input type="text" placeholder='Enter email or username' value={loginState.email} onChange={(e) => handleLoginInput(e)} name="email" id="email" />
                    <input type="password" placeholder='Enter password' value={loginState.password} onChange={(e) => handleLoginInput(e)} name="password" id="password" />
                    <button onClick={loginUser}>Login</button>
                    <a>Don't have an account? <NavLink to='/register'>Register here</NavLink></a>
                </div>
            ) : false}
        </div>
    )
}

export default Login