import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    AsyncStorage
 } from 'react-native';

 import { Container, Text , Content, Input, Item, Icon, Button, Toast } from 'native-base';
 import { IMAGES } from '../../assets';
 import { validateEmail } from '../../utils/Common';
 import myColor from '../../theme/variables/commonColor';
 import { loginUser } from '../../utils/api/Login'
 const { width, height } = Dimensions.get('window');
 import _ from 'lodash';

 export default function LoginForm({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    onTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    onChangeUsername = (text) => {
        setUsername(text)
        setErrorUsername(!validateEmail(text))
    }

    onChangePassword = (text) => {
        setPassword(text)
        setErrorPassword(text.length < 5)
    }

    async function onLogin() {
        // validation
        let isErrorUsername = _.isEmpty(username);
        let isErrorPassword = _.isEmpty(password);

        setErrorUsername(isErrorUsername)
        setErrorPassword(isErrorPassword)

        if (isErrorUsername == false && isErrorPassword == false) {
            doLogin(username, password)
        }
    }

    async function doLogin(username, password) {
        const params = {
            email: username,
            password: password
        }

        let response = await loginUser(params);

        if (response.acknowledge == true && response.result != null) {
            doSaveToken(response.result.token)
            Toast.show({
                text: response.result.token,
                duration: 1000
            });
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    async function doSaveToken(token) {
        await AsyncStorage.setItem("TOKEN", token)
            .then(() => {
                navigation.replace('MainApp');
            })
            .catch(() => {
                console.log("saved token failed")
            })
    }

    return (
        <Container>
            <SafeAreaView />
            <Content>
                <View>
                    <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />

                    <View style={styles.form}>
                        <Item regular error={errorUsername} style={styles.formItem}>
                            <Input autoFocus onChangeText={(txt) => this.onChangeUsername(txt)} keyboardType="email-address" placeholder='Input your email' />
                            <Icon type="Ionicons" name='md-mail' />
                        </Item>
                        <Item regular error={errorPassword} style={styles.formItem}>
                            <Input secureTextEntry={!showPassword} onChangeText={(txt) => this.onChangePassword(txt)} placeholder='Input your password' />
                            <Button iconLeft transparent onPress={() => this.onTogglePassword()} style={{ height: 50, paddingRight: 8 }}>
                                <Icon type="Ionicons" name='ios-eye' style={{ color: errorPassword ? myColor.brandDanger : myColor.brandDark }} />
                            </Button>
                        </Item>
                        <Button danger rounded block onPress={() => onLogin()} style={styles.btnLogin}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    greeting: {
        position: 'absolute',
        top: 30,
        left: 25
    },
    illustrator: {
        width: width - (width / 4),
        height: width - (width / 4),
        marginTop: height / 8,
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
    form: {
        marginTop: height / 8,
        marginHorizontal: 25
    },
    formItem: {
        marginBottom: 10,
        borderRadius: 25,
        paddingHorizontal: 15
    },
    btnLogin: {
        marginTop: 10
    },
    btnForgot: {
        marginTop: 10
    }
});