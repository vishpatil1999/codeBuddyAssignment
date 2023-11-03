import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const Form3 = ({navigation, route}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [errors, setErrors] = useState({
    phoneNumber: '',
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
    {
      id: 1,
      country: '+91',
    },
    {
      id: 1,
      country: '+1',
    },
  ];

  const validatePhoneNumber = phone => {
    // Validate phone number (e.g., 10 digits, numeric)
    return /^[0-9]{10}$/.test(phone);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleNextButton = () => {
    const newErrors = {
      phoneNumber: '',
    };

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    setErrors(newErrors);

    // Check if any validation errors exist
    if (newErrors.phoneNumber) {
      // Validation failed; do not proceed
      return;
    }

    // Proceed to the next step if there are no validation errors
    handleNext();
  };

  const handleBack = () => {
    navigation.navigate('Form2');
  };

  const handleNext = () => {
    const arr = {
      emailId: route.params?.Email,
      password: route.params?.Password,
      firstName: route.params?.FirstName,
      lastName: route.params?.LastName,
      address: route.params?.Address,
      countryCode: countryCode,
      phoneNumber: phoneNumber,
    };
    Alert.alert('Data Saved', JSON.stringify(arr));
  };

  const renderPicklist = item => {
    return (
      <View style={styles.itemPicklist}>
        <Text style={[, {flex: 1}]}>{item.country}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.DropdownTextInput]}
        placeholderStyle={[{marginLeft: '4%'}]}
        selectedTextStyle={[{marginLeft: '4%'}]}
        // iconStyle={[styles.DropDownIconStyle]}
        data={countries}
        valueField="country"
        labelField="country"
        placeholder={'Select'}
        value={countryCode}
        onChange={item => {
          console.log('hiie', item.country);
          setCountryCode(item.country);
        }}
        renderItem={renderPicklist}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="numeric"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={toggleCheckbox}>
          {isChecked && <Text>✔</Text>}
        </TouchableOpacity>
        <Text style={{marginStart: 10}}>Agree to Terms and Conditions</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextButton}>
          <Text style={styles.buttonText}>Save</Text>
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
  picker: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: 'blue', // Change to your desired checked color
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  selectedCountryText: {
    marginTop: 10,
  },
  DropdownTextInput: {
    height: '6%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    width: '99%',
    position: 'relative',
    margin: 10,
  },
  itemPicklist: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Form3;
