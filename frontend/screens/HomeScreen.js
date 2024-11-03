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
        <View style={styles.header}>
            <Text style={styles.headerFont}>Ball Drop</Text>
        </View>
        <TouchableOpacity 
            onPress={() => navigation.navigate('Game')}
            style={styles.startButton}
        >
            <Text style={styles.startFont}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    startButton: {
      width: 200,
      height: 50,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    startFont: {
      color: 'white',
      fontSize: 20,
    },
    header: {
        position: 'absolute',
        height: 50,
        alignItems: 'center',
        top: 100,
    },
    headerFont: {
        fontSize: 35,
    }
  });