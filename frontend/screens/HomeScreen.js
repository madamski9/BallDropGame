import React from 'react'; 
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  
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
