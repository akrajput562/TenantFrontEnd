import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import apiClient from "../api/auth";
const PersonalDetailsScreen = ({ navigation ,route }) => {
  const { propertyCode } = route.params;
  console.log(propertyCode)
  const [formData, setFormData] = useState({
    tenantName: '',
    dateOfBirth: '',
    mobileNumber: '',
    fatherName: '',
    fatherMobileNumber: '',
    adharCard: null,
    companyId: null,
    pgOkCode: propertyCode,
    email:''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pickImage = async (field) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        handleInputChange(field, result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Error picking image. Please try again.');
    }
  };

  const handleSubmit = async () => {
    const submissionData = new FormData();

    // Append text fields
    submissionData.append('tenantName', formData.tenantName);
    //submissionData.append('dateOfBirth', formData.dateOfBirth); // Should be in yyyy-MM-dd format
    submissionData.append('mobileNumber', formData.mobileNumber);
    submissionData.append('fatherName', formData.fatherName);
    submissionData.append('fatherMobileNumber', formData.fatherMobileNumber);
    submissionData.append('pgOkCode', formData.pgOkCode);
    submissionData.append('email', formData.email);
  
    // Append file fields only if selected
    if (formData.adharCard) {
      submissionData.append('adharCard', {
        uri: formData.adharCard.uri,
        type: formData.adharCard.type || 'image/jpeg',
        name: formData.adharCard.fileName || 'adharCard.jpg',
      });
    }
  
    if (formData.companyId) {
      submissionData.append('companyId', {
        uri: formData.companyId.uri,
        type: formData.companyId.type || 'image/jpeg',
        name: formData.companyId.fileName || 'companyId.jpg',
      });
    }
    console.log('Form submitted:', formData);
     const data = await apiClient('/tenants/registerTenant', 'POST', submissionData);
        console.log('API response:', data);
        const reqId = data.reqId;
    navigation.navigate('TermsAgreement',{reqId});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.stepText}>Step 2 of 3</Text>
      <Text style={styles.title}>Personal details</Text>
      <Text style={styles.subtitle}>To get your request accepted, kindly enter correct details.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="tenantName"
          value={formData.tenantName}
          onChangeText={(value) => handleInputChange('tenantName', value)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
      label="Email"
      value={formData.email}
      onChangeText={(value) => handleInputChange('email', value)}
      mode="outlined"
      style={styles.input}
      keyboardType="email-address"
       autoCapitalize="none"
/>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            label="Date of Birth"
            value={formData.dateOfBirth}
            mode="outlined"
            style={styles.input}
            editable={false}
            right={<TextInput.Icon icon="calendar" />}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={formData.dateOfBirth ? new Date(formData.dateOfBirth) : datePickerValue}
          maximumDate={new Date()}
          onConfirm={(selectedDate) => {
            setShowDatePicker(false);
            setDatePickerValue(selectedDate);
            handleInputChange('dateOfBirth', selectedDate.toISOString().split('T')[0]);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        <TextInput
          label="Mobile Number"
          value={formData.mobileNumber}
          onChangeText={(value) => handleInputChange('mobileNumber', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <TextInput
          label="Father's tenantName"
          value={formData.fatherName}
          onChangeText={(value) => handleInputChange('fatherName', value)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Father's Mobile Number"
          value={formData.fatherMobileNumber}
          onChangeText={(value) => handleInputChange('fatherMobileNumber', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Aadhar Card Upload</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickImage('adharCard')}
          >
            <Text style={styles.uploadButtonText}>
              {formData.adharCard ? 'Change Aadhar Card' : 'Upload Aadhar Card'}
            </Text>
          </TouchableOpacity>
          {formData.adharCard && (
            <Image 
              source={{ uri: formData.adharCard }} 
              style={styles.previewImage} 
            />
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Company ID Card Upload</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickImage('companyId')}
          >
            <Text style={styles.uploadButtonText}>
              {formData.companyId ? 'Change Company ID' : 'Upload Company ID'}
            </Text>
          </TouchableOpacity>
          {formData.companyId && (
            <Image 
              source={{ uri: formData.companyId }} 
              style={styles.previewImage} 
            />
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          Next
        </Button>
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
  uploadContainer: {
    marginBottom: 16,
  },
  uploadLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  uploadButton: {
    backgroundColor: '#4A148C',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 4,
  },
  button: {
    padding: 4,
    backgroundColor: '#4A148C',
    marginTop: 16,
  },
});

export default PersonalDetailsScreen; 