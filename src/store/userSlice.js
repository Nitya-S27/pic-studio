import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    addUID(state, action) {
      state.user = action.payload;
    },
    removeUID(state) {
      localStorage.removeItem("userID");
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

const store = configureStore({ reducer: userSlice.reducer });
export default store;
