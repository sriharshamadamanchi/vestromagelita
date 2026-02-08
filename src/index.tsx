import React from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./common/theme";
import { moderateScale } from "react-native-size-matters";
import { Label } from "./common/components";
import { HomeTab } from "./Home/Home";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { storeType } from "./common/store/types";
import LoginOrRegister from "./Authentication/LoginOrRegister/LoginOrRegister";
import Login from "./Authentication/Login/Login";
import { RootStackParamList } from "./common/navigation/types";
import ForgotPassword from "./Authentication/ForgotPassword/ForgotPassword";
import { Register } from "./Authentication/Register/Register";
import { ProductByCategory } from "./Home/ProductByCategory";

const Stack = createStackNavigator<RootStackParamList>();

export const Home = () => {

  const appState = React.useRef(AppState.currentState);

  const isLoggedIn = useSelector((state: storeType) => {
    return state.login.loggedIn;
  });

  const mtheme = useTheme()

  React.useEffect(() => {
    if (isLoggedIn) {
      const _handleAppStateChange = (nextAppState: AppStateStatus) => {
        console.log("nextAppState | ", nextAppState)
        appState.current = nextAppState;
      };

      const listener = AppState.addEventListener("change", _handleAppStateChange);

      return () => listener.remove();
    }

  }, [isLoggedIn]);

  let initialRouteName: keyof RootStackParamList = "LoginOrRegister";

  if (isLoggedIn) {
    initialRouteName = "HomeTab"
  }

  return (
    <Stack.Navigator key = {initialRouteName} initialRouteName = {initialRouteName}
      screenOptions = {{
        headerTitleAlign: "center",
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: mtheme.colors.background,
          height: Platform.OS === "android" ? moderateScale(100) : 0
        },
        headerTitleStyle: {
          fontSize: theme.font.fontSizes.xl20,
          color: mtheme.colors.tertiary,
          fontFamily: theme.font.fontFamily.bold,
          marginHorizontal: moderateScale(20)
        },
        headerTitle: ({ children }: { readonly children: string }) => {
          return (
            <Label primary bold xl20 title = {children} ellipsizeMode = {"tail"} numberOfLines = {1} style = {{ marginHorizontal: moderateScale(25) }} />
          );
        }
      }}
    >
      {
        isLoggedIn ?
          <>
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "Categories"
                };
              }}
              name = "HomeTab" component = {HomeTab} />
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "Products"
                };
              }}
              name = "ProductByCategory" component = {ProductByCategory} />
          </>
          :
          <>
            <Stack.Screen options = {(): any => {
              return {
                headerShown: false
              };
            }}
            name = "LoginOrRegister" component = {LoginOrRegister}
            />

            <Stack.Screen
              options = {(): any => {
                return {
                  headerShown: false
                };
              }}
              name = "Login"
              component = {Login}
            />
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "Register"
                };
              }}
              name = "Register"
              component = {Register}
            />
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "Forgot Password"
                };
              }}
              name = "ForgotPassword"
              component = {ForgotPassword}
            />
          </>
      }
    </Stack.Navigator>
  )
}
