import React, { useEffect, useState } from 'react'; 
import { Text, View, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from '../styles/GameScreenStyles';

const { width, height } = Dimensions.get('window'); // pobranie wymiarow ekranu

const GameScreen = ({ navigation }) => {
    // ustawienia wszystkich objektow na planszy
    const initialObstacles = [
        { x: -110, y: -430, width: 10, height: 110 },
        { x: 40, y: -440, width: 10, height: 190 },
        { x: -240, y: -185, width: 140, height: 10 },
        { x: -110, y: -260, width: 80, height: 10 },
        { x: -30, y: -320, width: 10, height: 220 },
        { x: -20, y: -190, width: 140, height: 10 },
        { x: 110, y: -290, width: 10, height: 270 },
        { x: -110, y: -110, width: 150, height: 10 },
        { x: -30, y: -30, width: 10, height: 90 },
        { x: 120, y: -260, width: 100, height: 10 },
        { x: -30, y: 50, width: 150, height: 10 },
        { x: -110, y: -30, width: 80, height: 10 },
        { x: 40, y: -110, width: 10, height: 90 },
        { x: 110, y: 50, width: 10, height: 70 },
        { x: -30, y: 120, width: 80, height: 10 },
        { x: 50, y: 200, width: 150, height: 10 },
        { x: -110, y: -30, width: 10, height: 160 },
        { x: -110, y: 200, width: 10, height: 80 },
        { x: -110, y: 200, width: 90, height: 10 },
        { x: -30, y: 130, width: 10, height: 80 },
        { x: -110, y: 280, width: 240, height: 10 },
        { x: -110, y: 360, width: 90, height: 10 },
        { x: -110, y: 360, width: 10, height: 60 },
        { x: -180, y: 406, width: 80, height: 10 },
        { x: -220, y: 85, width: 120, height: 10 },
        { x: -30, y: 285, width: 10, height: 140 },
        { x: 40, y: 360, width: 10, height: 90 },
        { x: 40, y: 360, width: 200, height: 10 },
        { x: -220, y: -350, width: 80, height: 10 },
    ]
    const initialHoles = [
        { x: -10, y: 10, width: 18, height: 18 },
        { x: -70, y: -300, width: 18, height: 18 },
        { x: -160, y: -290, width: 18, height: 18 },
        { x: 60, y: -300, width: 18, height: 18 },
        { x: 150, y: -350, width: 18, height: 18 },
        { x: 150, y: -150, width: 18, height: 18 },
        { x: 140, y: 40, width: 18, height: 18 },
        { x: 60, y: -50, width: 18, height: 18 },
        { x: 0, y: -150, width: 18, height: 18 },
        { x: -90, y: -80, width: 18, height: 18 },
        { x: -160, y: -40, width: 18, height: 18 },
        { x: -70, y: -150, width: 18, height: 18 },
        { x: -70, y: 150, width: 18, height: 18 },
        { x: 70, y: 150, width: 18, height: 18 },
        { x: -80, y: 10, width: 18, height: 18 },
        { x: -165, y: 190, width: 18, height: 18 },
        { x: -90, y: 330, width: 18, height: 18 },
        { x: -10, y: 330, width: 18, height: 18 },
        { x: 100, y: 310, width: 18, height: 18 },
        { x: 20, y: 250, width: 18, height: 18 },
        { x: 160, y: 230, width: 18, height: 18 },
    ]
    const initialPoints = [ 
        { x: -140, y: -220, width: 18, height: 18 },
        { x: 60, y: -220, width: 15, height: 15 },
        { x: 175, y: -370, width: 5, height: 5 },
        { x: -10, y: -168, width: 6, height: 6 },
        { x: -155, y: 40, width: 22, height: 22 },
        { x: -85, y: 60, width: 15, height: 15 },
        { x: -50, y: -5, width: 5, height: 5 },
        { x: -55, y: 305, width: 10, height: 10 },
        { x: 150, y: 305, width: 10, height: 10 },
        { x: -50, y: 240, width: 15, height: 15 },
        { x: 150, y: 155, width: 10, height: 10 },
        { x: 160, y: -200, width: 13, height: 13 },
    ]
    const [ wonGame, setWonGame ] = useState([
        { x: -20, y: 390, width: 60, height: 50 }
    ]);

    const [ ballPosition, setBallPosition ] = useState(new Animated.ValueXY({ x: -150, y: -390 }));    // pozycja kulki
    const gravity = 0; // stala wartosc grawitacji
    const [ score, setScore ] = useState(0) // punkty
    const [ obstacles, setObstacles ] = useState(initialObstacles); // mur
    const [ holes, setHoles ] = useState(initialHoles) // dziury
    const [ points, setPoints ] = useState(initialPoints); // punkty

    // funkcja sprawdzajaca kolizje
    const checkCollision = (ballX, ballY, obstacle) => { 
        return (
          ballX < obstacle.x + obstacle.width &&
          ballX + 20 > obstacle.x && 
          ballY < obstacle.y + obstacle.height &&
          ballY + 20 > obstacle.y 
        );
    };

    // funkcja resetujaca gre
    const resetGame = () => {
        setBallPosition(new Animated.ValueXY({ x: -150, y: -390 }))
        setScore(0)
        setObstacles(initialObstacles)
        setHoles(initialHoles)
        setPoints(initialPoints)
    }

    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            let newX = ballPosition.x._value + x * 10;
            let newY = ballPosition.y._value - y * 10 + gravity;
            
            // sprawdzenie granic ekranu
            if (newX < -width / 2 + 10) newX = -width / 2 + 10;
            if (newX > width / 2 - 12) newX = width / 2 - 12; 
            if (newY < -height / 2 + 20) newY = -height / 2 + 20;
            if (newY > height / 2 - 20) newY = height / 2 - 20; 

            // logika kolizji z murami
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
            
            // logika przegranej
            for (let hole of holes) {
                if (checkCollision(newX, newY, hole)) {
                    resetGame()
                    return
                }
            }

            // logika punktowania
            let newPoints = points.filter(point => {
                if (checkCollision(newX, newY, point)) {
                    setScore(prevScore => prevScore + 1)
                    return false
                }
                return true
            });
            setPoints(newPoints);

            // wygrana
            for (let won of wonGame) {
                if (checkCollision(newX, newY, won)) {
                    navigation.navigate('WonScreen', { score: score })
                    return
                }
            }

            ballPosition.setValue({ x: newX, y: newY });
        });
      
        return () => subscription.remove();
    }, [ ballPosition, obstacles, holes, points, wonGame ]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.score}>Score: {score}</Text>
            </View>
            <Animated.View style={[styles.ball, { transform: ballPosition.getTranslateTransform() }]} />
            {wonGame.map((wonGame, index) => (
            <View
                style={[
                    key={index},
                    styles.wonGame,
                    {
                        left: width / 2 + wonGame.x - 10,
                        top: height / 2 + wonGame.y - 12,
                        width: wonGame.width,
                        height: wonGame.height,
                    },
                ]}
            />
            ))}
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
            {holes.map((hole, index) => (
            <View
                key={index}
                style={[
                    styles.hole,
                    {
                        left: width / 2 + hole.x - 17,
                        top: height / 2 + hole.y - 22,
                        width: hole.width + 15,
                        height: hole.height + 15,
                    },
                ]}
                />
            ))}
            {points.map((point, index) => (
                <View
                key={index}
                style={[
                    styles.points,
                    {
                    left: width / 2 + point.x - 17,
                    top: height / 2 + point.y - 22,
                    width: point.width + 15,
                    height: point.height + 15,
                    },
                ]}
                />
            ))}
        </View>
    )
}

export default GameScreen;