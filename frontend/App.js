import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const MyApp = () => {
  const myIp = "192.168.0.22:5233"; 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(`http://${myIp}/api/helloworld`);
        console.log(response.data);
        setMessage(response.data); 
      } catch (error) {
        console.error("Wystąpił błąd: ", error);
      }
    };
  
    getApi();
  }, []); 

  return (
    <View style={styles.container}>
      <Text>Dane z backendu:</Text>
      <Text>{message}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyApp;
