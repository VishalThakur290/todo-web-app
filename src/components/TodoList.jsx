import React, { useState, useEffect } from 'react'
import '../App.css'
import { MdOutlineDelete } from 'react-icons/md'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../store/slices/todoSlice'
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import swal from 'sweetalert';

const TodoList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const state = useSelector((store) => store.todo);
    const api = "https://todo-web-app-production.up.railway.app";
    const delete_todo_api = api + "/todos/delete/";
    const get_todo_api = api + '/todos/';
    const deleteSingleTodo = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure, you want to delete this todo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const delete_todo_api_with_id = delete_todo_api + id;
                    axios.delete(delete_todo_api_with_id).then((res) => {
                        if (res.status === 200) {
                            getTodo();
                            alert_message("Success!", res.data.message, "success");
                        }
                        else if (res.status === 500) {
                            alert_message("Error!", res.data.message, "error");
                        }
                    })
                }
            });
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
    useEffect(() => {
        getTodo();
        const user = sessionStorage.getItem("user_id");
        if (user === null) {
            navigate("/login", { replace: true });
        }
        else {
            setVisible(true);
        }
    }, []);
    const alert_message = (title, text, icon) => swal({
        title: title,
        text: text,
        button: "Close",
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
        visible ? (
            <div className='todo-container'>
                {state.length !== 0 ? (
                    <Accordion>
                        {state.map((data, index) => {
                            // const theObj = { __html: data.description };
                            return (
                                <AccordionItem key={index}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            {data.title}
                                            <button onClick={() => deleteSingleTodo(data._id)}><MdOutlineDelete /></button>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        {/* <div dangerouslySetInnerHTML={theObj} /> */}
                                        <ReactQuill
                                            value={data.description}
                                            readOnly={true}
                                            theme={"bubble"}
                                        />
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                ) : (
                    <h4 className='read-the-docs' style={{ marginTop: '50px' }}>No todo found!</h4>
                )}
            </div>
        ) : false
    )
}

export default TodoList