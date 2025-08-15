import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [currentDateType, setCurrentDateType] = useState('checkIn');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const scrollViewRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  
  // Banner images
  const bannerImages = [
    { uri: require('./assets/Hotel1.jpg') },
    { uri: require('./assets/Hotel2.jpg') },
    { uri: require('./assets/Hotel3.jpg') },
  ];

  const maharashtraCities = [
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur',
    'Amravati', 'Kolhapur', 'Sangli', 'Jalgaon', 'Akola', 'Latur',
    'Ahmednagar', 'Chandrapur', 'Parbhani', 'Malegaon', 'Jalna',
    'Bhusawal', 'Nanded', 'Satara'
  ];

  const categories = [
    { name: 'Hotels', icon: 'hotel' },
    { name: 'Trains', icon: 'train' },
  ];

  const offers = [
    { id: 1, title: 'VIP HOTEL', subtitle: 'Industrial Area', discount: '52% OFF' },
    { id: 2, title: 'LUXURY RESORT', subtitle: 'Beach Front', discount: '45% OFF' },
    { id: 3, title: 'MOUNTAIN VIEW', subtitle: 'Hill Station', discount: '38% OFF' },
  ];

  const filteredCities = maharashtraCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Generate days for the current month
  const generateDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    
    return days;
  };

  const days = generateDays();

  // Format date as "15 Jan 2023"
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Handle month navigation
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (currentDateType === 'checkIn') {
      setCheckInDate(date);
      // Auto-set checkout to next day
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    } else {
      setCheckOutDate(date);
    }
    setShowCalendarModal(false);
  };

  // Open calendar modal
  const openCalendar = (type) => {
    setCurrentDateType(type);
    const dateToShow = type === 'checkIn' ? checkInDate : checkOutDate;
    setCurrentMonth(dateToShow.getMonth());
    setCurrentYear(dateToShow.getFullYear());
    setShowCalendarModal(true);
  };

  // Handle book now action
  const handleBookNow = () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    navigation.navigate('ListOfHotels', {
      city: selectedCity,
      checkInDate,
      checkOutDate
    });
  };

  // Auto-scroll banner effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % bannerImages.length;
      setCurrentBannerIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Main content with ScrollView */}
      <View style={styles.contentContainer}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
         

          {/* Image Banner */}
          <View style={styles.bannerContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={(event) => {
                const contentOffset = event.nativeEvent.contentOffset;
                const viewSize = event.nativeEvent.layoutMeasurement;
                const pageNum = Math.floor(contentOffset.x / viewSize.width);
                setCurrentBannerIndex(pageNum);
              }}
            >
              {bannerImages.map((image, index) => (
                <Image
                  key={index}
                  source={image.uri}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.bannerPagination}>
              {bannerImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentBannerIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>

        

          {/* Booking Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Book Your Stay</Text>
            <TouchableOpacity 
              style={styles.cityInputContainer}
              onPress={() => setShowCityModal(true)}
            >
              <Icon name="location-on" size={20} color="#23918bff" />
              <Text style={styles.cityInputText}>
                {selectedCity || 'Select city in Maharashtra'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>Check-in</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => openCalendar('checkIn')}
              >
                <Icon name="calendar-today" size={20} color="#23918bff" />
                <View style={styles.dateTimeTextContainer}>
                  <Text style={styles.dateText}>{formatDate(checkInDate)}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>Check-out</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => openCalendar('checkOut')}
              >
                <Icon name="calendar-today" size={20} color="#23918bff" />
                <View style={styles.dateTimeTextContainer}>
                  <Text style={styles.dateText}>{formatDate(checkOutDate)}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.bookNowButton}
              onPress={handleBookNow}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* Live Deals */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>LIVE : Hotel Deals!</Text>
              <Text style={styles.discountText}>Up to 52% OFF*</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offers.map((offer) => (
                <View key={offer.id} style={styles.dealCard}>
                  <View style={styles.dealBadge}>
                    <Text style={styles.dealBadgeText}>{offer.discount}</Text>
                  </View>
                  <Text style={styles.dealTitle}>{offer.title}</Text>
                  <Text style={styles.dealSubtitle}>{offer.subtitle}</Text>
                  <Text style={styles.dealBank}>YES BANK</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Offers For You */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Offers For You</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabs}>
              <Text style={[styles.tab, styles.activeTab]}>All</Text>
              <Text style={styles.tab}>Bank Offers</Text>
              <Text style={styles.tab}>Flights</Text>
              <Text style={styles.tab}>Hotels</Text>
              <Text style={styles.tab}>Cabs</Text>
              <Text style={styles.tab}>Bus</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Sticky Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#23918bff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="card-travel" size={24} color="#666" />
          <Text style={styles.navText}>My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="sync" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="card-membership" size={24} color="#666" />
          <Text style={styles.navText}>Go Pass</Text>
        </TouchableOpacity>
      </View>

      {/* City Selection Modal */}
      <Modal
        visible={showCityModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search cities..."
                value={citySearch}
                onChangeText={setCitySearch}
                autoFocus={true}
              />
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => {
                    setSelectedCity(item);
                    setShowCityModal(false);
                    setCitySearch('');
                  }}
                >
                  <Text style={styles.cityItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendarModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Icon name="chevron-left" size={24} color="#23918bff" />
              </TouchableOpacity>
              
              <Text style={styles.monthText}>
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </Text>
              
              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Icon name="chevron-right" size={24} color="#23918bff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.weekDays}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Text key={day} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>
            
            <View style={styles.daysContainer}>
              {days.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    date && date.getDate() === (currentDateType === 'checkIn' ? checkInDate.getDate() : checkOutDate.getDate()) && 
                    date.getMonth() === (currentDateType === 'checkIn' ? checkInDate.getMonth() : checkOutDate.getMonth()) && 
                    date.getFullYear() === (currentDateType === 'checkIn' ? checkInDate.getFullYear() : checkOutDate.getFullYear()) &&
                    styles.selectedDay,
                    !date && styles.emptyDay
                  ]}
                  onPress={() => date && handleDateSelect(date)}
                  disabled={!date}
                >
                  {date && (
                    <Text style={[
                      styles.dayText,
                      date.getDate() === (currentDateType === 'checkIn' ? checkInDate.getDate() : checkOutDate.getDate()) && 
                      date.getMonth() === (currentDateType === 'checkIn' ? checkInDate.getMonth() : checkOutDate.getMonth()) && 
                      date.getFullYear() === (currentDateType === 'checkIn' ? checkInDate.getFullYear() : checkOutDate.getFullYear()) &&
                      styles.selectedDayText
                    ]}>
                      {date.getDate()}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendarModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dealBanner: {
    backgroundColor: '#23918bff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  dealText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  exploreText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  dealTag: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dealTagText: {
    backgroundColor: '#fff',
    color: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 5,
    fontWeight: 'bold',
  },
  saleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  bannerContainer: {
    height: 180,
    width: '100%',
    marginBottom: 15,
  },
  bannerImage: {
    width: Dimensions.get('window').width,
    height: 180,
  },
  bannerPagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  discountText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007bff',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 20,
    width: 70,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  cityInputText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dateSection: {
    marginBottom: 20,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dateTimeTextContainer: {
    marginLeft: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  bookNowButton: {
    backgroundColor: '#23918bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  bookNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dealCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dealBadge: {
    backgroundColor: '#ff6b6b',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
  dealBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dealSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dealBank: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#666',
  },
  activeTab: {
    backgroundColor: '#23918bff',
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityItemText: {
    fontSize: 16,
    color: '#333',
  },
  // Calendar styles
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'

  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color:'#000'

  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#000'

  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color:'#000'

  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 20,
    color:'#000'

  },
  dayText: {
    fontSize: 16,
    color:'#000'

  },
  selectedDay: {
    backgroundColor: '#23918bff',
    color:'#000'

  },
  selectedDayText: {
    // color: 'white',
    color:'#000'

  },
  emptyDay: {
    backgroundColor: 'transparent',
    color:'#000'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#23918bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;