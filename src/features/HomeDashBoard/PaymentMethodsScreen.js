import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  ChevronRight,
  Smartphone,
  Globe,
} from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bookingData = route.params?.bookingData;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');

  const handleConfirm = () => {
    const updatedBookingData = {
      ...bookingData,
      paymentMethod: selectedPaymentMethod,
    };
    navigation.navigate('BookingSummary', { bookingData: updatedBookingData });
  };

  const handleAddCard = () => {
    // Navigate to add card screen (can be implemented later)
    console.log('Add card pressed');
  };

  const handleViewBooking = () => {
    // Navigate to BookingSummary to view booking details
    navigation.goBack()
  };

  const paymentOptions = [
    { id: 'mpesa', name: 'M-pesa', icon: Smartphone, color: '#00A859' },
    { id: 'airtel', name: 'Airtel Money', icon: Smartphone, color: '#E60000' },
    { id: 'paypal', name: 'Paypal', icon: Globe, color: '#0070BA' },
  ];

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>

        {/* Cash Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Cash</Text>
          <Pressable style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('Cash')}>
            <View style={styles.paymentOptionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#00A859' }]}>
                <DollarSign width={24} height={24} stroke="#fff" />
              </View>
              <Text style={styles.paymentOptionText}>Cash</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedPaymentMethod === 'Cash' && styles.radioButtonSelected,
              ]}
            >
              {selectedPaymentMethod === 'Cash' && <View style={styles.radioButtonInner} />}
            </View>
          </Pressable>
        </View>

        {/* Credit & Debit Card Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Credit & Debit Card</Text>
          <Pressable style={styles.paymentOption} onPress={handleAddCard}>
            <View style={styles.paymentOptionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#0070BA' }]}>
                <CreditCard width={24} height={24} stroke="#fff" />
              </View>
              <Text style={styles.paymentOptionText}>Add Card</Text>
            </View>
            <ChevronRight width={20} height={20} stroke="#80868D" />
          </Pressable>
        </View>

        {/* More Payment Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>More Payment Options</Text>
          {paymentOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Pressable
                key={option.id}
                style={styles.paymentOption}
                onPress={() => setSelectedPaymentMethod(option.name)}
              >
                <View style={styles.paymentOptionLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                    <IconComponent width={24} height={24} stroke="#fff" />
                  </View>
                  <Text style={styles.paymentOptionText}>{option.name}</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPaymentMethod === option.name && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPaymentMethod === option.name && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight:16
  },
  viewBookingText: {
    fontSize: 16,
    color: '#0E7490',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C23',
    marginBottom: 16,
    fontFamily: getFontFamily(true, 'bold'),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#191C23',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E7EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#0E7490',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0E7490',
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
