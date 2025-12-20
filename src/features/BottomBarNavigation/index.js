import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen';
import { Home, Search, User, MessageSquare, Calendar } from 'react-native-feather';
import HomeDashBoard from '../HomeDashBoard';
import CalendarScreen from '../HomeDashBoard/CalendarScreen';
import ChatScreen from '../HomeDashBoard/ChatScreen';
import ProfileScreen from '../HomeDashBoard/ProfileScreen';
import SearchScreen from '../HomeDashBoard/SearchScreen';
import BookingsScreen from '../HomeDashBoard/BookingsScreen';
const Tab = createBottomTabNavigator();

const BottomBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeDashBoard}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Home
              width={24}
              height={24}
              strokeWidth={focused ? 1 : 2}
              stroke={'white'}
              fill={focused ? '#0E7490' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Search
              width={24}
              height={24}
              strokeWidth={focused ? 1 : 2}
              fill={focused ? '#0E7490' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Calendar
              width={24}
              height={24}
              strokeWidth={focused ? 1 : 2}
              fill={focused ? '#0E7490' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MessageSquare
              strokeWidth={focused ? 1 : 2}
              width={24}
              height={24}
              fill={focused ? '#0E7490' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <User
              width={24}
              height={24}
              strokeWidth={focused ? 1 : 2}
              fill={focused ? '#0E7490' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: getFontFamily(true, 'semibold'),
    fontWeight: 600,
    fontSize: 36,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  primaryButton: {
    backgroundColor: '#0E7490',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
  },
  primaryButtonText: {
    fontFamily: getFontFamily(true, 'semibold'),
    fontWeight: 600,
    fontSize: 16,
    color: 'white',
  },
  outlineButton: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#0E7490',
  },
  outlineButtonText: {
    fontFamily: getFontFamily(true, 'semibold'),
    fontWeight: 600,
    fontSize: 16,
    color: '#0E7490',
  },
});
