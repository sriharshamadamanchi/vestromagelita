import { action } from "../../common/store/typeSafe";

export const loginAction = (payload: any): any => action("src/authentication/redux/actions/loginAction", payload);

export const loggedInSuccessfullyAction = (): any => action("src/authentication/redux/actions/loggedInSuccessfullyAction");

export const logoutAction = (payload: any): any => action("src/authentication/redux/actions/logoutAction", payload);

export const registerAction = (payload: any ): any => action("src/authentication/redux/actions/registerAction", payload);
