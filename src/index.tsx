import React from "react";
import { AppState, AppStateStatus, Platform, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./common/theme";
import { moderateScale } from "react-native-size-matters";
import { Label } from "./common/components";
import { Categories } from "./Home/Categories";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { storeType } from "./common/store/types";
import LoginOrRegister from "./Authentication/LoginOrRegister/LoginOrRegister";
import Login from "./Authentication/Login/Login";
import { RootStackParamList } from "./common/navigation/types";
import ForgotPassword from "./Authentication/ForgotPassword/ForgotPassword";
import { Register } from "./Authentication/Register/Register";
import { ProductByCategory } from "./Home/ProductByCategory";
import { ProductDetails } from "./Home/ProductDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./Profile/Profile";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Products } from "./Home/Products";

const styles = StyleSheet.create({
  tabsStyle: { flex: 1, backgroundColor: theme.colors.onPrimary }
});

const Tab = createBottomTabNavigator();

export const HomeTabbar = () => {

  return (
    <View style = {styles.tabsStyle}>
      <Tab.Navigator
        backBehavior = {"initialRoute"}
        screenOptions = {{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS === "android",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarStyle: {
            height: Platform.OS === "android" ? moderateScale(65) : moderateScale(90),
            paddingTop: moderateScale(5)
          },
          tabBarLabel: ({ color, children }) => {
            return (
              <Label s bold title = {children} style = {{ color, paddingBottom: moderateScale(10) }} />
            )
          }
        }}>
        <Tab.Screen
          options = {{
            tabBarIcon: ({ focused }) => <MaterialIcons name = "list" color = {focused ? theme.colors.primary : theme.colors.secondary} size = {moderateScale(30)} />
          }}
          name = {"Products"}
          component = {Products} />
        <Tab.Screen
          options = {{
            tabBarIcon: ({ focused }) => <MaterialIcons name = "category" color = {focused ? theme.colors.primary : theme.colors.secondary} size = {moderateScale(30)} />
          }}
          name = {"Categories"}
          component = {Categories} />
        <Tab.Screen
          options = {{
            tabBarIcon: ({ focused }) => <Icon name = "profile" color = {focused ? theme.colors.primary : theme.colors.secondary} size = {moderateScale(30)} />
          }}
          name = {"Profile"}
          component = {Profile} />
      </Tab.Navigator>
    </View>
  );
}

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
    initialRouteName = "HomeTabbar"
  }

  return (
    <Stack.Navigator key = {initialRouteName} initialRouteName = {initialRouteName}
      screenOptions = {{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: mtheme.colors.background
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
                  headerShown: false
                };
              }}
              name = "HomeTabbar" component = {HomeTabbar} />
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "Products"
                };
              }}
              name = "ProductByCategory" component = {ProductByCategory} />
            <Stack.Screen
              options = {(): any => {
                return {
                  title: "ProductDetails"
                };
              }}
              name = "ProductDetails" component = {ProductDetails} />
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
