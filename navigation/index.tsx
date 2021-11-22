/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import UserScreen from '../screens/UserScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import DietScreen from '../screens/DietScreen';
import UserSavedDietsScreen from '../screens/UserSavedDietsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TrainingScreen from '../screens/TrainingScreen';
import UserSavedTrainingsScreen from '../screens/UserSavedTrainingsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
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

  return (
    <BottomTab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      
      <BottomTab.Screen
        name="Diet"
        component={DietScreen}
        options={{
          title: 'Diet',
          tabBarIcon: ({ color }) => <MaterialCommunityIcon name="food-apple" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <FontAwesomeIcon name="user" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="UserSavedDiets"
        component={UserSavedDietsScreen}
        options={{
          title: 'Saved Diets',
          tabBarIcon: ({ color }) => <FontAwesomeIcon name="calendar-o" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          title: 'Training',
          tabBarIcon: ({ color }) => <MaterialCommunityIcon name="dumbbell" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="UserSavedTrainings"
        component={UserSavedTrainingsScreen}
        options={{
          title: 'Saved trainings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcon name="format-line-weight" color={color} />,
        }}
      />  
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function FontAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
function MaterialCommunityIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
