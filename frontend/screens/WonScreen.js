import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WonScreen = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerFont}>Wygrana!</Text>
        </View>
        <TouchableOpacity 
            onPress={() => navigation.navigate('Home')}
            style={styles.startButton}
        >
            <Text style={styles.startFont}>Powrót</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default WonScreen;

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
      alignItems: 'center',
      justifyContent: 'center',
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