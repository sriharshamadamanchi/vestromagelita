import { createAction } from "@reduxjs/toolkit";

export interface LoginActionType {
    email: string
    password: string
}

export const loginAction = createAction<LoginActionType>("src/authentication/redux/actions/loginAction");

export interface ForgotPasswordActionType {
    email: string
}

export const forgotPasswordAction = createAction<ForgotPasswordActionType>("src/authentication/redux/actions/forgotPasswordAction");

export const loggedInSuccessfullyAction = createAction("src/authentication/redux/actions/loggedInSuccessfullyAction");

export interface LogoutActionType {
    deleteAccount: boolean
}

export const logoutAction = createAction<LogoutActionType>("src/authentication/redux/actions/logoutAction");

export interface RegisterActionType {
    name: string
    email: string
    password: string
}

export const registerAction = createAction<RegisterActionType>("src/authentication/redux/actions/registerAction");

export interface StoreLoginDetailsActionType {
    name: string
    email: string
    id: string
}

export const storeLoginDetailsAction = createAction<StoreLoginDetailsActionType>("src/authentication/redux/actions/storeLoginDetailsAction");

export const clearLoginDetailsAction = createAction("src/authentication/redux/actions/clearLoginDetailsAction");
