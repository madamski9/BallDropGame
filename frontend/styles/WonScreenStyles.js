import { StyleSheet } from 'react-native';

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

export default styles;