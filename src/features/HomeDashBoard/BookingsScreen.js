import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search, MapPin, Edit, X, RotateCw, Star } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

// Demo booking data
const demoBookings = {
  current: [
    {
      id: 'BK001',
      carName: 'Toyota Fortuner',
      carImage: require('../../assets/fortuner.jpg'),
      location: 'Nairobi, Kenya',
      status: 'Active',
      statusColor: '#00A859',
      price: 2000,
      currency: 'Ksh',
      startDate: '25/12/2025',
      endDate: '28/12/2025',
    },
    {
      id: 'BK002',
      carName: 'BMW M3',
      carImage: require('../../assets/bmwm3.jpg'),
      location: 'Mumbai, Maharashtra',
      status: 'Confirmed',
      statusColor: '#0E7490',
      price: 3000,
      currency: 'Ksh',
      startDate: '30/12/2025',
      endDate: '02/01/2026',
    },
    {
      id: 'BK003',
      carName: 'Mercedes E-Class',
      carImage: require('../../assets/mahindra.jpg'),
      location: 'Bengaluru, Karnataka',
      status: 'Confirmed',
      statusColor: '#0E7490',
      price: 3500,
      currency: 'Ksh',
      startDate: '05/01/2026',
      endDate: '08/01/2026',
    },
  ],
  past: [
    {
      id: 'BK004',
      carName: 'Toyota Fortuner',
      carImage: require('../../assets/fortuner.jpg'),
      location: 'Nairobi, Kenya',
      status: 'Completed',
      statusColor: '#0E7490',
      price: 2000,
      currency: 'Ksh',
      startDate: '25/12/2025',
      endDate: '28/12/2025',
      rating: 4.5,
    },
    {
      id: 'BK005',
      carName: 'BMW M3',
      carImage: require('../../assets/bmwm3.jpg'),
      location: 'Mumbai, Maharashtra',
      status: 'Completed',
      statusColor: '#0E7490',
      price: 3000,
      currency: 'Ksh',
      startDate: '20/12/2025',
      endDate: '23/12/2025',
      rating: 4.0,
    },
  ],
};

const BookingsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Current');
  const [searchQuery, setSearchQuery] = useState('');

  const bookings = activeTab === 'Current' ? demoBookings.current : demoBookings.past;

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        width={16}
        height={16}
        stroke="#F9BC26"
        fill={index < Math.floor(rating) ? '#F9BC26' : 'none'}
        style={{ marginRight: 2 }}
      />
    ));
  };

  return (
    <AppScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft width={22} height={22} stroke="#282828" />
          </Pressable>
          <Text style={styles.headerTitle}>Bookings</Text>
          <View style={styles.iconCircle} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Search
            width={20}
            height={20}
            stroke="#B5BCC7"
            style={{ marginLeft: 14, marginRight: 8 }}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#B5BCC7"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'Current' && styles.tabActive]}
            onPress={() => setActiveTab('Current')}
          >
            <Text style={[styles.tabText, activeTab === 'Current' && styles.tabTextActive]}>
              Current
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Past' && styles.tabActive]}
            onPress={() => setActiveTab('Past')}
          >
            <Text style={[styles.tabText, activeTab === 'Past' && styles.tabTextActive]}>Past</Text>
          </Pressable>
        </View>

        {/* Booking Cards */}
        <View style={styles.bookingsContainer}>
          {filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Car Image and Details */}
              <View style={styles.cardTopSection}>
                <Image source={booking.carImage} style={styles.carImage} resizeMode="cover" />
                <View style={styles.carDetails}>
                  <Text style={styles.carName}>{booking.carName}</Text>
                  <View style={styles.locationRow}>
                    <MapPin width={14} height={14} stroke="#80868D" />
                    <Text style={styles.locationText}>{booking.location}</Text>
                  </View>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: booking.statusColor }]} />
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    {booking.currency} {booking.price.toLocaleString()}
                  </Text>
                  <Text style={styles.priceLabel}>total</Text>
                </View>
              </View>

              {/* Dates */}
              <View style={styles.datesContainer}>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <Text style={styles.dateValue}>{booking.startDate}</Text>
                </View>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <Text style={styles.dateValue}>{booking.endDate}</Text>
                </View>
              </View>

              {/* Booking ID */}
              <Text style={styles.bookingId}>Booking ID: {booking.id}</Text>

              {/* Rating (for Past bookings) */}
              {activeTab === 'Past' && booking.rating && (
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>Rating:</Text>
                  <View style={styles.starsContainer}>{renderStars(booking.rating)}</View>
                  <Text style={styles.ratingValue}>{booking.rating}</Text>
                </View>
              )}

              {/* Actions */}
              <View style={styles.actionsRow}>
                {activeTab === 'Current' ? (
                  <>
                    <Pressable style={styles.modifyButton}>
                      <Edit width={18} height={18} stroke="#00A859" />
                      <Text style={styles.modifyText}>Modify</Text>
                    </Pressable>
                    <Pressable style={styles.cancelButton}>
                      <X width={18} height={18} stroke="#E23744" />
                      <Text style={styles.cancelText}>Cancel</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable style={styles.rebookButton}>
                    <RotateCw width={18} height={18} stroke="#00A859" />
                    <Text style={styles.rebookText}>Rebook</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </AppScreenWrapper>
  );
};

export default BookingsScreen;

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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E7EF',
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#262B33',
    paddingRight: 16,
    fontFamily: getFontFamily(true, 'regular'),
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E7EF',
  },
  tabActive: {
    backgroundColor: '#0E7490',
    borderColor: '#0E7490',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#80868D',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  tabTextActive: {
    color: '#fff',
  },
  bookingsContainer: {
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E7EF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  carImage: {
    width: 100,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  carDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C23',
    marginBottom: 6,
    fontFamily: getFontFamily(true, 'bold'),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#80868D',
    marginLeft: 4,
    fontFamily: getFontFamily(true, 'regular'),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#191C23',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C23',
    fontFamily: getFontFamily(true, 'bold'),
  },
  priceLabel: {
    fontSize: 12,
    color: '#80868D',
    marginTop: 2,
    fontFamily: getFontFamily(true, 'regular'),
  },
  datesContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#80868D',
    marginBottom: 4,
    fontFamily: getFontFamily(true, 'regular'),
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191C23',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  bookingId: {
    fontSize: 14,
    color: '#80868D',
    marginBottom: 12,
    fontFamily: getFontFamily(true, 'regular'),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#80868D',
    marginRight: 8,
    fontFamily: getFontFamily(true, 'regular'),
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191C23',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modifyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00A859',
    gap: 6,
  },
  modifyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A859',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E23744',
    gap: 6,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  rebookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#00A859',
    gap: 6,
  },
  rebookText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
});
