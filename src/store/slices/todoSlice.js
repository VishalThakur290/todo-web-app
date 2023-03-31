import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        addTodo(state, action) {
            return state = action.payload;
        },
    }
});

export default todoSlice.reducer;
export const { addTodo } = todoSlice.actions;