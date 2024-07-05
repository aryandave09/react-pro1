import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    username: "",
    email: "",
    accessToken: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    clearFormData: (state) => {
      state.username = "";
      state.email = "";
      state.accessToken = null;
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
