import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Home from './Pages/Home';
import HotelDetails from './Pages/HotelDetails';
import ListOfHotels from './Pages/ListOfHotels';
import BookingFormScreen from './Pages/BookingFormScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration} 
          options={{ title: 'Register' }}
        />
        <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name='HotelDetails'
        component={HotelDetails}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name='ListOfHotels'
        component={ListOfHotels}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name='BookingFormScreen'
        component={BookingFormScreen}
        options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
