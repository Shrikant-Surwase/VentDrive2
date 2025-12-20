// import React from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { getFontFamily } from '../../utils/fontFamily';
// import AppScreenWrapper from '../../AppScreenWrapper';
// import { CommonActions, useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ProfileScreen from './ProfileScreen';
// import HomeScreen from '../HomeScreen';
// import { Home } from 'react-native-feather';

// const Tab = createBottomTabNavigator();

// const signOut = async (navigation) => {
//   try {
//     await AsyncStorage.setItem('isLoggedIn', 'false');

//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: 'Landing' }],
//       }),
//     );
//     RNRestart.Restart();
//   } catch (error) {
//     console.log('Error signing out: ', error);
//   }
// };
// const SearchScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <AppScreenWrapper>
//       <View style={styles.container}>
//         <Text style={styles.headerText}>Welcome to SearchScreen !</Text>
//         <Pressable onPress={() => signOut(navigation)} style={styles.primaryButton}>
//           <Text style={styles.primaryButtonText}>Create Account</Text>
//         </Pressable>
//         <Pressable onPress={() => navigation.navigate('Profile')} style={styles.outlineButton}>
//           <Text style={styles.outlineButtonText}>Sign in</Text>
//         </Pressable>
//       </View>
//     </AppScreenWrapper>
//   );
// };

// export default SearchScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontFamily: getFontFamily(true, 'semibold'),
//     fontWeight: 600,
//     fontSize: 36,
//     textAlign: 'center',
//     marginHorizontal: 50,
//   },
//   primaryButton: {
//     backgroundColor: '#0E7490',
//     padding: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 25,
//   },
//   primaryButtonText: {
//     fontFamily: getFontFamily(true, 'semibold'),
//     fontWeight: 600,
//     fontSize: 16,
//     color: 'white',
//   },
//   outlineButton: {
//     padding: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#0E7490',
//   },
//   outlineButtonText: {
//     fontFamily: getFontFamily(true, 'semibold'),
//     fontWeight: 600,
//     fontSize: 16,
//     color: '#0E7490',
//   },
// });
// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React from 'react';
// Import required components
import {StyleSheet, View} from 'react-native';
// Import Map and Marker
import MapView, {Marker} from 'react-native-maps';
import AppScreenWrapper from '../../AppScreenWrapper';
const SearchScreen = () => {
  return (
    <AppScreenWrapper>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
    </AppScreenWrapper>
  );
};
export default SearchScreen;
const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});