import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { ArrowLeft, Check } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData, totalAmount } = route.params || {};

  const handleViewBooking = () => {
    // Navigate back to BottomBarNavigation (Home tab) to show bottom navigation
     navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'BottomBarNavigation',
            params: {
              screen: 'Bookings',
            },
          },
        ],
      }),
    );
  };

  const handleViewReceipt = () => {
    navigation.navigate('EReceipt', { bookingData, totalAmount });
  };

  return (
    <AppScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.iconCircle} />
        </View>

        {/* Success Content */}
        <View style={styles.successContent}>
          <View style={styles.checkmarkCircle}>
            <Check width={60} height={60} stroke="#fff" strokeWidth={4} />
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successMessage}>Your car is successfully booked.</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.viewBookingButton} onPress={handleViewBooking}>
            <Text style={styles.viewBookingText}>View Booking</Text>
          </Pressable>
          <Pressable style={styles.viewReceiptButton} onPress={handleViewReceipt}>
            <Text style={styles.viewReceiptText}>View E-Receipt</Text>
          </Pressable>
        </View>
      </View>
    </AppScreenWrapper>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0E7490',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191C23',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: getFontFamily(true, 'bold'),
  },
  successMessage: {
    fontSize: 18,
    color: '#80868D',
    textAlign: 'center',
    fontFamily: getFontFamily(true, 'regular'),
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 1,
    borderTopColor: '#E2E7EF',
  },
  viewBookingButton: {
    backgroundColor: '#0E7490',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  viewBookingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: getFontFamily(true, 'bold'),
  },
  viewReceiptButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0E7490',
    marginBottom: 20,
  },
  viewReceiptText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E7490',
    fontFamily: getFontFamily(true, 'bold'),
  },
});

