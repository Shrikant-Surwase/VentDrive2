import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Bell, MessageSquare, Plus, Search, User } from 'react-native-feather';
import { getFontFamily } from '../../utils/fontFamily';
import AppScreenWrapper from '../../AppScreenWrapper';

// Demo chat data with varied names and messages
const chatDemoData = [
  {
    id: 1,
    name: 'John Doe',
    avatar: require('../../assets/bmw.png'),
    message: 'Hi, Good morning...',
    time: '9:00 PM',
    unread: 1,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: null,
    message: 'Thanks for the quick response!',
    time: '8:30 PM',
    unread: 0,
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: null,
    message: 'Can we schedule a meeting?',
    time: '7:15 PM',
    unread: 1,
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: null,
    message: 'The car looks great!',
    time: '6:45 PM',
    unread: 2,
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: null,
    message: 'See you tomorrow!',
    time: '5:20 PM',
    unread: 1,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    avatar: null,
    message: 'Payment received, thank you!',
    time: '4:10 PM',
    unread: 0,
  },
];

// Helper to get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Avatar component with fallback to initials
const ChatAvatar = ({ avatar, name, size = 64 }) => {
  if (avatar) {
    return (
      <Image
        source={avatar}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        resizeMode="cover"
      />
    );
  }
  return (
    <View style={[styles.avatarPlaceholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarInitials, { fontSize: size * 0.35 }]}>{getInitials(name)}</Text>
    </View>
  );
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  // Filter chats based on search
  const filtered = chatDemoData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.message.toLowerCase().includes(search.trim().toLowerCase()),
  );

  // Navigate to chat detail (you can create a ChatDetailScreen later)
  const handleChatPress = (chat) => {
    // For now, show an alert. Replace with navigation.navigate('ChatDetail', { chatId: chat.id }) when ready
    console.log('Opening chat with:', chat.name);
    // navigation.navigate('ChatDetail', { chatId: chat.id, chatName: chat.name });
  };

  // Handle new chat button
  const handleNewChat = () => {
    console.log('New chat pressed');
    // navigation.navigate('NewChat');
  };

  return (
    <AppScreenWrapper style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable style={styles.iconCircle} onPress={() => navigation.goBack()}>
          <ArrowLeft width={22} height={22} stroke="#282828" />
        </Pressable>
        <Text style={styles.headerTitle}>Chat</Text>
        <Pressable style={styles.iconCircle} onPress={() => console.log('Notifications pressed')}>
          <Bell width={26} height={26} stroke="#017084" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrap}>
        <Search
          width={22}
          height={22}
          stroke="#B5BCC7"
          style={{ marginLeft: 14, marginRight: 8 }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B5BCC7"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Chat List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {filtered.length > 0 ? (
          filtered.map((chat) => (
            <Pressable
              style={styles.chatRow}
              key={chat.id}
              onPress={() => handleChatPress(chat)}
              android_ripple={{ color: '#EAEDF1' }}
            >
              <View style={styles.avatarWrap}>
                <ChatAvatar avatar={chat.avatar} name={chat.name} size={64} />
              </View>
              <View style={styles.textSection}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                  {chat.message}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.time}>{chat.time}</Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread > 9 ? '9+' : chat.unread}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No chats found</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button - New Chat */}
      <Pressable style={styles.fab} onPress={handleNewChat}>
        <MessageSquare width={25} height={25} stroke="#017084" />
        <View style={styles.plusIconContainer}>
          <Plus width={13} height={13} stroke="#fff" strokeWidth={3} />
        </View>
      </Pressable>
    </AppScreenWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomColor: '#F3F4F6',
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: getFontFamily(true, 'semiBold'),
    fontWeight: '600',
    fontSize: 24,
    color: '#121212',
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
  searchBarWrap: {
    backgroundColor: '#F7F9FC',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#EDF0F5',
    height: 52,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#262B33',
    fontWeight: '500',
    paddingRight: 16,
    backgroundColor: 'transparent',
    height: 52,
    fontFamily: getFontFamily(true, 'regular'),
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    borderBottomColor: '#EFF2F8',
    borderBottomWidth: 1,
  },
  avatarWrap: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#F1F4F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    backgroundColor: '#0E7490',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  name: {
    fontSize: 21,
    fontWeight: '600',
    color: '#181C21',
    marginBottom: 3,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  message: {
    fontSize: 16,
    color: '#80868D',
    fontWeight: '400',
    maxWidth: '96%',
    fontFamily: getFontFamily(true, 'regular'),
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minWidth: 68,
    marginLeft: 12,
  },
  time: {
    fontSize: 15,
    color: '#308098',
    fontWeight: '500',
    marginBottom: 7,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  unreadBadge: {
    backgroundColor: '#017084',
    borderRadius: 12,
    minWidth: 27,
    height: 27,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: getFontFamily(true, 'semiBold'),
  },
  fab: {
    position: 'absolute',
    bottom: 34,
    right: 24,
    width: 58,
    height: 58,
    backgroundColor: '#F3FAFC',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B4E0F1',
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#05263C44',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 13,
  },
  plusIconContainer: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: '#017084',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#B5BCC7',
    fontFamily: getFontFamily(true, 'regular'),
  },
});
