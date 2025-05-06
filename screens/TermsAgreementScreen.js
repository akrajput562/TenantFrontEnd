import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import apiClient from "../api/auth";
const TermsAgreementScreen = ({ navigation ,route}) => {
  const { reqId } = route.params; // 👈 Receive reqId here
console.log(reqId)
  const [formData, setFormData] = useState({
    monthlyRent: '',
    securityDeposit: '',
    maintenance: '',
    agreementStartDate: '',
    rentCycle: '',
    agreedToTerms: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCycleDatePicker, setShowCycleDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitting with reqId:', reqId);
    console.log('Form submitted:', formData);

    const submissionData = new FormData();
    submissionData.append("monthlyRent", formData.monthlyRent);
    submissionData.append("securityDeposit", formData.securityDeposit);
    submissionData.append("maintenance", formData.maintenance);
    submissionData.append("agreementStartDate", formData.agreementStartDate);
    submissionData.append("rentCycle", formData.rentCycle);
    submissionData.append("cycleStartDate", formData.cycleStartDate || '');
    submissionData.append("agreedToTerms", formData.agreedToTerms);
    
  
    try {
      //const response = await apiClient('/tenants/termUpdation/${reqId}', 'PUT', payload);
      const response = await apiClient(`/tenants/termUpdation/${reqId}`, 'PUT', submissionData);
      console.log('Dashboard', response);
      navigation.navigate('UserDashboard');
    } catch (error) {
      console.error('Step 3 update failed:', error);
    }
  
  }; 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.stepText}>Step 3 of 3</Text>
      <Text style={styles.title}>Terms of agreement</Text>
      <Text style={styles.subtitle}>To get your request accepted, kindly enter correct details.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Monthly Rent"
          value={formData.monthlyRent}
          onChangeText={(value) => handleInputChange('monthlyRent', value)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Security deposit"
          value={formData.securityDeposit}
          onChangeText={(value) => handleInputChange('securityDeposit', value)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Maintenance"
          value={formData.maintenance}
          onChangeText={(value) => handleInputChange('maintenance', value)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            label="Agreement start date"
            value={formData.agreementStartDate}
            mode="outlined"
            style={styles.input}
            placeholder="DD/MM/YYYY"
            editable={false}
            right={<TextInput.Icon icon="calendar" />}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={date => {
            const formatted = date.toISOString().split('T')[0];
            console.log('Selected agreement date:', formatted);
            setShowDatePicker(false);
            handleInputChange('agreementStartDate', formatted);
          }}
          onCancel={() => setShowDatePicker(false)}
          maximumDate={new Date()}
        />

        <Text style={styles.label}>Rent cycle</Text>
        <Text style={styles.rentCycleDesc}>
          Select how your rent cycle should be calculated:
          {'\n'}• 01 - 01: 1st of month to 1st of next month
          {'\n'}• 15 - 15: 15th of month to 15th of next month
          {'\n'}• Date to date: Custom date to same date next month
        </Text>
        <SegmentedButtons
          value={formData.rentCycle}
          onValueChange={value => {
            handleInputChange('rentCycle', value);
            if (value !== 'date-to-date') {
              handleInputChange('cycleStartDate', '');
            }
          }}
          buttons={[
            { value: '01-01', label: '01 - 01' },
            { value: '15-15', label: '15 - 15' },
            { value: 'date-to-date', label: 'Date to date' },
          ]}
          style={styles.segmentedButtons}
        />
        {!formData.rentCycle && (
          <Text style={styles.errorText}>Please select a rent cycle.</Text>
        )}
        {formData.rentCycle === 'date-to-date' && (
          <>
            <TouchableOpacity onPress={() => setShowCycleDatePicker(true)}>
              <TextInput
                label="Cycle start date"
                value={formData.cycleStartDate || ''}
                mode="outlined"
                style={styles.input}
                placeholder="Select start date"
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showCycleDatePicker}
              mode="date"
              onConfirm={date => {
                setShowCycleDatePicker(false);
                handleInputChange('cycleStartDate', date.toISOString().split('T')[0]);
              }}
              onCancel={() => setShowCycleDatePicker(false)}
              minimumDate={new Date()}
            />
            {!formData.cycleStartDate && (
              <Text style={styles.errorText}>Please select a cycle start date.</Text>
            )}
            {formData.cycleStartDate && (
              <Text style={styles.notice}>
                Your cycle will be from {formData.cycleStartDate} to next month same date.
              </Text>
            )}
          </>
        )}
        <Text style={styles.notice}>
          Rent ticket will be generated on 1st of every month.
        </Text>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>Terms & Conditions</Text>
        <View style={styles.termsBox}>
          <ScrollView>
            <Text style={styles.termsText}>
              1. The tenant agrees to pay rent and all applicable charges on time. {'\n'}
              2. The property should be maintained in good condition. {'\n'}
              3. Any damage caused by the tenant will be repaired at their expense. {'\n'}
              4. The agreement is subject to the rules and regulations of the property. {'\n'}
              5. Security deposit is refundable subject to terms. {'\n'}
              6. The tenant agrees to vacate the property upon agreement termination. {'\n'}
              7. All disputes are subject to local jurisdiction. {'\n'}
              8. No illegal activities are permitted on the premises. {'\n'}
              9. The tenant must provide valid identification and documents. {'\n'}
              10. Other terms as agreed between both parties apply. {'\n'}
            </Text>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
          <Button
            mode={formData.agreedToTerms ? 'contained' : 'outlined'}
            onPress={() => handleInputChange('agreedToTerms', !formData.agreedToTerms)}
            style={{ marginRight: 8 }}
            compact
          >
            {formData.agreedToTerms ? '✓' : ''}
          </Button>
          <Text>I agree to the Terms & Conditions</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        
      >
        Send
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  termsContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  termsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  termsBox: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  termsText: {
    fontSize: 13,
    color: '#444',
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
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  notice: {
    color: '#2196F3',
    fontSize: 14,
  },
  button: {
    padding: 4,
    backgroundColor: '#4A148C',
    marginBottom: 24,
  },
  rentCycleDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
});

export default TermsAgreementScreen; 