import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/authService";
import { IUser } from "@/shared/types/user.interface";
import { IAuthResponse } from "@/shared/types/auth.interface";

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = {
  user: null,
};

interface IAuthAction {
  type: string,
  payload: IAuthResponse
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state: InitialState, action: IAuthAction) => {
        state.user = action.payload.user;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state: InitialState, action: IAuthAction) => {
        state.user = action.payload.user;
      })
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state: InitialState, action: IAuthAction) => {
        state.user = action.payload.user;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;