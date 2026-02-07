import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { navigationRef } from "./src/common/navigation/navigationService";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/common/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { ErrorBoundary } from "./src/common/ErrorBoundary/ErrorBoundary";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./src";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "./src/common/theme/material-theme.json";
import { theme } from "./src/common/theme";

const getActiveRouteName = (state: any): any => {
  const route = state?.routes[state?.index];

  if (route?.state) {
    return getActiveRouteName(route.state);
  }

  return route?.name;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.schemes.light.background }
});

export const App = () => {
  const routeNameRef = React.useRef(null);

  React.useEffect(() => {
    const state = navigationRef?.current?.getRootState();

    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <Provider store = {store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <RootSiblingParent>
          <PaperProvider theme = {theme}>
            <ErrorBoundary>
              <GestureHandlerRootView style = {styles.container}>
                <View style = {styles.container}>
                  <NavigationContainer
                    ref = {navigationRef}
                    onStateChange = {(state: any) => {
                      const previousRouteName = routeNameRef.current;
                      const currentRouteName = getActiveRouteName(state);
                      if (previousRouteName !== currentRouteName) {
                        console.log("Analytics : ", currentRouteName);
                        routeNameRef.current = currentRouteName;
                      }
                    }}>
                    <Home />
                  </NavigationContainer>
                </View>
              </GestureHandlerRootView>
            </ErrorBoundary>
          </PaperProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};
