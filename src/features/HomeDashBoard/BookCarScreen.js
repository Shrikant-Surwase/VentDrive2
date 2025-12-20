import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Heart, MapPin } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const { width: screenWidth } = Dimensions.get('window');

const BookCarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const carData = route.params?.car || {
    name: 'Toyota Fortuner',
    path: require('../../assets/fortuner.jpg'),
    rate: 5,
    location: 'Nairobi, Kenya',
    date: '12 Aug 2025',
  };

  const [rentType, setRentType] = useState('Self-Drive');
  const [pickupLocation, setPickupLocation] = useState('Nairobi - Westgate Shopping Mall');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo images for carousel
  const carImages = [carData.path, carData.path, carData.path];

  const handleContinue = () => {
    const bookingData = {
      car: carData,
      rentType,
      pickupLocation,
      pickupDate: 'February 12',
      pickupTime: '10:00 AM',
      dropoffDate: 'February 15',
      dropoffTime: '10:00 AM',
      paymentMethod: 'Cash',
    };
    navigation.navigate('BookingSummary', { bookingData });
  };

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>Book Car</Text>
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

        {/* Car Name */}
        <View style={styles.carNameSection}>
          <Text style={styles.carName}>{carData.name}</Text>
          <View style={styles.locationRow}>
            <MapPin width={16} height={16} stroke="#80868D" fill="none" />
            <Text style={styles.locationText}>{carData.location}</Text>
          </View>
        </View>

        {/* Rent Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Rent Type</Text>
          <View style={styles.rentTypeContainer}>
            <Pressable
              style={[
                styles.rentTypeButton,
                rentType === 'Self-Drive' && styles.rentTypeButtonActive,
              ]}
              onPress={() => setRentType('Self-Drive')}
            >
              <Text
                style={[
                  styles.rentTypeText,
                  rentType === 'Self-Drive' && styles.rentTypeTextActive,
                ]}
              >
                Self-Drive
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.rentTypeButton,
                rentType === 'With Driver' && styles.rentTypeButtonActive,
              ]}
              onPress={() => setRentType('With Driver')}
            >
              <Text
                style={[
                  styles.rentTypeText,
                  rentType === 'With Driver' && styles.rentTypeTextActive,
                ]}
              >
                With Driver
              </Text>
            </Pressable>
          </View>

          {/* Additional Cost Info */}
          {rentType === 'With Driver' && (
            <View style={styles.costInfoBox}>
              <Text style={styles.costInfoText}>
                Additional Ksh 2,000/hr Driver cost if you choose with Driver option.
              </Text>
            </View>
          )}
        </View>

        {/* Pick-up Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Pick-up Location</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="Enter pick-up location"
              placeholderTextColor="#B5BCC7"
            />
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default BookCarScreen;

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
  headerTitle: {
    fontSize: 28,
    color: '#191C23',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: getFontFamily(true, 'bold'),
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
    height: 280,
    backgroundColor: '#F7F9FC',
    position: 'relative',
    marginTop: 0,
  },
  carImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
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
    marginBottom: 12,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  rentTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  rentTypeButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E7EF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentTypeButtonActive: {
    backgroundColor: '#0E7490',
    borderColor: '#0E7490',
  },
  rentTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#80868D',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  rentTypeTextActive: {
    color: '#fff',
  },
  costInfoBox: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  costInfoText: {
    fontSize: 14,
    color: '#80868D',
    lineHeight: 20,
    fontFamily: getFontFamily(true, 'regular'),
  },
  inputContainer: {
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E7EF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#191C23',
    fontFamily: getFontFamily(true, 'regular'),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E7EF',
  },
  continueButton: {
    backgroundColor: '#0E7490',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: getFontFamily(true, 'bold'),
  },
});
