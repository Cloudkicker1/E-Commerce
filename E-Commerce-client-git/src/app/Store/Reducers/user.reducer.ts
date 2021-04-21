import { createReducer, on } from '@ngrx/store';
import { loginFail, loginRequest, loginSuccess, logoutSuccess, firstStepRegistrationRequest, firstStepRegistrationSuccess, firstStepRegistrationFail, addToCartRequest, addToCartSuccess, addToCartFail, getUserInfoSuccess, getUserInfoRequest, getUserInfoFail, secondStepRegistrationRequest, secondStepRegistrationSuccess, secondStepRegistrationFail, placeOrderRequest, placeOrderSuccess, placeOrderFail } from '../Actions/user.actions';
import { FirstStepUser, User } from 'src/app/models/userModels/user.model';


export interface IUserState {
    name: string | null
    isLoggedin: boolean;
    currentUser: User | null;
    firstStepRegistrationInfo: FirstStepUser;
    token: string | null;
    role: string | null;
    viewMsg: string | null;
    errorMsg: any | null;
}

export const initialState: IUserState = {
    name: null,
    isLoggedin: !!localStorage.getItem('token'),
    currentUser: null,
    firstStepRegistrationInfo: null,
    token: null,
    role: null,
    viewMsg: null,
    errorMsg: null,
};

const _userReducer = createReducer(
    initialState,

    // LOGIN

    on(loginRequest, (state) => state),
    on(loginSuccess, (state, { token, currentUser }) => ({
        ...state,
        name: currentUser.name,
        isLoggedin: true,
        currentUser: currentUser,
        token: token,
        role: currentUser.role
    })),
    on(loginFail, (state, { error }) => ({
        ...state,
        viewMsg: 'User does not exist',
        errorMsg: error
    })),

    // LOGOUT

    on(logoutSuccess, (state) => ({
        ...state,
        name: null,
        isLoggedin: false,
    })),

    // USER INFO

    on(getUserInfoRequest, (state) => state),
    on(getUserInfoSuccess, (state, { userInfo }) => ({
        ...state,
        name: userInfo.name,
        currentUser: userInfo,
        role: userInfo.role,
    })),
    on(getUserInfoFail, (state, { error }) => ({
        ...state,
        viewMsg: 'Something went wrong',
        errorMsg: error
    })),

    // REGISTER

    on(firstStepRegistrationRequest, (state) => state),
    on(firstStepRegistrationSuccess, (state, { messege, firstStepRegistrationInfo }) => ({
        ...state,
        viewMsg: messege,
        firstStepRegistrationInfo: firstStepRegistrationInfo,
    })),
    on(firstStepRegistrationFail, (state, { error }) => ({
        ...state,
        viewMsg: 'Something went wrong',
        errorMsg: error
    })),

    on(secondStepRegistrationRequest, (state) => state),
    on(secondStepRegistrationSuccess, (state, { messege, token, newUser }) => ({
        ...state,
        viewMsg: messege,
        token: token,
        currentUser: newUser,
        isLoggedin: true,
    })),
    on(secondStepRegistrationFail, (state, { error }) => ({
        ...state,
        viewMsg: 'Something went wrong',
        errorMsg: error
    })),

    on(placeOrderRequest, (state) => state),
    on(placeOrderSuccess, (state, { msg }) => ({
        ...state,
        viewMsg: msg,
    })),
    on(placeOrderFail, (state, { error }) => ({
        ...state,
        viewMsg: 'Something went wrong',
        errorMsg: error
    })),

);

export function userReducer(state, action) {
    return _userReducer(state, action);
}