    import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    FlatList,
    TextInput,
    Modal,
    Linking
    } from 'react-native'
    import React, { useState, useEffect } from 'react'
    import Icon from 'react-native-vector-icons/MaterialIcons'
    import { useRoute } from '@react-navigation/native'
    import { useNavigation } from '@react-navigation/native';

    const ListOfHotels = () => {
        const navigation = useNavigation();
    const route = useRoute()
    const { city, checkInDate, checkOutDate } = route.params || {}
    
    const [hotels, setHotels] = useState([])
    const [filteredHotels, setFilteredHotels] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [minRating, setMinRating] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedHotelForMap, setSelectedHotelForMap] = useState(null)

    // Sample hotel data with local images
    useEffect(() => {
    const sampleHotels = [
        {
            id: 1,
            name: 'Taj Mahal Palace',
            image: require('./assets/Hotel6.jpg'),
            price: 15000,
            rating: 4.8,
            location: 'Colaba, Mumbai',
            amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'],
            coordinates: { latitude: 18.9217, longitude: 72.8332 }
        },
        {
            id: 2,
            name: 'Trident Nariman Point',
            image: require('./assets/Hotel2.jpg'),
            price: 12000,
            rating: 4.5,
            location: 'Nariman Point, Mumbai',
            amenities: ['Beach View', 'Bar', 'Gym'],
            coordinates: { latitude: 18.9260, longitude: 72.8226 }
        },
        {
            id: 3,
            name: 'JW Marriott',
            image: require('./assets/Hotel3.jpg'),
            price: 1000,
            rating: 4.6,
            location: 'Juhu, Mumbai',
            amenities: ['Luxury Spa', 'Multiple Dining', 'Conference Hall'],
            coordinates: { latitude: 19.0974, longitude: 72.8262 }
        },
        {
            id: 4,
            name: 'The Orchid Hotel',
            image: require('./assets/Hotel4.jpg'),
            price: 7500,
            rating: 4.2,
            location: 'Vile Parle, Mumbai',
            amenities: ['Airport Shuttle', 'Business Center', 'Pool'],
            coordinates: { latitude: 19.0989, longitude: 72.8426 }
        },
        {
            id: 5,
            name: 'Novotel Mumbai',
            image: require('./assets/Hotel5.jpg'),
            price: 8500,
            rating: 4.3,
            location: 'Juhu Beach, Mumbai',
            amenities: ['Kids Club', 'Beach Access', 'Bar'],
            coordinates: { latitude: 19.1075, longitude: 72.8263 }
        },
        {
            id: 6,
            name: 'The Leela Palace',
            image: require('./assets/Hotel6.jpg'),
            price: 18000,
            rating: 4.9,
            location: 'Sahar, Mumbai',
            amenities: ['Private Beach', 'Butler Service', 'Fine Dining'],
            coordinates: { latitude: 19.0984, longitude: 72.8621 }
        },
        {
            id: 7,
            name: 'ITC Maratha',
            image: require('./assets/Hotel7.jpg'),
            price: 11000,
            rating: 4.4,
            location: 'Andheri East, Mumbai',
            amenities: ['Ayurvedic Spa', 'Golf Course', 'Business Lounge'],
            coordinates: { latitude: 19.1162, longitude: 72.8647 }
        },
        {
            id: 8,
            name: 'Grand Hyatt',
            image: require('./assets/Hotel8.jpg'),
            price: 13000,
            rating: 4.7,
            location: 'Santacruz East, Mumbai',
            amenities: ['Rooftop Pool', '24/7 Gym', 'Conference Facilities'],
            coordinates: { latitude: 19.0760, longitude: 72.8777 }
        },
        {
            id: 9,
            name: 'The St. Regis',
            image: require('./assets/Hotel9.jpg'),
            price: 20000,
            rating: 4.9,
            location: 'Lower Parel, Mumbai',
            amenities: ['Luxury Suites', 'Personal Butler', 'Chauffeur Service'],
            coordinates: { latitude: 19.0166, longitude: 72.8281 }
        },
        {
            id: 10,
            name: 'Four Seasons',
            image: require('./assets/Hotel10.png'),
            price: 17000,
            rating: 4.8,
            location: 'Worli, Mumbai',
            amenities: ['Sea View', 'Infinity Pool', 'Michelin-star Restaurant'],
            coordinates: { latitude: 19.0175, longitude: 72.8211 }
        },
        {
            id: 11,
            name: 'The Oberoi',
            image: require('./assets/Hotel11.jpg'),
            price: 16000,
            rating: 4.7,
            location: 'Nariman Point, Mumbai',
            amenities: ['Private Balconies', 'Yacht Service', 'Art Gallery'],
            coordinates: { latitude: 18.9237, longitude: 72.8224 }
        },
        {
            id: 12,
            name: 'Radisson Blu',
            image: require('./assets/Hotel3.jpg'),
            price: 9000,
            rating: 4.1,
            location: 'Andheri West, Mumbai',
            amenities: ['Airport Proximity', 'Free Parking', 'Business Center'],
            coordinates: { latitude: 19.1197, longitude: 72.8464 }
        },
        {
            id: 13,
            name: 'Hilton Mumbai',
            image: require('./assets/Hotel2.jpg'),
            price: 9500,
            rating: 4.2,
            location: 'Powai, Mumbai',
            amenities: ['Lake View', 'Kids Play Area', 'Coffee Shop'],
            coordinates: { latitude: 19.1176, longitude: 72.9060 }
        },
        {
            id: 14,
            name: 'Lemon Tree Premier',
            image: require('./assets/Hotel1.jpg'),
            price: 7000,
            rating: 4.0,
            location: 'Andheri East, Mumbai',
            amenities: ['Budget Friendly', 'Free Breakfast', 'Pet Friendly'],
            coordinates: { latitude: 19.1209, longitude: 72.8768 }
        },
        {
            id: 15,
            name: 'Courtyard by Marriott',
            image: require('./assets/Hotel5.jpg'),
            price: 8500,
            rating: 4.3,
            location: 'Goregaon East, Mumbai',
            amenities: ['Shopping Mall Access', 'Swimming Pool', 'Fitness Center'],
            coordinates: { latitude: 19.1646, longitude: 72.8526 }
        }]
        
        setHotels(sampleHotels)
        setFilteredHotels(sampleHotels)
    }, [])

    // Filter hotels based on criteria
    useEffect(() => {
        let results = hotels.filter(hotel => 
        hotel.price >= priceRange[0] && 
        hotel.price <= priceRange[1] && 
        hotel.rating >= minRating &&
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        
        setFilteredHotels(results)
    }, [priceRange, minRating, searchQuery, hotels])

    const openMap = (hotel) => {
        const { coordinates, name } = hotel;
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}&query_place_id=${encodeURIComponent(name)}`;
        
        Linking.openURL(url).catch(err => {
        console.error("Failed to open map:", err);
        alert("Failed to open map app");
        });
    }

    const renderHotelItem = ({ item }) => (
        <View style={styles.hotelCard}>
        {/* Advertisement after 2nd hotel */}
        {item.id === 3 && (
            <View style={styles.adBanner}>
            <Text style={styles.adText}>Special Offer! Book 3 nights get 1 free</Text>
            </View>
        )}
        
        <Image source={item.image} style={styles.hotelImage} />
        <View style={styles.hotelDetails}>
            <Text style={styles.hotelName}>{item.name}</Text>
            <Text style={styles.hotelLocation}>{item.location}</Text>
            
            <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            
            <View style={styles.amenitiesContainer}>
            {item.amenities.slice(0, 3).map((amenity, index) => (
                <Text key={index} style={styles.amenityText}>• {amenity}</Text>
            ))}
            </View>
            
            <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{item.price.toLocaleString()}</Text>
            <Text style={styles.nightText}>/night</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => openMap(item)}
                >
                <Icon name="map" size={16} color="#fff" />
                <Text style={styles.mapButtonText}>View Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('HotelDetails', { hotel: item })}>
                <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    )

    return (
        <View style={styles.container}>
        {/* Goibibo-like Banner */}
        <View style={styles.banner}>
            <Image 
            source={require('./assets/Hotel.jpg')} 
            style={styles.bannerImage} 
            />
        </View>
        
        {/* Search and Filter Bar */}
        <View style={styles.searchBar}>
            <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
                placeholder={`Search hotels in ${city || 'Mumbai'}...`}
                placeholderTextColor={'#000'}
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            </View>
            <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
            >
            <Icon name="tune" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
        
        {/* Results Count */}
        <Text style={styles.resultsText}>
            {filteredHotels.length} hotels found for {formatDate(checkInDate)} - {formatDate(checkOutDate)}
        </Text>
        
        {/* Hotels List */}
        <FlatList
            data={filteredHotels}
            renderItem={renderHotelItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
        />
        
        {/* Filters Modal */}
        <Modal visible={showFilters} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                    <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
                </View>
                
                <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Price Range (₹)</Text>
                <View style={styles.priceRangeContainer}>
                    <Text>₹{priceRange[0].toLocaleString()}</Text>
                    <Text> - </Text>
                    <Text>₹{priceRange[1].toLocaleString()}</Text>
                </View>
                <View style={styles.sliderContainer}>
                    <TouchableOpacity 
                    style={styles.sliderButton}
                    onPress={() => setPriceRange([0, 5000])}
                    >
                    <Text>Budget (0-5k)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.sliderButton}
                    onPress={() => setPriceRange([5000, 10000])}
                    >
                    <Text>Standard (5-10k)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.sliderButton}
                    onPress={() => setPriceRange([10000, 20000])}
                    >
                    <Text>Premium (10k+)</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
                <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Minimum Rating</Text>
                <View style={styles.ratingFilterContainer}>
                    {[0, 3, 4, 4.5].map(rating => (
                    <TouchableOpacity
                        key={rating}
                        style={[
                        styles.ratingButton,
                        minRating === rating && styles.ratingButtonSelected
                        ]}
                        onPress={() => setMinRating(rating)}
                    >
                        <Text style={styles.ratingButtonText}>
                        {rating === 0 ? 'Any' : `${rating}+`}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
                
                <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
                >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        </View>
    )
    }

    // Helper function to format date
    const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    banner: {
        height: 120,
        width: '100%'
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    searchBar: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10
    },
    searchIcon: {
        marginRight: 8
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 14
    },
    filterButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        marginLeft: 10
    },
    resultsText: {
        padding: 15,
        fontSize: 14,
        color: '#666',
        backgroundColor: '#fff'
    },
    listContent: {
        paddingBottom: 20
    },
    hotelCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    hotelImage: {
        width: '100%',
        height: 180
    },
    hotelDetails: {
        padding: 15
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    hotelLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333'
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    amenityText: {
        fontSize: 12,
        color: '#666',
        marginRight: 10
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff'
    },
    nightText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 10
    },
    mapButtonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5
    },
    bookButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    adBanner: {
        backgroundColor: '#FF5722',
        padding: 10,
        alignItems: 'center'
    },
    adText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#12b29aff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        maxHeight: '80%'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    filterSection: {
        marginBottom: 25
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    priceRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sliderButton: {
        backgroundColor: '#0a6c6eff',
        padding: 10,
        borderRadius: 8,
        width: '30%',
        alignItems: 'center',
    },
    ratingFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15
    },
    ratingButtonSelected: {
        backgroundColor: '#eeeeeeff',
        borderColor: '#007bff'
    },
    ratingButtonText: {
        color: '#333'
    },
    ratingButtonSelectedText: {
        color: '#fff'
    },
    applyButton: {
        backgroundColor: '#1a828eff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 20
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
    })

    export default ListOfHotels