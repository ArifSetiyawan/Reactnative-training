import React,{ useEffect, useState } from 'react'
import { Container, Content, Header, Body, Title, Card, CardItem, Icon } from 'native-base'
import { SafeAreaView, StyleSheet, Text, AsyncStorage, Image, View, TouchableOpacity } from 'react-native'

export default function Profile({navigation}){

    const [ avatar, setAvatar]      = useState("https://steamuserimages-a.akamaihd.net/ugc/717538599319470771/D426A96AB907A584D950526C84E83A19327BE419/");
    const [ nama, setNama]          = useState("Arif");
    const [ email, setEmail]        = useState("Manager");
    const [ position, setPosition]  = useState("Manager");

    useEffect(() => {
        doGetProfile();
    }, []);

    async function doGetProfile() {
        let profile = await AsyncStorage.getItem('DATA_PROFILE');
            profile = JSON.parse(profile);

            setAvatar(profile.avatar);
            setNama(profile.name);
            setEmail(profile.email);
            setPosition(profile.position);
    }

    function _renderProfile(type, value) {
        return (
            <View style={[styles.line, { paddingVertical: 10 }]}>
                <Text style={{fontSize: 14}}>{type}</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{value}</Text>
            </View>
        )
    }

    async function doLogout() {
        await AsyncStorage.setItem('DATA_PROFILE', '');
        await AsyncStorage.setItem('TOKEN', '');

        navigation.replace('Login');
    }

    return(
        <Container>
            <SafeAreaView/>
            <Header>
                <Body>
                    <Title>Profile</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <View style={styles.mainView}>
                    <Image 
                        source={{ uri: avatar }} 
                        style={styles.imageProfile} />
                </View>

                <Card style={{ marginTop: 25, flex: 1 }}>
                    <CardItem>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            {_renderProfile("Name", nama)}
                            {_renderProfile("Email", email)}
                            {_renderProfile("Jabatan", position)}
                        </View>
                    </CardItem>
                </Card>

                <Card style={{ marginTop: 25, flex: 1 }}>
                    <CardItem>
                        <TouchableOpacity 
                            onPress={doLogout}
                            style={styles.wrapperLogout}>
                            <Icon type='AntDesign' name='logout' style={styles.icon} />
                            <Text style={styles.logout}>Logout</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#F5FCFF'
    },
    imageProfile: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 25,
        flexDirection: 'column' 
    },
    line: {
        borderBottomColor: '#efefef',
        borderBottomWidth: 1
    },
    wrapperLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    icon: {
        fontSize: 26,
    },
    logout: {
        fontSize: 18,
        marginTop: 0, 
        marginLeft: 5
    }
})