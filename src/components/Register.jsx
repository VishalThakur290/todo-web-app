import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Register = () => {
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
    const register_api = api + "/users/add";
    const [registerState, setRegisterState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleInput = (e) => {
        setRegisterState({ ...registerState, [e.target.name]: e.target.value })
    }
    const handleLoginInput = (e) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value })
    }
    const register = () => {
        const name = registerState.name;
        const email = registerState.email;
        const password = registerState.password;
        if (name && email && password !== "") {
            axios.post(register_api, {
                name: name,
                email: email,
                password: password
            }).then(res => {
                console.log(res);
                if (res.status === 201) {
                    setRegisterState({
                        name: '',
                        email: '',
                        password: ''
                    })
                    alert_message("Success!", `Hi ${registerState.name}, you're sucessfully registered. Please go ahead and login to your account!`, "success");
                    navigate("/login");
                }
            })
        }
        else {
            alert_message("Info!", 'Kindly fill all the details to proceed further.', "info");
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
                    <h2>Register yourself!</h2>
                    <input type="text" placeholder='Enter name' value={registerState.name} onChange={(e) => handleInput(e)} name="name" id="name" />
                    <input type="email" placeholder='Enter email' value={registerState.email} onChange={(e) => handleInput(e)} name="email" id="email" />
                    <input type="password" placeholder='Enter password' value={registerState.password} onChange={(e) => handleInput(e)} name="password" id="password" />
                    <button onClick={register}>Register</button>
                    <a>Already have an account? <NavLink to='/login'>Login here</NavLink></a>
                </div>
            ) : false}
        </div>
    )
}

export default Register