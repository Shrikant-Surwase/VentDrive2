import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Droplet,
  Settings,
  Users,
  Wind,
  Zap,
  Star,
} from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const { width: screenWidth } = Dimensions.get('window');

const CarDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const carData = route.params?.car || {
    name: 'Toyota Fortuner',
    path: require('../../assets/fortuner.jpg'),
    rate: 5,
    location: 'Nairobi, Kenya',
    date: '12 Aug 2025',
    price: 2000,
    currency: 'Ksh',
    specifications: {
      fuel: 'Petrol',
      transmission: 'Manual',
      seats: '7 Seats',
      airCon: 'Air Con',
      engine: 'Hybrid',
    },
    description: 'Unleash Adventure with the Toyota Fortuner: The Ultimate Ride for Every Journey',
    rating: 4,
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo images for carousel
  const carImages = [carData.path, carData.path, carData.path];

  const handleBookNow = () => {
    navigation.navigate('BookCar', { car: carData });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        width={20}
        height={20}
        stroke="#F9BC26"
        fill={index < rating ? '#F9BC26' : 'none'}
        style={{ marginRight: 4 }}
      />
    ));
  };

  const specifications = [
    { icon: Droplet, label: carData.specifications?.fuel || 'Petrol' },
    { icon: Settings, label: carData.specifications?.transmission || 'Manual' },
    { icon: Users, label: carData.specifications?.seats || '7 Seats' },
    { icon: Wind, label: carData.specifications?.airCon || 'Air Con' },
    { icon: Zap, label: carData.specifications?.engine || 'Hybrid' },
  ];

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Pressable style={styles.iconCircle} onPress={() => setIsFavorite(!isFavorite)}>
            <Heart
              width={22}
              height={22}
              stroke={isFavorite ? '#fff' : '#E23744'}
              fill={isFavorite ? '#E23744' : 'none'}
            />
          </Pressable>
        </View>

        {/* Car Image Section */}
        <View style={styles.imageContainer}>
          <Image source={carImages[currentImageIndex]} style={styles.carImage} resizeMode="cover" />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {carImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Car Name and Location */}
        <View style={styles.carNameSection}>
          <Text style={styles.carName}>{carData.name}</Text>
          <View style={styles.locationRow}>
            <MapPin width={16} height={16} stroke="#80868D" fill="none" />
            <Text style={styles.locationText}>{carData.location}</Text>
          </View>
        </View>

        {/* Specifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Specifications</Text>
          <View style={styles.specificationsContainer}>
            {specifications.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <View key={index} style={styles.specItem}>
                  <View style={styles.specIconContainer}>
                    <IconComponent width={20} height={20} stroke="#0E7490" />
                  </View>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.descriptionText}>
            {carData.description ||
              'Unleash Adventure with the Toyota Fortuner: The Ultimate Ride for Every Journey'}
          </Text>
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reviews</Text>
          <View style={styles.reviewsContainer}>
            {renderStars(carData.rating || 4)}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {carData.currency || 'Ksh'} {carData.price || 2000}/ day
          </Text>
        </View>
        <Pressable style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Book now</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#F7F9FC',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F7F9FC',
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  carNameSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  carName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191C23',
    marginBottom: 8,
    fontFamily: getFontFamily(true, 'bold'),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#80868D',
    marginLeft: 6,
    fontFamily: getFontFamily(true, 'regular'),
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191C23',
    marginBottom: 16,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  specificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  specItem: {
    width: (screenWidth - 52) / 3 - 8,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E7EF',
    marginBottom: 12,
  },
  specIconContainer: {
    marginBottom: 6,
  },
  specLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191C23',
    textAlign: 'center',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  descriptionText: {
    fontSize: 16,
    color: '#80868D',
    lineHeight: 24,
    fontFamily: getFontFamily(true, 'regular'),
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E7EF',
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191C23',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  bookNowButton: {
    backgroundColor: '#0E7490',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: getFontFamily(true, 'bold'),
  },
});

