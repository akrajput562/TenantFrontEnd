import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const ConfirmPropertyScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    pgId: '',
    propertyName: '',
    propertyAddress: '',
    propertyType: '',
    propertyDescription: '',
    propertyImage: '',
    propertyAmenities: '',
    propertyRules: '',
    propertyContact: '',
    propertyEmail: '',
    propertyWebsite: '',
    propertySocialMedia: '',
    propertyLocation: '',
    propertyMap: '',
    propertyVideo: '',
    propertyDocuments: '',
    propertyReviews: '',
    propertyRating: '',
    propertyPrice: '',
    propertyAvailability: '',
    propertyStatus: '',
    propertyOwner: '',
    propertyManager: '',
    propertyStaff: '',
    propertySecurity: '',
    propertyMaintenance: '',
    propertyCleaning: '',
    propertyLaundry: '',
    propertyFood: '',
    propertyTransport: '',
    propertyParking: '',
    propertyWifi: '',
    propertyPower: '',
    propertyWater: '',
    propertyGas: '',
    propertyTV: '',
    propertyAC: '',
    propertyHeater: '',
    propertyFan: '',
    propertyBed: '',
    propertyMattress: '',
    propertyPillow: '',
    propertyBlanket: '',
    propertySheet: '',
    propertyTowel: '',
    propertyToiletries: '',
    propertyKitchen: '',
    propertyFridge: '',
    propertyMicrowave: '',
    propertyStove: '',
    propertyUtensils: '',
    propertyDining: '',
    propertyLiving: '',
    propertyStudy: '',
    propertyGym: '',
    propertyPool: '',
    propertyGarden: '',
    propertyTerrace: '',
    propertyBalcony: '',
    propertyLift: '',
    propertyStairs: '',
    propertyFire: '',
    propertyCCTV: '',
    propertyGuard: '',
    propertyLock: '',
    propertySafe: '',
    propertyInsurance: '',
    propertyTax: '',
    propertyLegal: '',
    propertyOther: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // In a real app, we would submit this data to an API
    console.log('Form submitted:', formData);
  };

  const handlePgIdSubmit = () => {
    if (formData.pgId) {
      setShowConfirmation(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.stepText}>Step 1 of 3</Text>
      <Text style={styles.title}>Property details</Text>
      <Text style={styles.subtitle}>To get your request accepted, kindly enter correct details.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="PG ID"
          value={formData.pgId}
          onChangeText={(value) => handleInputChange('pgId', value)}
          mode="outlined"
          style={styles.input}
          placeholder="Enter your PG ID"
        />

        {showConfirmation && (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationTitle}>Property Confirmation</Text>
            <Text style={styles.confirmationText}>
              Please confirm the following property details:
            </Text>
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyDetail}>Property Name: Sample PG</Text>
              <Text style={styles.propertyDetail}>Address: 123 Main Street</Text>
              <Text style={styles.propertyDetail}>Type: Co-living Space</Text>
              <Text style={styles.propertyDetail}>Available Rooms: 5</Text>
            </View>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('PersonalDetails')}
              style={styles.confirmButton}
            >
              Confirm Property
            </Button>
          </View>
        )}

        {!showConfirmation && (
          <Button
            mode="contained"
            onPress={handlePgIdSubmit}
            style={styles.button}
          >
            Verify PG ID
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    gap: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    padding: 4,
    backgroundColor: '#4A148C',
    marginBottom: 24,
  },
  confirmationContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  confirmationText: {
    color: '#666',
    marginBottom: 16,
  },
  propertyDetails: {
    marginBottom: 16,
  },
  propertyDetail: {
    marginBottom: 8,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginTop: 8,
  },
});

export default ConfirmPropertyScreen; 