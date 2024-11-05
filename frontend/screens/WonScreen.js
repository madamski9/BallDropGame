import React from 'react'; 
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/WonScreenStyles';

const WonScreen = ({ navigation, route }) => {

  const { score } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerFont}>Wygrana!</Text>
          <Text style={styles.headerFont}>Twoj wynik: {score}</Text>
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
