import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Icon from 'react-native-feather';
import AppScreenWrapper from '../../AppScreenWrapper';

const { width, height } = Dimensions.get('window');

// Demo car data
const DEMO_CARS = [
  {
    id: 1,
    name: 'Toyota Fortuner',
    rate: 4.8,
    trips: 127,
    location: 'Westlands, Nairobi',
    price: 1000,
    latitude: -1.2634,
    longitude: 36.8047,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400',
    available: true,
  },
  {
    id: 2,
    name: 'Toyota RAV4',
    rate: 4.9,
    trips: 203,
    location: 'CBD, Nairobi',
    price: 1000,
    latitude: -1.2864,
    longitude: 36.8172,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400',
    available: true,
  },
  {
    id: 3,
    name: 'Nissan X-Trail',
    rate: 4.7,
    trips: 156,
    location: 'Karen, Nairobi',
    price: 1000,
    latitude: -1.3194,
    longitude: 36.7063,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
    available: true,
  },
  {
    id: 4,
    name: 'Honda CR-V',
    rate: 4.6,
    trips: 94,
    location: 'Kilimani, Nairobi',
    price: 1000,
    latitude: -1.2921,
    longitude: 36.7872,
    image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400',
    available: true,
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (carId) => {
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId],
    );
  };

  const centerRegion = {
    latitude: -1.2921,
    longitude: 36.8219,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  };

  return (
    <AppScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon.ArrowLeft width={24} height={24} stroke="#333" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Icon.MapPin width={20} height={20} stroke="#666" strokeWidth={2} />
          <Text style={styles.locationText}>Nairobi, Kenya</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <Icon.Bell width={24} height={24} stroke="#333" strokeWidth={2} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon.Search
          width={20}
          height={20}
          stroke="#999"
          strokeWidth={2}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Map Section */}
      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Find a car near you</Text>
        <View style={styles.mapContainer}>
          <MapView style={styles.mapStyle} initialRegion={centerRegion}>
            {DEMO_CARS.map((car) => (
              <Marker
                key={car.id}
                coordinate={{
                  latitude: car.latitude,
                  longitude: car.longitude,
                }}
                title={car.name}
                description={`Ksh ${car.price}/hr`}
              >
                <View style={styles.customMarker}>
                  <Icon.Navigation width={16} height={16} stroke="#fff" strokeWidth={2} />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
      </View>

      {/* Cars List Section */}
      <View style={styles.carsListHeader}>
        <Text style={styles.carsListTitle}>Cars near you</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carsScrollView}
        style={styles.carsScrollContainer}
      >
        {DEMO_CARS.map((car) => (
          <View key={car.id} style={styles.carCard}>
            {/* <View style={styles.carImageContainer}>
              <Image source={{ uri: car.image }} style={styles.carImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(car.id)}
              >
                <Icon.Heart
                  width={20}
                  height={20}
                  stroke={favorites.includes(car.id) ? '#FF385C' : '#fff'}
                  fill={favorites.includes(car.id) ? '#FF385C' : 'none'}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View> */}

            <View style={styles.carInfo}>
              <Text style={styles.carName}>{car.name}</Text>

              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Rate</Text>
                <Icon.Star width={16} height={16} stroke="#FFD700" fill="#FFD700" strokeWidth={2} />
                <Text style={styles.ratingValue}>{car.rate}</Text>
                <Text style={styles.tripsText}>({car.trips} trips)</Text>
              </View>

              <View style={styles.locationRow}>
                <Icon.MapPin width={16} height={16} stroke="#666" strokeWidth={2} />
                <Text style={styles.locationInfoText}>{car.location}</Text>
              </View>

              <View style={styles.bottomRow}>
                <View style={styles.dateContainer}>
                  <Icon.Calendar width={16} height={16} stroke="#007AFF" strokeWidth={2} />
                  <Text style={styles.dateText}>Available dates</Text>
                </View>
                <Text style={styles.priceText}>Ksh {car.price}/hr</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </AppScreenWrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrapperContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 6,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  mapSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginLeft: 16,
    marginBottom: 12,
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  carsListTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  viewAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  carsScrollContainer: {
    marginBottom: 20,
  },
  carsScrollView: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  carCard: {
    width: width * 0.75,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    overflow:"hidden"
  },
  carImageContainer: {
    height: 180,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  carInfo: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 15,
    color: '#666',
    marginRight: 6,
  },
  ratingValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
    marginRight: 6,
  },
  tripsText: {
    fontSize: 14,
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  locationInfoText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 8,
  },
  priceText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
});
