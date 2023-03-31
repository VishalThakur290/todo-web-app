import React, { useEffect, useState } from 'react'
import '../App.css'
import TodoList from './TodoList'
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { addTodo } from '../store/slices/todoSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AddTodo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const user = sessionStorage.getItem("user_id");
        if (user === null) {
            navigate("/login", { replace: true });
        }
        else {
            setVisible(true);
        }
    }, []);
    const api = "https://todo-web-app-production.up.railway.app";
    const get_todo_api = api + '/todos/';
    const add_todo_api = api + '/todos/add';
    const [state, setState] = useState({
        title: '',
        description: ""
    })
    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const addNewTodo = () => {
        const title = state.title;
        const description = state.description;
        const user_id = sessionStorage.getItem("user_id");
        if (title && description !== "") {
            axios.post(add_todo_api, {
                title: title,
                description: description,
                user_id: user_id
            }).then(res => {
                if (res.status === 201) {
                    alert_message("Success!", res.data.message, "success");
                    setState({
                        title: '',
                        description: ''
                    })
                    getTodo();
                }
            })
        }
        else {
            alert_message("Error!", "Kindly fill the title and description to proceed further.", "error");
        }
    }
    const getTodo = () => {
        const user = sessionStorage.getItem("user_id");
        axios.post(get_todo_api, {
            user_id: user
        }).then(res => {
            if (res.status === 200) {
                const data = res.data;
                dispatch(addTodo(data));
            }
        })
    }
    const editorModule = {
        toolbar: [
            [{ font: [] }, { size: [] }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "super" }, { script: "sub" }],
            ["blockquote", "code-block"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
            ["clean"],
        ],
    };
    const handleChange = (content) => {
        setState({ ...state, description: content })
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
        <div className='container'>
            {visible ? (
                <div className="card">
                    <div className='todo-list-section'>
                        <input type="text" placeholder='Enter title' value={state.title} onChange={(e) => handleInput(e)} name="title" id="title" /><br />
                        <ReactQuill
                            theme="snow"
                            value={state.description}
                            onChange={handleChange}
                            modules={editorModule}
                        /><br />
                        <button onClick={addNewTodo}>Add</button>
                    </div>
                </div>
            ) : false}
        </div>
    )
}

export default AddTodo