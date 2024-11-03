import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <Text>Przejdź do szczegółów</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });