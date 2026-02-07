import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    HomeTab: undefined;
    LoginOrRegister: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined
  };

export type LoginOrRegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginOrRegister"
>;
