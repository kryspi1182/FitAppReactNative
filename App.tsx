//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "./components/Themed";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store/configureStore";
import { LogBox, RefreshControlBase } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
LogBox.ignoreAllLogs(true);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: colorScheme === "dark" ? "#fff" : "#000",
    },
    dark: colorScheme === "dark" ? true : false,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </PaperProvider>
    );
  }
}
