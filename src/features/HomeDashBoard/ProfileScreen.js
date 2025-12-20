import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Switch } from 'react-native';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {
  Users,
  Truck,
  Star,
  MessageCircle,
  MoreVertical,
  User,
  Info,
  LogOut,
  MapPin,
  CheckCircle,
  PauseCircle,
  Clock,
  Bell,
  Shield,
  Settings,
  MessageSquare,
  ArrowLeft,
  Share2,
  FileText,
  HelpCircle,
  Heart,
  Gift,
  Key,
  Calendar,
  Car,
} from 'react-native-feather';

const signOut = async (navigation) => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      }),
    );
    RNRestart.Restart();
  } catch (error) {
    console.log('Error signing out: ', error);
  }
};

const demoStatusData = {
  'In Progress': [
    { id: 1, car: 'Toyota Fortuner', code: '#BK2025A1', date: '13 Dec 2025', status: 'Active' },
    { id: 2, car: 'Mercedes E-Class', code: '#BK2025A2', date: '16 Dec 2025', status: 'Active' },
  ],
  'On hold': [{ id: 1, car: 'BMW M3', code: '#BK2025B1', date: '10 Dec 2025', status: 'Pending' }],
  Completed: [
    { id: 1, car: 'Mahindra Scorpio', code: '#BK2025C1', date: '5 Nov 2025', status: 'Completed' },
    { id: 2, car: 'Volvo XC90', code: '#BK2025C2', date: '8 Nov 2025', status: 'Completed' },
    { id: 3, car: 'Nissan Qashqai', code: '#BK2025C3', date: '14 Nov 2025', status: 'Completed' },
  ],
  Reviews: [
    { id: 1, car: 'Toyota Fortuner', review: 'Great ride and super clean!', rating: 5 },
    { id: 2, car: 'Mercedes E-Class', review: 'Smooth process, loved the support.', rating: 4 },
  ],
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  // You may want to get real profile data, for now static
  const user = {
    name: 'John Doe',
    trips: 'No of trips',
    location: 'Location',
    avatar: require('../../assets/bmw.png'), // Placeholder avatar image
  };

  // Demo state for switches
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);

  // Modal state
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalStatusType, setModalStatusType] = React.useState('');

  const openStatusModal = (status) => {
    setModalStatusType(status);
    setModalVisible(true);
  };
  const closeStatusModal = () => {
    setModalVisible(false);
    setModalStatusType('');
  };

  return (
    <AppScreenWrapper>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerRoot}>
          <View style={styles.headerRow}>
            <Pressable
              style={styles.iconCircle}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft stroke={'#556'} width={22} height={22} />
            </Pressable>
            <Text style={styles.headerTitle}>My Account</Text>
            <Pressable style={styles.iconCircle}>
              <Share2 stroke={'#556'} width={22} height={22} />
            </Pressable>
          </View>

          <View style={styles.avatarSection}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileTrips}>{user.trips}</Text>
            <View style={styles.profileLocationRow}>
              <MapPin width={14} height={14} stroke={'#999'} />
              <Text style={styles.profileLocationText}>{user.location}</Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Users width={24} height={24} stroke={'#0E7490'} />
              <Text style={styles.metricCountMain}>500+</Text>
              <Text style={styles.metricLabel}>Customers</Text>
            </View>
            <View style={styles.metricItem}>
              <Truck width={24} height={24} stroke={'#0E7490'} />
              <Text style={styles.metricCountMain}>2+</Text>
              <Text style={styles.metricLabel}>Cars</Text>
            </View>
            <View style={styles.metricItem}>
              <Star width={24} height={24} stroke={'#0E7490'} />
              <Text style={styles.metricCountMain}>4.2+</Text>
              <Text style={styles.metricLabel}>Rating</Text>
            </View>
            <View style={styles.metricItem}>
              <MessageCircle width={24} height={24} stroke={'#0E7490'} />
              <Text style={styles.metricCountMain}>150+</Text>
              <Text style={styles.metricLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Status Cards */}
        <View style={styles.statusCardsRow}>
          <Pressable style={styles.statusCard} onPress={() => openStatusModal('In Progress')}>
            <Text style={styles.statusCardCount}>05</Text>
            <Text style={styles.statusCardLabel}>In Progress</Text>
            <MoreVertical style={styles.cardMoreIcon} width={16} height={16} stroke={'black'} />
          </Pressable>
          <Pressable style={styles.statusCard} onPress={() => openStatusModal('On hold')}>
            <Text style={styles.statusCardCount}>05</Text>
            <Text style={styles.statusCardLabel}>On hold</Text>
            <PauseCircle style={styles.cardMoreIcon} width={16} height={16} stroke={'black'} />
          </Pressable>
        </View>
        <View style={styles.statusCardsRow}>
          <Pressable style={styles.statusCard} onPress={() => openStatusModal('Completed')}>
            <Text style={styles.statusCardCount}>05</Text>
            <Text style={styles.statusCardLabel}>Completed</Text>
            <CheckCircle style={styles.cardMoreIcon} width={16} height={16} stroke={'black'} />
          </Pressable>
          <Pressable style={styles.statusCard} onPress={() => openStatusModal('Reviews')}>
            <Text style={styles.statusCardCount}>05</Text>
            <Text style={styles.statusCardLabel}>Reviews</Text>
            <Star style={styles.cardMoreIcon} width={16} height={16} stroke={'black'} />
          </Pressable>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.sectionCard}>
          <SectionRow
            icon={<User stroke={'#0E7490'} width={20} height={20} />}
            label="Personal information"
            onPress={() => {}}
          />
          <SectionRow
            icon={<MessageSquare stroke={'#0E7490'} width={20} height={20} />}
            label="Chat history"
            onPress={() => {}}
          />
          <SectionRow
            icon={<Key stroke={'#0E7490'} width={20} height={20} />}
            label="Driving License"
            onPress={() => {}}
          />
          <SectionRow
            icon={<Heart stroke={'#0E7490'} width={20} height={20} />}
            label="Favorite cars"
            onPress={() => {}}
          />
          <SectionRow
            icon={<Gift stroke={'#0E7490'} width={20} height={20} />}
            label="Refer Friends"
            onPress={() => {}}
          />
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionHeader}>Settings</Text>
        <View style={styles.sectionCard}>
          <SectionRow
            icon={<Bell stroke={'#0E7490'} width={20} height={20} />}
            label="Push Notifications"
            right={<Switch value={notificationEnabled} onValueChange={setNotificationEnabled} />}
          />
          <SectionRow
            icon={<MapPin stroke={'#0E7490'} width={20} height={20} />}
            label="Location"
            right={<Switch value={locationEnabled} onValueChange={setLocationEnabled} />}
          />
          <SectionRow
            icon={<Shield stroke={'#0E7490'} width={20} height={20} />}
            label="Privacy Policy"
            onPress={() => {}}
          />
          <SectionRow
            icon={<FileText stroke={'#0E7490'} width={20} height={20} />}
            label="Terms of Service"
            onPress={() => {}}
          />
          <SectionRow
            icon={<HelpCircle stroke={'#0E7490'} width={20} height={20} />}
            label="Help & Support"
            onPress={() => {}}
          />
          <SectionRow
            icon={<Info stroke={'#0E7490'} width={20} height={20} />}
            label="About App"
            onPress={() => {}}
          />
          <SectionRow
            icon={<LogOut stroke={'#0E7490'} width={20} height={20} />}
            label="Log out"
            onPress={() => signOut(navigation)}
          />
        </View>

        {/* <View style={{ height: 24 }} /> */}
      </ScrollView>
      {/* Status Modal */}
      <StatusModal
        visible={modalVisible}
        onRequestClose={closeStatusModal}
        status={modalStatusType}
        data={demoStatusData[modalStatusType] || []}
      />
    </AppScreenWrapper>
  );
};

// StatusModal - bottom popup for card details
function StatusModal({ visible, onRequestClose, status, data }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onRequestClose}>
      <Pressable style={modalStyles.overlay} onPress={onRequestClose}>
        <Pressable style={modalStyles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={modalStyles.headerRow}>
            <Text style={modalStyles.header}>{status}</Text>
            <Pressable onPress={onRequestClose}>
              <Text style={modalStyles.close}>✕</Text>
            </Pressable>
          </View>
          <View>
            {data && data.length > 0 ? (
              data.map((item) => (
                <View style={modalStyles.item} key={item.id}>
                  <Text style={modalStyles.itemCar}>{item.car || ''}</Text>
                  {'code' in item && (
                    <Text style={modalStyles.itemDetail}>
                      {item.code} | {item.date} | {item.status}
                    </Text>
                  )}
                  {'review' in item && (
                    <Text style={modalStyles.itemReview}>
                      “{item.review}”{' '}
                      {item.rating && (
                        <Text style={modalStyles.itemStars}>{'★'.repeat(item.rating)}</Text>
                      )}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={modalStyles.noData}>No data found.</Text>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const SectionRow = ({ icon, label, right, onPress }) => (
  <Pressable onPress={onPress} style={styles.sectionRow}>
    <View style={styles.sectionRowLeft}>
      {icon}
      <Text style={styles.sectionRowLabel}>{label}</Text>
    </View>
    {right || (
      <MoreVertical style={styles.sectionRowMoreIcon} width={14} height={14} stroke={'#AAB'} />
    )}
  </Pressable>
);

export default ProfileScreen;

import { Modal } from 'react-native';

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 22,
    minHeight: 270,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 7,
    elevation: 17,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  header: {
    fontSize: 19,
    fontWeight: '600',
    color: '#0E7490',
    letterSpacing: 0.2,
  },
  close: {
    fontSize: 22,
    color: '#98A0B1',
    marginLeft: 8,
  },
  item: {
    backgroundColor: '#F5F8FC',
    borderRadius: 11,
    padding: 12,
    marginBottom: 11,
  },
  itemCar: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
    color: '#263042',
  },
  itemDetail: {
    fontSize: 13,
    color: '#57718C',
  },
  itemReview: {
    fontSize: 14,
    color: '#263042',
  },
  itemStars: {
    color: '#F9BC26',
    fontWeight: '700',
  },
  noData: {
    fontSize: 16,
    color: '#C2C8D6',
    textAlign: 'center',
    marginTop: 12,
  },
});

const styles = StyleSheet.create({
  headerRoot: {
    backgroundColor: 'white',
    borderBottomColor: '#F3F4F6',
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FDFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },
  headerTitle: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    fontSize: 24,
    color: '#121212',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 10,
    backgroundColor: '#EFF3F6',
  },
  profileName: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    fontSize: 22,
    color: '#181D28',
    marginTop: 6,
  },
  profileTrips: {
    fontFamily: getFontFamily(true, 'regular'),
    fontWeight: '400',
    fontSize: 13,
    color: '#A2A9B5',
    marginBottom: 2,
    marginTop: 2,
  },
  profileLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  profileLocationText: {
    fontFamily: getFontFamily(true, 'regular'),
    fontWeight: '400',
    fontSize: 13,
    color: '#AAB',
    marginLeft: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 13,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: 2,
  },
  metricCountMain: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    fontSize: 16,
    color: '#0E7490',
    marginTop: 2,
  },
  metricLabel: {
    fontFamily: getFontFamily(true, 'regular'),
    fontSize: 12,
    color: '#A0A9B5',
    marginTop: 1,
  },
  statusCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  statusCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    padding: 18,
    marginRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 140,
    minHeight: 80,
    marginBottom: 7,
    position: 'relative',
  },
  statusCardCount: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '700',
    fontSize: 20,
    color: '#222',
    marginBottom: 2,
  },
  statusCardLabel: {
    fontFamily: getFontFamily(true, 'regular'),
    fontWeight: '400',
    fontSize: 13,
    color: '#A4B1C0',
  },
  cardMoreIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    opacity: 0.7,
  },
  sectionHeader: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    fontSize: 18,
    marginTop: 29,
    marginBottom: 6,
    marginLeft: 19,
    color: '#222',
  },
  sectionCard: {
    backgroundColor: '#F4F7FB',
    borderRadius: 13,
    marginHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderBottomColor: '#E4EAF2',
    borderBottomWidth: 1,
  },
  sectionRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionRowLabel: {
    fontFamily: getFontFamily(true, 'regular'),
    fontWeight: '400',
    fontSize: 15,
    color: '#1D1F24',
    marginLeft: 11,
    letterSpacing: 0.7,
  },
  sectionRowMoreIcon: {
    marginLeft: 10,
  },
  logoutRow: {
    backgroundColor: '#FEFBFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 18,
    marginHorizontal: 14,
    marginTop: 24,
    borderRadius: 13,
  },
  logoutLabel: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    color: '#0E7490',
    fontSize: 16,
    marginLeft: 8,
  },
});
