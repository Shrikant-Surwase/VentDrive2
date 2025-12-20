import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Star, DollarSign } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const BookingSummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bookingData = route.params?.bookingData || {
    car: {
      name: 'Toyota Fortuner',
      path: require('../../assets/fortuner.jpg'),
      price: 2000,
      currency: 'Ksh',
      rating: 4.5,
    },
    rentType: 'With Driver',
    pickupLocation: 'Nairobi - Westgate Shopping Mall',
    pickupDate: 'February 12',
    pickupTime: '10:00 AM',
    dropoffDate: 'February 15',
    dropoffTime: '10:00 AM',
    paymentMethod: 'Cash',
  };

  const car = bookingData.car;
  const days = 3; // Calculate based on dates
  const dailyRate = car.price || 2000;
  const totalAmount = dailyRate * days;

  const handleChangePayment = () => {
    navigation.navigate('PaymentMethods', { bookingData });
  };

  const handleConfirmPayment = () => {
    navigation.navigate('PaymentSuccess', { bookingData, totalAmount });
  };

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>Booking Summary</Text>
          <View style={styles.iconCircle} />
        </View>

        {/* Car Information Section */}
        <View style={styles.carInfoSection}>
          <Image source={car.path} style={styles.carImage} resizeMode="cover" />
          <View style={styles.carDetails}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carPrice}>
              {car.currency || 'Ksh'} {car.price || 2000}/hr
            </Text>
            <View style={styles.ratingRow}>
              <Star width={20} height={20} stroke="#F9BC26" fill="#F9BC26" />
              <Text style={styles.ratingText}>{car.rating || 4.5}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Booking Details Section */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pick-up Date & Time</Text>
            <Text style={styles.detailValue}>
              {bookingData.pickupDate} | {bookingData.pickupTime}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Drop-off Date & Time</Text>
            <Text style={styles.detailValue}>
              {bookingData.dropoffDate} | {bookingData.dropoffTime}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rent Type</Text>
            <Text style={styles.detailValue}>{bookingData.rentType}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Amount Breakdown Section */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>
              {car.currency || 'Ksh'} {dailyRate}/day
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Hours/Days</Text>
            <Text style={styles.detailValue}>{days} Days</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fees</Text>
            <Text style={styles.detailValue}>
              {car.currency || 'Ksh'} {totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Total Section */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {car.currency || 'Ksh'} {totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.paymentMethodSection}>
          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentMethodLeft}>
              <DollarSign width={24} height={24} stroke="#0E7490" />
              <Text style={styles.paymentMethodText}>{bookingData.paymentMethod || 'Cash'}</Text>
            </View>
            <Pressable onPress={handleChangePayment}>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Payment Button */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.confirmButton} onPress={handleConfirmPayment}>
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default BookingSummaryScreen;

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
    fontSize: 24,
    fontWeight: '700',
    color: '#191C23',
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
  carInfoSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  carImage: {
    width: 120,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  carDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191C23',
    marginBottom: 8,
    fontFamily: getFontFamily(true, 'bold'),
  },
  carPrice: {
    fontSize: 16,
    color: '#80868D',
    marginBottom: 8,
    fontFamily: getFontFamily(true, 'regular'),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#191C23',
    marginLeft: 6,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E7EF',
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: '#80868D',
    fontFamily: getFontFamily(true, 'regular'),
  },
  detailValue: {
    fontSize: 16,
    color: '#191C23',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  totalLabel: {
    fontSize: 20,
    color: '#191C23',
    fontWeight: '700',
    fontFamily: getFontFamily(true, 'bold'),
  },
  totalValue: {
    fontSize: 20,
    color: '#0E7490',
    fontWeight: '700',
    fontFamily: getFontFamily(true, 'bold'),
  },
  paymentMethodSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#191C23',
    marginLeft: 12,
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  changeText: {
    fontSize: 16,
    color: '#0E7490',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
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
  confirmButton: {
    backgroundColor: '#0E7490',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: getFontFamily(true, 'bold'),
  },
});

