import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import AppScreenWrapper from '../../AppScreenWrapper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ZomatoFilter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({});

  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);
  const categoryPositions = useRef([]);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef(null);

  // Filter data similar to Zomato
  const filterData = [
    {
      category: 'Sort By',
      items: ['Relevance', 'Delivery Time', 'Rating', 'Cost: Low to High', 'Cost: High to Low'],
    },
    {
      category: 'Cuisines',
      items: [
        'North Indian',
        'South Indian',
        'Chinese',
        'Italian',
        'Mexican',
        'Continental',
        'Fast Food',
        'Desserts',
        'Beverages',
      ],
    },
    {
      category: 'Rating',
      items: ['4.5+', '4.0+', '3.5+', '3.0+', 'Any'],
    },
    {
      category: 'Cost for Two',
      items: ['₹1-₹300', '₹300-₹600', '₹600-₹1200', '₹1200-₹2400', '₹2400+'],
    },
    {
      category: 'Offers',
      items: ['Free Delivery', 'Pro', 'Deals of the Day', 'Super', 'Bank Offers'],
    },
    {
      category: 'Delivery Time',
      items: ['10-15 min', '15-30 min', '30-45 min', '45+ min'],
    },
    {
      category: 'Pure Veg',
      items: ['Pure Veg Only', 'Include Non-Veg'],
    },
    {
      category: 'Meal Type',
      items: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'],
    },
    {
      category: 'More Filters',
      items: ['Great for Groups', 'Pet Friendly', 'Outdoor Seating', 'Home Delivery', 'Takeaway'],
    },
    {
      category: 'Payment',
      items: ['Cash on Delivery', 'Online Payment', 'Card Payment', 'UPI', 'Wallet'],
    },
    {
      category: 'Special Features',
      items: ['Live Music', 'Smoking Area', 'Wifi', 'Air Conditioned', 'Parking Available'],
    },
  ];

  const handleCategoryPress = (index) => {
    setSelectedCategory(index);
    scrollToCategory(index);
  };

  const scrollToCategory = (categoryIndex) => {
    if (categoryPositions.current[categoryIndex] && rightScrollRef.current) {
      isScrollingProgrammatically.current = true;
      rightScrollRef.current.scrollTo({
        y: categoryPositions.current[categoryIndex],
        animated: true,
      });

      // Reset flag after scroll animation
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const handleRightScroll = (event) => {
    if (isScrollingProgrammatically.current) return;

    const scrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    let newSelectedCategory = 0;

    // Check if we're at the bottom - if so, select last category
    if (scrollY + scrollViewHeight >= contentHeight - 40) {
      newSelectedCategory = filterData.length - 1;
    } else {
      // Find which category is currently visible
      for (let i = categoryPositions.current.length - 1; i >= 0; i--) {
        if (scrollY >= categoryPositions.current[i] - 300) {
          newSelectedCategory = i;
          break;
        }
      }
    }

    // Only update if category actually changed
    if (newSelectedCategory !== selectedCategory) {
      setSelectedCategory(newSelectedCategory);

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Debounce the left panel scroll to make it smooth
      scrollTimeout.current = setTimeout(() => {
        // Auto-scroll left panel if category is beyond 6th position
        if (newSelectedCategory >= 6 && leftScrollRef.current) {
          const itemHeight = 50;
          const scrollPosition = (newSelectedCategory - 5) * itemHeight;
          leftScrollRef.current.scrollTo({
            y: scrollPosition,
            animated: true,
          });
        } else if (newSelectedCategory < 6 && leftScrollRef.current) {
          leftScrollRef.current.scrollTo({
            y: 0,
            animated: true,
          });
        }
      }, 150);
    }
  };

  const handleFilterToggle = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const getSelectedCount = () => {
    return Object.values(selectedFilters).filter(Boolean).length;
  };

  return (
    <AppScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.headerText}>Zomato-Style Filter</Text>
        <Pressable onPress={() => setModalVisible(true)} style={styles.openButton}>
          <Text style={styles.buttonText}>Open Filter</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {/* Two Pane Layout */}
            <View style={styles.contentContainer}>
              {/* Left Panel - Categories */}
              <View style={styles.leftPanel}>
                <ScrollView ref={leftScrollRef} showsVerticalScrollIndicator={false}>
                  {filterData.map((item, index) => (
                    <Pressable
                      key={index}
                      style={[
                        styles.categoryItem,
                        selectedCategory === index && styles.selectedCategory,
                      ]}
                      onPress={() => handleCategoryPress(index)}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          selectedCategory === index && styles.selectedCategoryText,
                        ]}
                      >
                        {item.category}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Right Panel - Subcategories */}
              <View style={styles.rightPanel}>
                <ScrollView
                  ref={rightScrollRef}
                  showsVerticalScrollIndicator={false}
                  onScroll={handleRightScroll}
                  scrollEventThrottle={50}
                  onLayout={() => {
                    // Calculate positions for each category section with better accuracy
                    let position = 0;
                    categoryPositions.current = filterData.map((category, index) => {
                      const currentPosition = position;
                      // More accurate calculation: title height + (items * item height) + section padding
                      position += 50 + category.items.length * 45 + 30;
                      return currentPosition;
                    });
                  }}
                >
                  {filterData.map((category, categoryIndex) => (
                    <View key={categoryIndex} style={styles.subcategorySection}>
                      <Text style={styles.subcategoryTitle}>{category.category}</Text>
                      {category.items.map((item, itemIndex) => {
                        const isSelected = selectedFilters[`${categoryIndex}-${itemIndex}`];
                        return (
                          <Pressable
                            key={itemIndex}
                            style={styles.subcategoryItem}
                            onPress={() => handleFilterToggle(categoryIndex, itemIndex)}
                          >
                            <Text style={styles.subcategoryText}>{item}</Text>
                            <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
                              {isSelected && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  ))}
                  {/* Add bottom padding to ensure last category is properly accessible */}
                  <View style={{ height: 100 }} />
                </ScrollView>
              </View>
            </View>

            {/* Bottom Action Buttons */}
            <View style={styles.bottomActions}>
              <Pressable style={styles.clearButton} onPress={clearAllFilters}>
                <Text style={styles.clearText}>Clear All</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.applyText}>
                  Apply {getSelectedCount() > 0 ? `(${getSelectedCount()})` : ''}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </AppScreenWrapper>
  );
};

export default ZomatoFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  openButton: {
    backgroundColor: '#E23744',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterContainer: {
    backgroundColor: 'white',
    height: screenHeight * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeText: {
    fontSize: 20,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    width: screenWidth * 0.35,
    backgroundColor: '#F8F8F8',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedCategory: {
    backgroundColor: 'white',
    borderRightWidth: 3,
    borderRightColor: '#E23744',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#E23744',
    fontWeight: '600',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcategorySection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subcategoryText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#E23744',
    borderColor: '#E23744',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: {
    color: '#E23744',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#E23744',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
