import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-picker/picker'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

const BookingFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { hotel } = route.params || {}
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState(hotel?.guests?.toString() || '2')
  const [roomType, setRoomType] = useState(hotel?.roomTypes?.[0] || 'STANDARD ROOM NON AC')
  const [showRoomTypePicker, setShowRoomTypePicker] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const roomTypes = hotel?.roomTypes || [
    'STANDARD ROOM NON AC',
    'DELUXE ROOM',
    'EXECUTIVE SUITE',
    'FAMILY ROOM'
  ]

  const handleConfirmBooking = () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    setShowSuccessModal(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Booking Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Booking</Text>
          <Text style={styles.dateText}>
            {hotel?.checkIn || '15 Aug, Fri'} - {hotel?.checkOut || '16 Aug, Sat'}, 
            1 Bed, {guests} Adults
          </Text>
        </View>

        {/* Hotel Info Section */}
        <View style={styles.hotelInfoContainer}>
          {hotel?.image && (
            <Image 
              source={typeof hotel.image === 'string' ? { uri: hotel.image } : hotel.image}
              style={styles.hotelImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.hotelName}>{hotel?.name || 'ASIA LODGE'}</Text>
          <Text style={styles.hotelLocation}>{hotel?.location || 'Chhatrapati Sambhajinagar'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{hotel?.rating || '3.4'}/5</Text>
            <Text style={styles.reviewsText}>
              {hotel?.reviews || '325'} ratings and {hotel?.reviewCount || '136'} reviews
            </Text>
          </View>
        </View>

        {/* Stay Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{hotel?.checkIn || '15 Aug, Fri'}</Text>
            <Text style={styles.detailValue}>11 AM</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{hotel?.nights || '1'} Night</Text>
            <Text style={styles.detailValue}>{hotel?.checkOut || '16 Aug, Sat'} 11 AM</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>1 Bed, {guests} Adults</Text>
          </View>
        </View>

        {/* Room Details */}
        <View style={styles.roomContainer}>
          <Text style={styles.roomType}>{roomType}</Text>
          <Text style={styles.roomCapacity}>Sleeps {guests} Adults</Text>
          <View style={styles.roomFeatures}>
            <Text style={styles.roomFeature}>Bed Only</Text>
            <Text style={styles.roomFeature}>× Non-Refundable</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewDetailsText}>View Room & Plan Details</Text>
          </TouchableOpacity>
        </View>

        {/* Property Rules */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>Property Rules and Policies</Text>
          <View style={styles.ruleItem}>
            <Icon name="check" size={16} color="#666" />
            <Text style={styles.ruleText}>Primary Guest should be atleast 18 years of age.</Text>
          </View>
          <View style={styles.ruleItem}>
            <Icon name="check" size={16} color="#666" />
            <Text style={styles.ruleText}>Unmarried couples are not allowed</Text>
          </View>
          <View style={styles.ruleItem}>
            <Icon name="check" size={16} color="#666" />
            <Text style={styles.ruleText}>Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)</Text>
          </View>
          <View style={styles.ruleItem}>
            <Icon name="check" size={16} color="#666" />
            <Text style={styles.ruleText}>Pets are not allowed</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllRulesText}>View all rules and policies</Text>
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price Summary</Text>
          <TouchableOpacity style={styles.viewBreakupButton}>
            <Text style={styles.viewBreakupText}>View Full Break-up</Text>
          </TouchableOpacity>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Price</Text>
            <Text style={styles.priceValue}>₹{hotel?.price?.toLocaleString() || '1,350'}</Text>
          </View>
          <Text style={styles.priceSubtext}>1 bed x {hotel?.nights || '1'} night</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Discount</Text>
            <Text style={[styles.priceValue, styles.discountText]}>-₹633</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price after Discount</Text>
            <Text style={styles.priceValue}>₹717</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & Service Fees</Text>
            <Text style={styles.priceValue}>₹173</Text>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount to be paid</Text>
            <Text style={styles.totalSubtext}>Includes taxes and fees</Text>
          </View>
          
          <TouchableOpacity style={styles.goCashButton}>
            <Text style={styles.goCashText}>Use 200 goCash for this trip</Text>
            <Text style={styles.goCashSubtext}>Save more by using your goCash</Text>
          </TouchableOpacity>
        </View>

        {/* Offers Section */}
        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>Offers</Text>
          <View style={styles.offerItem}>
            <Text style={styles.offerName}>GOIBIBO</Text>
            <Text style={styles.offerDescription}>Savings unlocked! Complete your booking now.</Text>
            <View style={styles.offerAction}>
              <Text style={styles.offerDiscount}>-₹114</Text>
              <TouchableOpacity>
                <Text style={styles.offerRemove}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Booking Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Traveller Details</Text>
          
          <Text style={styles.inputLabel}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={'#000'}
            value={name}
            onChangeText={setName}
          />
          
          <Text style={styles.inputLabel}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor={'#000'}
            value={email}
            onChangeText={setEmail}
          />
          
          <Text style={styles.inputLabel}>Number of guests *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={guests}
              onValueChange={(itemValue) => setGuests(itemValue)}
              style={styles.picker}
            placeholderTextColor={'#000'}

            >
              {[1, 2, 3, 4].map(num => (
                <Picker.Item key={num} label={`${num}`} value={`${num}`} />
              ))}
            </Picker>
          </View>
          
          <Text style={styles.inputLabel}>Room type *</Text>
          <TouchableOpacity 
            style={styles.pickerInput}
            onPress={() => setShowRoomTypePicker(true)}
          >
            <Text style={styles.pickerInputText}>{roomType}</Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Final Price Display */}
        <View style={styles.finalPriceContainer}>
          <Text style={styles.finalPrice}>
            <Text style={styles.discountedPrice}>₹890</Text>
            <Text style={styles.originalPrice}> ₹{hotel?.price?.toLocaleString() || '1,350'}</Text>
          </Text>
          <Text style={styles.finalPriceSubtext}>
            for 1 Bed {hotel?.nights || '1'} Night • Incl. of ₹173 taxes & fees
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      {/* Room Type Picker Modal */}
      <Modal
        visible={showRoomTypePicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowRoomTypePicker(false)}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={roomType}
              onValueChange={(itemValue) => {
                setRoomType(itemValue)
                setShowRoomTypePicker(false)
              }}
            >
              {roomTypes.map(type => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
       <View style={styles.successModalContainer}>
  <View style={styles.successModalContent}>
    <Icon name="check-circle" size={60} color="#4CAF50" />
    <Text style={styles.successModalTitle}>Booking Confirmed!</Text>
    <Text style={styles.successModalText}>
      Your booking at {hotel?.name || 'ASIA LODGE'} for {hotel?.checkIn || '15 Aug'} - {hotel?.checkOut || '16 Aug'} has been confirmed.
    </Text>
    <Text style={styles.successModalText}>
      A confirmation has been sent to {email}
    </Text>
    <TouchableOpacity 
      style={styles.successModalButton}
      onPress={() => {
        setShowSuccessModal(false);
        navigation.navigate('Home'); // Add this line
      }}
    >
      <Text style={styles.successModalButtonText}>OK</Text>
    </TouchableOpacity>
  </View>
</View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  hotelInfoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hotelImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hotelLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  roomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roomType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  roomCapacity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  roomFeatures: {
    flexDirection: 'row',
    marginTop: 8,
  },
  roomFeature: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 8,
    fontWeight: 'bold',
  },
  rulesContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  viewAllRulesText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 8,
    fontWeight: 'bold',
  },
  priceContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  viewBreakupButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  viewBreakupText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  discountText: {
    color: '#4CAF50',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    marginLeft: 16,
  },
  totalContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  goCashButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  goCashText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  goCashSubtext: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 4,
  },
  offersContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  offerItem: {
    marginBottom: 12,
  },
  offerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  offerAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  offerDiscount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  offerRemove: {
    fontSize: 14,
    color: '#f44336',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color:'#000'
  },
  pickerContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  pickerInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  pickerInputText: {
    fontSize: 16,
    color: '#333',
  },
  finalPriceContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  discountedPrice: {
    color: '#333',
  },
  originalPrice: {
    color: '#999',
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  finalPriceSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#23918bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#23918bff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
  },
  modalCloseButton: {
    padding: 16,
    alignItems: 'flex-end',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#fefefeff',
    fontWeight: 'bold',
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  successModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  successModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  successModalButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  successModalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default BookingFormScreen