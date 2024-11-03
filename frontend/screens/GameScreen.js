import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ navigation }) => {
    const [ ballPosition, setBallPosition ] = useState(new Animated.ValueXY({ x: 100, y: 100 }));   
    const gravity = 0.5; // stala wartosc grawitacji
    const [ obstacles, setObstacles ] = useState([
        { x: -10, y: -300, width: 10, height: 200 },
        { x: -80, y: 0, width: 400, height: 10 }
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
            
            if (newX < -width / 2 + 10) newX = -width / 2 + 10;
            if (newX > width / 2 - 12) newX = width / 2 - 12; 
            if (newY < -height / 2 + 20) newY = -height / 2 + 20;
            if (newY > height / 2 - 25) newY = height / 2 - 25; 

            for (let obstacle of obstacles) {
                if (checkCollision(newX, newY, obstacle)) {
                  // Reakcja na kolizję (blokowanie ruchu tylko w kierunku kolizji)
                  if (newY + 25 > obstacle.y && ballPosition.y._value + 25 <= obstacle.y) {
                    newY = ballPosition.y._value; // Blokuj ruch w osi Y od dołu
                  } else if (newY < obstacle.y + obstacle.height && ballPosition.y._value >= obstacle.y + obstacle.height) {
                    newY = ballPosition.y._value; // Blokuj ruch w osi Y od góry
                  }
                  if (newX + 25 > obstacle.x && ballPosition.x._value + 25 <= obstacle.x) {
                    newX = ballPosition.x._value; // Blokuj ruch w osi X od prawej
                  } else if (newX < obstacle.x + obstacle.width && ballPosition.x._value >= obstacle.x + obstacle.width) {
                    newX = ballPosition.x._value; // Blokuj ruch w osi X od lewej
                  }
                }
              }

            ballPosition.setValue({ x: newX, y: newY });
        });
      
        return () => subscription.remove();
    }, [ ballPosition, obstacles ]);

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
                    left: width / 2 + obstacle.x - 12,
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