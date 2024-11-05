import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ball: {
        width: 18,
        height: 18,
        backgroundColor: 'red',
        borderRadius: 25,
        position: 'absolute',
    },
    obstacle: {
        backgroundColor: 'black',
        position: 'absolute',
    },
    hole: {
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 50,
    },
    points: {
        position: 'absolute',
        backgroundColor: 'green',
        borderRadius: 50,
    },
    score: {
        position: 'absolute',
        left: 115,
        top: -50,
        color: "black",
        fontSize: 20,
        transform: [{ rotate: '90deg' }],
    },
    wonGame: {
        position: 'absolute',
        backgroundColor: 'green',
    }
});

export default styles;