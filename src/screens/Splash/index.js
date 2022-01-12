import React, { Component , useEffect} from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    AsyncStorage
 } from 'react-native';

 import { Container, Text } from 'native-base';
 import { IMAGES } from '../../assets';

 const { width, height } = Dimensions.get('window');

 export default function Splash({ navigation }) {
     useEffect(() => {
         setTimeout(()=> {
            checkUser();
         },2000)
     },[]);

     async function checkUser() {
        const token = await AsyncStorage.getItem('TOKEN')
        if (token != null && token != '') {
            navigation.replace('MainApp');
        } else {
            navigation.replace('Login');
        }
    }

     return (
        <Container>
            <SafeAreaView/>
            <View style={{ flex: 1 }}>
                <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />
                <Text style={styles.loading}>Loading...</Text>
                <Text style={styles.version}>Version 1.0</Text>
            </View>
        </Container>
    );
 }
 
 const styles = StyleSheet.create({
     illustrator:{
         width:width - (width / 4),
         height: width - (width / 4),
         marginTop: height / 4,
         alignSelf: "center",
         alignItems: 'flex-start'
     },
     loading:{
         marginTop: 20,
         fontSize: 12,
         textAlign: "center"
     },
     version:{
         position: "absolute",
         bottom: 20,
         left: "43%",
         fontSize: 10,
        textAlign: "center"
     }
 });
