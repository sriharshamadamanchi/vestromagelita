import { createAction } from "@reduxjs/toolkit";

export const showLoaderAction = createAction("src/common/loaderRedux/showLoaderAction");
export const hideLoaderAction = createAction("src/common/loaderRedux/hideLoaderAction");

export type startLoadingActionType = {
    name: string,
    msg?: string
};
export const startLoadingAction = createAction<startLoadingActionType>("src/common/loaderRedux/startLoadingAction");

export type successLoadingActionType = {
    name: string,
    msg: string
};
export const successLoadingAction = createAction<successLoadingActionType>("src/common/loaderRedux/successLoadingAction");

export type failedLoadingActionType = {
    name: string,
    msg: string,
    id?: string
};

export const failedLoadingAction = createAction<failedLoadingActionType>("src/common/loaderRedux/failedLoadingAction");

export type removeLoaderActionType = {
    name: string
};

export const removeLoaderAction = createAction<removeLoaderActionType>("src/common/loaderRedux/removeLoaderAction");

export const resetAllLoadersAction = createAction("src/common/loaderRedux/resetAllLoadersAction");

export const resetReducersAction = createAction("src/common/loaderRedux/resetReducersAction");
