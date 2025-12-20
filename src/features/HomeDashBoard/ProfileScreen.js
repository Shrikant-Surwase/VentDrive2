import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen';
import { Home } from 'react-native-feather';

const Tab = createBottomTabNavigator();

const signOut = async (navigation) => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'false');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      }),
    );
    RNRestart.Restart();
  } catch (error) {
    console.log('Error signing out: ', error);
  }
};
const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <AppScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to ProfileScreen !</Text>
        <Pressable onPress={() => signOut(navigation)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>sign out</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile')} style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Sign in</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default ProfileScreen;

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
