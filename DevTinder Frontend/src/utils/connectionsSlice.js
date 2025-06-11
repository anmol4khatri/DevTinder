import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        clearConnections: (state) => {
            return null;
        },
    }
});

export const { addConnections, clearConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;