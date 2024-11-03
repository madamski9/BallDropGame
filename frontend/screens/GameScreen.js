import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window'); // pobranie wymiarow ekranu

const GameScreen = ({ navigation }) => {
    const [ ballPosition, setBallPosition ] = useState(new Animated.ValueXY({ x: -150, y: -390 }));   
    const gravity = 0; // stala wartosc grawitacji
    const [ obstacles, setObstacles ] = useState([
        { x: -110, y: -400, width: 10, height: 80 },
        { x: 40, y: -400, width: 10, height: 150 },
        { x: -200, y: -185, width: 100, height: 10 },
        { x: -110, y: -260, width: 80, height: 10 },
        { x: -30, y: -320, width: 10, height: 220 },
        { x: -20, y: -190, width: 140, height: 10 },
        { x: 110, y: -290, width: 10, height: 270 },
        { x: -110, y: -110, width: 150, height: 10 },
        { x: -30, y: -30, width: 10, height: 100 },
        { x: 120, y: -260, width: 100, height: 10 },
        { x: -30, y: 15, width: 80, height: 10 },
    ]);
    const checkCollision = (ballX, ballY, obstacle) => { 
        return (
          ballX < obstacle.x + obstacle.width &&
          ballX + 20 > obstacle.x && 
          ballY < obstacle.y + obstacle.height &&
          ballY + 20 > obstacle.y 
        );
    };

    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            let newX = ballPosition.x._value + x * 10;
            let newY = ballPosition.y._value - y * 10 + gravity;
            
            // ograniczenie ruchu kulki
            if (newX < -width / 2 + 10) newX = -width / 2 + 10;
            if (newX > width / 2 - 12) newX = width / 2 - 12; 
            if (newY < -height / 2 + 20) newY = -height / 2 + 20;
            if (newY > height / 2 - 20) newY = height / 2 - 20; 

            for (let obstacle of obstacles) {
                if (checkCollision(newX, newY, obstacle)) {
                  if (newY + 20 > obstacle.y && ballPosition.y._value + 20 <= obstacle.y) {
                    newY = ballPosition.y._value; 
                  } else if (newY < obstacle.y + obstacle.height && ballPosition.y._value >= obstacle.y + obstacle.height) {
                    newY = ballPosition.y._value;
                  }
                  if (newX + 20 > obstacle.x && ballPosition.x._value + 20 <= obstacle.x) {
                    newX = ballPosition.x._value;
                  } else if (newX < obstacle.x + obstacle.width && ballPosition.x._value >= obstacle.x + obstacle.width) {
                    newX = ballPosition.x._value; 
                  }
                }
              }

            ballPosition.setValue({ x: newX, y: newY });
        });
      
        return () => subscription.remove();
    }, [ ballPosition, obstacles ]);

    return (
        <View style={styles.container}>
        <Animated.View style={[styles.ball, { transform: ballPosition.getTranslateTransform() }]} />
        {obstacles.map((obstacle, index) => (
        <View
            key={index}
            style={[
                styles.obstacle,
                {
                    left: width / 2 + obstacle.x - 10,
                    top: height / 2 + obstacle.y - 12,
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
        width: 18,
        height: 18,
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