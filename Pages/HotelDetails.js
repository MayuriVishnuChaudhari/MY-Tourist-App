import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  Dimensions,
  Animated
} from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

const HotelDetails = () => {
  const navigation = useNavigation(); 
  const route = useRoute()
  const { hotel } = route.params || {}
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const { width } = Dimensions.get('window')
  const flatListRef = useRef(null)
  
  // Fallback in case hotel data isn't passed
  if (!hotel) {
    return (
      <View style={styles.container}>
        <Text>No hotel data available</Text>
      </View>
    )
  }

  // Create array of images for the carousel
  const hotelImages = hotel.images || [
    hotel.image,
    require('./assets/Hotel.jpg'),
    require('./assets/Hotel1.jpg'),
    require('./assets/Hotel3.jpg')
  ]

  const openMap = () => {
    const { coordinates, name } = hotel;
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates?.latitude || 0},${coordinates?.longitude || 0}&query_place_id=${encodeURIComponent(name)}`;
    
    Linking.openURL(url).catch(err => {
      console.error("Failed to open map:", err);
      alert("Failed to open map app");
    });
  }

  const renderAmenity = ({ item }) => (
    <View style={styles.amenityItem}>
      <Icon name="check-circle" size={16} color="#4CAF50" />
      <Text style={styles.amenityText}>{item}</Text>
    </View>
  )

  const renderImageCarousel = () => (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={hotelImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width)
          setCurrentIndex(newIndex)
        }}
        renderItem={({ item }) => (
          <Image 
            source={typeof item === 'string' ? { uri: item } : item} 
            style={styles.carouselImage} 
            resizeMode="cover"
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      
      {/* Pagination indicators */}
      <View style={styles.pagination}>
        {hotelImages.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>
      
      {/* Image counter */}
      <View style={styles.imageCounter}>
        <Text style={styles.imageCounterText}>
          {currentIndex + 1}/{hotelImages.length}
        </Text>
      </View>
      
      {/* Navigation arrows */}
      {hotelImages.length > 1 && (
        <>
          <TouchableOpacity 
            style={[styles.arrowButton, styles.leftArrow]}
            onPress={() => {
              const newIndex = currentIndex > 0 ? currentIndex - 1 : hotelImages.length - 1
              setCurrentIndex(newIndex)
              flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
            }}
          >
            <Icon name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.arrowButton, styles.rightArrow]}
            onPress={() => {
              const newIndex = currentIndex < hotelImages.length - 1 ? currentIndex + 1 : 0
              setCurrentIndex(newIndex)
              flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
            }}
          >
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel */}
      {renderImageCarousel()}
      
      {/* Basic Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{hotel.location}</Text>
        </View>
        
        <View style={styles.ratingPriceContainer}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
            <Text style={styles.reviewText}>({hotel.reviewCount}+ reviews)</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{hotel.price.toLocaleString()}</Text>
            <Text style={styles.nightText}>/night</Text>
          </View>
        </View>
      </View>
      
      {/* Divider */}
      <View style={styles.divider} />
      
      {/* Description Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {hotel.description || `Experience luxury at its finest at ${hotel.name}. Located in the heart of ${hotel.location}, 
          this hotel offers world-class amenities and services. ${hotel.name} features elegantly 
          designed rooms with modern amenities, multiple dining options, and exceptional service 
          to make your stay memorable.`}
        </Text>
      </View>
      
      {/* Amenities Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <FlatList
          data={hotel.amenities || ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Air Conditioning', '24/7 Front Desk', 'Room Service']}
          renderItem={renderAmenity}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.amenitiesGrid}
        />
      </View>
      
      {/* Location Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity style={styles.mapButton} onPress={openMap}>
          <Icon name="map" size={20} color="#fff" />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </View>
      
      {/* Booking Button */}
      <TouchableOpacity 
        style={styles.bookButton} 
        onPress={() => navigation.navigate('BookingFormScreen', { 
          hotel: {
            ...hotel,
            checkIn: '15 Aug, Fri',
            checkOut: '16 Aug, Sat',
            nights: 1,
            guests: 2
          }
        })}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  carouselContainer: {
    height: 250,
    width: '100%',
    position: 'relative'
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#FFD700',
    width: 16,
  },
  imageCounter: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 12
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftArrow: {
    left: 10
  },
  rightArrow: {
    right: 10
  },
  infoContainer: {
    padding: 20
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 10,
    color: '#333'
  },
  reviewText: {
    fontSize: 14,
    color: '#666'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff'
  },
  nightText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5
  },
  divider: {
    height: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 10
  },
  sectionContainer: {
    paddingHorizontal: 20,
    // paddingVertical: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555'
  },
  amenitiesGrid: {
    justifyContent: 'space-between'
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12
  },
  amenityText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    marginTop: 10
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  bookButton: {
    backgroundColor: '#23918bff',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: 'center'
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default HotelDetails