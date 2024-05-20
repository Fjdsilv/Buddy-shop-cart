import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
        },
        closeModel: (state, action) => {
            state.isOpen = false;
        }
    }

});

export const { openModal, closeModel } = modalSlice.actions;

export default modalSlice.reducer
