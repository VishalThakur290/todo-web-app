import {Routes ,Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTodo from "./components/Todo";
import TodoList from "./components/TodoList";
const Routings = () => {
  return (
    <Routes>
        <Route exact path="/" element={ <AddTodo /> } /> 
        <Route exact path="/login" element={ <Login /> } /> 
        <Route exact path="/register" element={ <Register /> } /> 
        <Route exact path="/view-todo" element={<TodoList />} />
        <Route path="*" element= {<AddTodo />} />
    </Routes>
  )
}

export default Routings