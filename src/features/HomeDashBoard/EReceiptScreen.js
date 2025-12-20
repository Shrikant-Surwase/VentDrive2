import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

const EReceiptScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData, totalAmount } = route.params || {};

  const receiptData = {
    name: 'John Doe',
    car: bookingData?.car?.name || 'Toyota Fortuner Legender',
    seats: '07',
    pickupDate: bookingData?.pickupDate || 'February 12',
    pickupTime: bookingData?.pickupTime || '10:00 AM',
    dropoffDate: bookingData?.dropoffDate || 'February 15',
    dropoffTime: bookingData?.dropoffTime || '10:00 AM',
    rentType: bookingData?.rentType || 'Self Driver',
    amount: `${bookingData?.car?.currency || 'Ksh'} ${bookingData?.car?.price || 5000}/day`,
    totalDays: '3 Days',
    fees: `${bookingData?.car?.currency || 'Ksh'} ${2000}`,
    totalPrice: `${bookingData?.car?.currency || 'Ksh'} ${totalAmount || 17000}`,
  };

  const handleDownload = () => {
    // Implement download functionality (can use react-native-fs or similar)
    console.log('Download receipt');
  };

  // Simple barcode representation (you can use a barcode library for real barcode)
  const renderBarcode = () => {
    return (
      <View style={styles.barcodeContainer}>
        {Array.from({ length: 50 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.barcodeLine,
              {
                width: Math.random() * 4 + 2,
                height: 60,
                backgroundColor: '#000',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const receiptItems = [
    { label: 'Name', value: receiptData.name },
    { label: 'Car', value: receiptData.car },
    { label: 'Seats', value: receiptData.seats },
    { label: 'Pick-up Date & Time', value: `${receiptData.pickupDate} | ${receiptData.pickupTime}` },
    { label: 'Drop-off Date & Time', value: `${receiptData.dropoffDate} | ${receiptData.dropoffTime}` },
    { label: 'Rent Type', value: receiptData.rentType },
    { label: 'Amount', value: receiptData.amount },
    { label: 'Total Hours/Days', value: receiptData.totalDays },
    { label: 'Fees', value: receiptData.fees },
  ];

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>E-Receipt</Text>
          <View style={styles.iconCircle} />
        </View>

        {/* Receipt Card */}
        <View style={styles.receiptCard}>
          {/* Barcode */}
          {renderBarcode()}

          {/* Receipt Items */}
          <View style={styles.receiptContent}>
            {receiptItems.map((item, index) => (
              <View key={index}>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>{item.label}</Text>
                  <Text style={styles.receiptValue}>{item.value}</Text>
                </View>
                {index < receiptItems.length - 1 && index !== 1 && index !== 4 && (
                  <View style={styles.receiptDivider} />
                )}
              </View>
            ))}

            {/* Total Rental Price */}
            <View style={styles.receiptDivider} />
            <View style={styles.receiptRow}>
              <Text style={styles.totalLabel}>Total Rental Price</Text>
              <Text style={styles.totalValue}>{receiptData.totalPrice}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Download Button */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </Pressable>
      </View>
    </AppScreenWrapper>
  );
};

export default EReceiptScreen;

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
  receiptCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  barcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  barcodeLine: {
    marginHorizontal: 1,
  },
  receiptContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#80868D',
    fontFamily: getFontFamily(true, 'regular'),
    flex: 1,
  },
  receiptValue: {
    fontSize: 14,
    color: '#191C23',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
    textAlign: 'right',
    flex: 1,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#E2E7EF',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    color: '#191C23',
    fontWeight: '700',
    fontFamily: getFontFamily(true, 'bold'),
    flex: 1,
  },
  totalValue: {
    fontSize: 18,
    color: '#0E7490',
    fontWeight: '700',
    fontFamily: getFontFamily(true, 'bold'),
    textAlign: 'right',
    flex: 1,
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
  downloadButton: {
    backgroundColor: '#0E7490',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  downloadButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: getFontFamily(true, 'bold'),
  },
});

