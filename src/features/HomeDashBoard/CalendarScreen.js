import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const CalendarScreen = () => {
  const navigation = useNavigation();
  return (
    <AppScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to CalendarScreen!</Text>
      </View>
    </AppScreenWrapper>
  );
};

export default CalendarScreen;

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
});
