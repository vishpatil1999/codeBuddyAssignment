// src/components/Form1.js
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Form1 = ({navigation}) => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    emailId: '',
    password: '',
  });

  const validateEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = pass => {
    // Implement your password validation logic here
    // Ensure it meets your requirements (2 capital, 2 small, 2 numbers, 2 special characters)
    return true; // Placeholder validation logic
  };

  const handleNextButton = () => {
    const newErrors = {
      emailId: '',
      password: '',
    };

    // Validate email
    if (!validateEmail(emailId)) {
      newErrors.emailId = 'Invalid email format';
    }

    // Validate password
    if (!validatePassword(password)) {
      newErrors.password = 'Invalid password format';
    }

    setErrors(newErrors);

    // Check if any validation errors exist
    if (newErrors.emailId || newErrors.password) {
      // Validation failed; do not proceed
      return;
    }

    // Proceed to the next step if there are no validation errors
    handleNext();
  };

  const handleNext = () => {
    navigation.navigate('Form2', {Email: emailId, Password: password});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={emailId}
        onChangeText={text => setEmailId(text)}
      />
      {errors.emailId && <Text style={styles.errorText}>{errors.emailId}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleNextButton}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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

export default Form1;
