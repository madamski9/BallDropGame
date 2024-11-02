import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const myIp = "192.168.0.22:5233"; 
  const [ message, setMessage ] = useState('');

  const getApi = async () => {
    try {
      const response = await axios.get(`http://${myIp}/api/helloworld`);
      console.log(response.data);
      setMessage(response.data); 
    } catch (error) {
      console.error("Wystąpił błąd: ", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []); 

  return (
    <View style={styles.container}>
      <Text>Dane z backendu:</Text>
      <Text>{message}</Text> 
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text>Przejdź do szczegółów</Text>
      </TouchableOpacity>
    </View>
  );
}

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Wróć do strony głównej</Text>
      </TouchableOpacity>
    </View>
  );
}

const MyApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyApp;
