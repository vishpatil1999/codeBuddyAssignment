// App.js
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Form1 from './src/Form1';
import Form2 from './src/Form2';
import Form3 from './src/Form3';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form1">
        <Stack.Screen name="Form1" component={Form1} />
        <Stack.Screen name="Form2" component={Form2} />
        <Stack.Screen name="Form3" component={Form3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
