import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const GameScreen = ({ navigation }) => {
    const [ ballPosition, setBallPosition ] = useState(new Animated.ValueXY({ x: 0, y: 0 }));   
    const gravity = 3; // stala wartosc grawitacji
    const [ obstacles, setObstacles ] = useState([
        { x: 50, y: 500, width: 200, height: 10 }
    ]);

    const checkCollision = (ballX, ballY, obstacle) => {        
        return (
          ballX < obstacle.x + obstacle.width &&
          ballX + 25 > obstacle.x && 
          ballY < obstacle.y + obstacle.height &&
          ballY + 25 > obstacle.y 
        );
    };

    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            let newX = ballPosition.x._value + x * 10;
            let newY = ballPosition.y._value - y * 10 + gravity;

            if (newX < -173) newX = -173;
            if (newX > 173) newX = 173; 
            if (newY > 386) newY = 386;
            if (newY < -386) newY = -386; 
            
            for (let obstacle of obstacles) {
                if (checkCollision(newX, newY, obstacle)) {
                  newX = ballPosition.x._value;
                  newY = ballPosition.y._value;
                  break;
                }
            }

            ballPosition.setValue({ x: newX, y: newY });
        });
      
        return () => subscription.remove();
    }, [ ballPosition ]);

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>Wróć do strony głównej</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.ball, { transform: ballPosition.getTranslateTransform() }]} />
        {obstacles.map((obstacle, index) => (
        <View
            key={index}
            style={[
                styles.obstacle,
                {
                left: obstacle.x,
                top: obstacle.y,
                width: obstacle.width,
                height: obstacle.height,
                },
            ]}
            />
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ball: {
        width: 25,
        height: 25,
        backgroundColor: 'black',
        borderRadius: 25,
        position: 'absolute',
    },
    obstacle: {
        backgroundColor: 'black',
        position: 'absolute',
    }
});

export default GameScreen;