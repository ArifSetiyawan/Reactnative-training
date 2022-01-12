import React, { useEffect, useState } from 'react'
import { Container, Header, Body, Title, Content, Card, CardItem, Icon, Toast } from 'native-base'
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, AsyncStorage, RefreshControl } from 'react-native'
import { getUser } from '../../utils/api';

const { width: widthDevice, height: heightDevice } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [avatar, setAvatar] = useState("https://steamuserimages-a.akamaihd.net/ugc/717538599319470771/D426A96AB907A584D950526C84E83A19327BE419/");
    const [nama, setNama] = useState("Arif");
    const [position, setPosition] = useState("Manager");
    const [task, setTask] = useState({ pending: 0, approved: 0, rejected: 0 });
    const [approval, setApproval] = useState({ pending: 0, approved: 0, rejected: 0 });
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        doGetProfile();
    }, []);

    async function doGetProfile() {
        // let response = await getUser();
        let { status, acknowledge, message, result } = await getUser();

        setIsRefreshing(false);

        if (acknowledge == true) {
            setNama(result.name);
            setPosition(result.position);
            setTask(result.task);
            setApproval(result.approval);

            result.avatar = avatar;

            doSaveProfile(result);
        } else {
            Toast.show({ text: message, duration: 1000 });
        }
    }

    async function doSaveProfile(data) {
        let profile = {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            positionId: data.position_id,
            position: data.position,
            email: data.email,
            leaderId: data.leader_id
        }

        await AsyncStorage.setItem('DATA_PROFILE', JSON.stringify(profile));
    }

    function onRefresh() {
        setIsRefreshing(true);
        doGetProfile();
    }

    function onCLickCard(textCard, status) {
        if (textCard == 'Create') {
            //goto create task
            // navigation.navigate('CreateTask')
            navigation.push('CreateTask', {
                isUpdated : isUpdateData
            })

        } else if (textCard == 'My Task') {
            //goto my task
            navigation.push('TaskList', {
                status : status
            })
        } else if (textCard == 'Approval') {
            //goto approval
            navigation.push('ApprovalList', {
                status : status
            })
        }
    }

    function isUpdateData(isDataUpadated){
        if(isDataUpadated){
            doGetProfile()
        }
    }

    function _renderIconWithText(iconType, iconName, text, status = null) {
        return (
            <Card style={styles.cardButton}>
                <CardItem style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                    onPress={() => onCLickCard(text, status)}
                    style={styles.btnTask}>
                        <Icon type={iconType} name={iconName} style={styles.iconTask} />
                        <Text style={styles.textTask}>{text}</Text>
                    </TouchableOpacity>
                </CardItem>
            </Card>
        )
    }

    function _renderItemTask(iconType, iconName, color, title, total, type, status = null) {
        return (
            <TouchableOpacity 
            onPress={() => onCLickCard(type, status)}
            style={[styles.viewTotalTask, styles.line]}>
                <Icon type={iconType} name={iconName} style={{ color: color }} />
                <Text>{title}</Text>
                <Text style={styles.textTotalTask}>{total}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Container>
            <SafeAreaView />
            <Header>
                <Body>
                    <Title>Home</Title>
                </Body>
            </Header>
            <Content
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh} />
                }>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={[styles.touchProfile, styles.line]}>
                    <Image
                        source={{ uri: avatar }}
                        style={styles.imageProfile} />
                    <View style={styles.wrapperProfile}>
                        <Text style={styles.textName}>{nama}</Text>
                        <Text style={styles.textPosition}>{position}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.marginContent}>
                    <View style={styles.wrapperButton}>
                        <View style={styles.itemButton}>
                            {_renderIconWithText('Feather', 'plus-circle', 'Create')}
                        </View>
                        <View style={styles.itemButton}>
                            {_renderIconWithText('Feather', 'activity', 'My Task')}
                        </View>
                        <View style={styles.itemButton}>
                            {_renderIconWithText('Feather', 'check-circle', 'Approval')}
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Card>
                        <CardItem>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={styles.titleCardTask}>My Task</Text>
                                {_renderItemTask('Octicons', 'primitive-dot', 'orange', 'PENDING', task.pending,'My Task', 'W')}
                                {_renderItemTask('Octicons', 'primitive-dot', 'green', 'APPROVED', task.approved,'My Task', 'A')}
                                {_renderItemTask('Octicons', 'primitive-dot', 'red', 'REJECTED', task.rejected,'My Task', 'R')}
                            </View>
                        </CardItem>
                    </Card>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Card>
                        <CardItem>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={styles.titleCardTask}>Approval</Text>
                                {_renderItemTask('Octicons', 'primitive-dot', 'orange', 'PENDING', approval.pending,'Approval', 'W')}
                                {_renderItemTask('Octicons', 'primitive-dot', 'green', 'APPROVED', approval.approved,'Approval', 'A')}
                                {_renderItemTask('Octicons', 'primitive-dot', 'red', 'REJECTED', approval.rejected,'Approval', 'R')}
                            </View>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    touchProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF'
    },
    imageProfile: {
        width: 65,
        height: 65,
        borderRadius: 50
    },
    wrapperProfile: {
        flexDirection: 'column',
        marginLeft: 16
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textPosition: {
        fontSize: 14
    },
    marginContent: {
        // marginHorizontal: 15
    },
    wrapperButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    itemButton: {
        flex: 1,
        alignItems: 'center'
    },
    cardButton: {
        width: widthDevice / 3.5,
        height: heightDevice / 5
    },
    btnTask: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    iconTask: {
        fontSize: 32,
        color: '#043dab'
    },
    textTask: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10
    },
    titleCardTask: {
        fontSize: 16,
        marginVertical: 5,
        fontWeight: 'bold'
    },
    viewTotalTask: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    textTotalTask: {
        textAlign: 'right',
        marginHorizontal: 10,
        flex: 1
    },
    line: {
        borderBottomColor: '#efefef',
        borderBottomWidth: 1
    },
})