import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PersonalDetailsScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    mobileNumber: '',
    fatherName: '',
    fatherNumber: '',
    aadharCard: null,
    companyIdCard: null
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

  const handleSubmit = () => {
    // In a real app, we would submit this data to an API
    console.log('Form submitted:', formData);
    navigation.navigate('TermsAgreement');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.stepText}>Step 2 of 3</Text>
      <Text style={styles.title}>Personal details</Text>
      <Text style={styles.subtitle}>To get your request accepted, kindly enter correct details.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          mode="outlined"
          style={styles.input}
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
          label="Father's Name"
          value={formData.fatherName}
          onChangeText={(value) => handleInputChange('fatherName', value)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Father's Mobile Number"
          value={formData.fatherNumber}
          onChangeText={(value) => handleInputChange('fatherNumber', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Aadhar Card Upload</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickImage('aadharCard')}
          >
            <Text style={styles.uploadButtonText}>
              {formData.aadharCard ? 'Change Aadhar Card' : 'Upload Aadhar Card'}
            </Text>
          </TouchableOpacity>
          {formData.aadharCard && (
            <Image 
              source={{ uri: formData.aadharCard }} 
              style={styles.previewImage} 
            />
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Company ID Card Upload</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickImage('companyIdCard')}
          >
            <Text style={styles.uploadButtonText}>
              {formData.companyIdCard ? 'Change Company ID' : 'Upload Company ID'}
            </Text>
          </TouchableOpacity>
          {formData.companyIdCard && (
            <Image 
              source={{ uri: formData.companyIdCard }} 
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