import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Form2 = ({navigation, route}) => {
  console.log('Email ====', navigation);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  const validateName = name => {
    // Validate names using your criteria (e.g., alphabets only, min length)
    return /^[a-zA-Z\s]*$/.test(name);
  };

  const handleNextButton = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      address: '',
    };

    // Validate first name
    if (!validateName(firstName) || firstName.length < 2) {
      newErrors.firstName = 'Invalid first name';
    }

    // Validate last name (optional)
    if (lastName && (!validateName(lastName) || lastName.length < 2)) {
      newErrors.lastName = 'Invalid last name';
    }

    // Validate address
    if (address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters long';
    }

    setErrors(newErrors);

    // Check if any validation errors exist
    if (newErrors.firstName || newErrors.lastName || newErrors.address) {
      // Validation failed; do not proceed
      return;
    }

    // Proceed to the next step if there are no validation errors
    handleNext();
  };

  const handleNext = () => {
    navigation.navigate('Form3', {
      Email: route.params?.Email,
      Password: route.params?.Password,
      FirstName: firstName,
      LastName: lastName,
      Address: address,
    });
  };
  const handleBack = () => {
    navigation.navigate('Form1');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Last Name (Optional)"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: 'blue', // Change the background color as needed
    padding: 10,
    borderRadius: 5,
    width: '40%', // Adjust the width as needed
    alignItems: 'center',
    margin: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Form2;
