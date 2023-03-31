import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Breadcrumb = () => {
    const location = useLocation();
    const current_page = location.pathname;
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.clear();
        navigate("/login");
    }
    const user = sessionStorage.getItem("user_id");
    return (
        <div className='breadcrumb'>
            <h3>Todo - Your personal Todos</h3>
            {current_page === "/view-todo" && user !== null ? <NavLink to="/"><button>Add Todo</button></NavLink> : false}
            {current_page === "/" && user !== null ? <NavLink to="/view-todo"><button>View Todos</button></NavLink> : false}
            {sessionStorage.getItem("user_id") !== null ? (<button onClick={logout}>Log Out</button>) : false}
        </div>
    )
}

export default Breadcrumb