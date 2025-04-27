import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const UserDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Dashboard!</Text>
      <Text style={styles.subtitle}>Here you can view your property, agreement, and payment details.</Text>
      {/* Add dashboard widgets or navigation buttons here */}
      <Button title="View Agreement" onPress={() => navigation.navigate('TermsAgreement')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default UserDashboardScreen;
