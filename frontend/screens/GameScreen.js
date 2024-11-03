import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GameScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Wróć do strony głównej</Text>
        </TouchableOpacity>
      </View>
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

export default GameScreen;