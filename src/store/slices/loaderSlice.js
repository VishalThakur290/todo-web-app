import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loader",
    initialState: true,
    reducers: {
        acticateLoader(state, action) {
            return state = action.payload;
        },
        deacticateLoader(state, action) {
            return state = action.payload;
        }
    }
})

export default loaderSlice.reducer;
export const { acticateLoader, deacticateLoader } = loaderSlice.actions;