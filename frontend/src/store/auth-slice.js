import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isLoggedIn: false,
    },
    reducers: {
        login(state, actions) {
            state.token = actions.payload;
            state.isLoggedIn = !!state.token
        },
        logout(state) {
            state.token = null
            state.isLoggedIn = !!state.token
        },
        changeToken(state, actions) {
            state.token = actions.payload
        }
    }
})

export const authSliceAction = authSlice.actions

export default authSlice