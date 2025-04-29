import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from "../api/auth";
const FindPropertyScreen = ({ navigation }) => {
  const [propertyCode, setPropertyCode] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [propertyError, setPropertyError] = useState('');

  // Mock property details lookup
  const mockPropertyDatabase = {
    '123456': {
      name: 'Akhil PG',
      address: '123, Main Road, City Center',
      type: 'PG/Hostel',
      price: '₹8000/month',
      owner: 'Mr. Sharma',
      contact: '+91-9876543210',
      amenities: 'WiFi, Laundry, Food',
    },
    '654321': {
      name: 'Project ',
      address: '456, Lakeview Street',
      type: 'Apartment',
      price: '₹15,000/month',
      owner: 'Ms. Kapoor',
      contact: '+91-9123456780',
      amenities: 'Gym, Security, Parking',
    },
  };

  // const handleNext = () => {// is 
  //   // Simulate property lookup
  //   if (mockPropertyDatabase[propertyCode]) {
  //     setPropertyDetails(mockPropertyDatabase[propertyCode]);
  //     setPropertyError('');
  //   } else {
  //     setPropertyDetails(null);
  //     setPropertyError('No property found for this code. Please check and try again.');
  //   }
  //   setShowConfirm(true);
  // };

  const handleNext = async () => {
    console.log('Inside handleNext');
  console.log('propertyCode:', propertyCode);

  try {
    //setSubmitting(true);
   // setMessage(null);

     const formData = new FormData();
     formData.append('pgCode', propertyCode.trim());

    console.log('Calling API now...');
    const data = await apiClient('/tenants/isVAlidationPgCode', 'POST', formData);
    console.log('API response:', data);

    if (data.isValid === 'Y') {
      setPropertyDetails(data.pgDetails);
      setPropertyError('');
    } else {
      setPropertyDetails(null);
      setPropertyError('No property found for this code. Please check and try again.');
    }
  } catch (error) {
    console.log('Error during API call:', error);
    if (error.response && error.response.data) {
      setMessage('Error: ' + error.response.data.message);
    } else {
      setMessage('Something went wrong: ' + error.message);
    }
  } finally {
    setShowConfirm(true);
  }
  }

  const handleConfirm = () => {
    setShowConfirm(false);
    navigation.navigate('PersonalDetails', { propertyCode }); // Proceed to next step
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.stepText}>Step 1 of 3</Text>
        <Text style={styles.title}>Find Property</Text>
        <Text style={styles.subtitle}>Ask your landlord for property code.</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            label="PG_ID:"
            value={propertyCode}
            onChangeText={setPropertyCode}
            mode="outlined"
            style={styles.input}
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          disabled={propertyCode.length !== 6}
        >
          Next
        </Button>
        <Modal
          visible={showConfirm}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleCancel} />
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>Confirm the property</Text>
            {propertyDetails ? (
              <View style={styles.propertyCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.propertyName}>{propertyDetails.pg_name}</Text>
                    <Text style={styles.propertyAddress}>{propertyDetails.pg_address}</Text>
                  </View>
                  <MaterialCommunityIcons name="home-city-outline" size={32} color="#6C47FF" style={{ marginLeft: 10 }} />
                </View>
              </View>
            ) : (
              <Text style={styles.errorText}>{propertyError}</Text>
            )}
            <Button
              mode="contained"
              style={styles.confirmButton}
              onPress={handleConfirm}
              disabled={!propertyDetails}
              contentStyle={{ height: 48 }}
              labelStyle={{ fontSize: 16 }}
            >
              Confirm the property
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepText: {
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    padding: 4,
    backgroundColor: '#4A148C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#666',
  },
  propertyCard: {
    backgroundColor: '#F6F2FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 2,
  },
  propertyAddress: {
    color: '#888',
    fontSize: 15,
  },
  confirmButton: {
    backgroundColor: '#4A148C',
    borderRadius: 8,
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default FindPropertyScreen; 