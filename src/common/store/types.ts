
export type loginReducerStateType = {
    loggedIn: boolean,
    fcmToken: string,
    deviceToken: string
}

export type loaderType = {
    loading: boolean,
    success?: {
        status: boolean,
        msg: string
    },
    failure?: {
        status: boolean,
        msg: string,
        id?: string
    },
    msg?: string
};

export type loaderReducerStateType = {
    loading: boolean,
    loaders: Record<string, loaderType>
};

export type storeType = {
    loader: loaderReducerStateType,
    login: loginReducerStateType,
}
