import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const AppScreenWrapper = ({ children, barStyle = 'dark-content', sx }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, sx]}>{children}</ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
});
export default AppScreenWrapper;
