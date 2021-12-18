/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";
import { Button } from "react-native-paper";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import UserScreen from "../screens/UserScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import DietScreen from "../screens/DietScreen";
import UserSavedDietsScreen from "../screens/UserSavedDietsScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import TrainingScreen from "../screens/TrainingScreen";
import UserSavedTrainingsScreen from "../screens/UserSavedTrainingsScreen";
import DietHelp from "../components/Sections/Help/DietHelp";
import DataHelp from "../components/Sections/Help/DataHelp";
import SavedDietsHelp from "../components/Sections/Help/SavedDietsHelp";
import TrainingHelp from "../components/Sections/Help/TrainingHelp";
import SavedTrainingsHelp from "../components/Sections/Help/SavedTrainingsHelp";
import ModalWithContent from "../components/common/ModalWithContent";
import Disclaimer from "../components/Sections/HomePage/Disclaimer";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const user = useSelector(selectUser);
  const loggedIn = user.id === "0" ? false : true;
  return (
    <BottomTab.Navigator
      initialRouteName="User"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: () => {
          var helpContent = <DataHelp />;
          switch (route.name) {
            case "Diet":
              helpContent = <DietHelp />;
              break;
            case "User":
              helpContent = <DataHelp />;
              break;
            case "UserSavedDiets":
              helpContent = <SavedDietsHelp />;
              break;
            case "Training":
              helpContent = <TrainingHelp />;
              break;
            case "UserSavedTrainings":
              helpContent = <SavedTrainingsHelp />;
              break;
          }
          return (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                position: "absolute",
                right: 0,
              }}
            >
              <View style={{ width: 40 }}>
                <ModalWithContent
                  title={
                    <FontAwesome name="info-circle" size={24} color="black" />
                  }
                  content={<Disclaimer />}
                />
              </View>
              <View style={{ width: 40 }}>
                <ModalWithContent
                  title={
                    <FontAwesome
                      name="question-circle"
                      size={24}
                      color="black"
                    />
                  }
                  content={helpContent}
                />
              </View>
            </View>
          );
        },
      })}
    >
      {loggedIn && (
        <BottomTab.Screen
          name="Diet"
          component={DietScreen}
          options={{
            title: "Diet",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcon name="food-apple" color={color} />
            ),
          }}
        />
      )}

      {loggedIn && (
        <BottomTab.Screen
          name="UserSavedDiets"
          component={UserSavedDietsScreen}
          options={{
            title: "Saved Diets",
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon name="calendar-o" color={color} />
            ),
          }}
        />
      )}

      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="user" color={color} />
          ),
        }}
      />

      {loggedIn && (
        <BottomTab.Screen
          name="Training"
          component={TrainingScreen}
          options={{
            title: "Training",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcon name="dumbbell" color={color} />
            ),
          }}
        />
      )}

      {loggedIn && (
        <BottomTab.Screen
          name="UserSavedTrainings"
          component={UserSavedTrainingsScreen}
          options={{
            title: "Saved trainings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcon name="format-line-weight" color={color} />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function FontAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
function MaterialCommunityIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}
