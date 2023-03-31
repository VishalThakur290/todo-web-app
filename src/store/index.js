import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./slices/loaderSlice";
import todoSlice from "./slices/todoSlice";

const store = configureStore({
    reducer: {
        todo: todoSlice,
        loader: loaderSlice
    }
})

export default store;