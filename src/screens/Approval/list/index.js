import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title, Content, Toast } from 'native-base';
import { StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import ItemApproval from '../../../components/itemApproval';
import { getUserApproval } from '../../../utils/api';

export default function ApprovalList({ navigation, route }) {
    const [taskList, setTaskList]   = useState([]);
    const [status, setStatus]       = useState(null);

    function goToApproval(data){
        if (data != null) {
            navigation.push('ApprovalDetail', {
                data : data,
                isUpdate : onUpdateData
            })  
        }
    }

    function onUpdateData(isUpdate){
        if (isUpdate == true) {
            doGetUserApproval(status);
        }
    }
    
    function _renderItem({ item }) {
        return (
            <ItemApproval data={item} onClickItem={goToApproval}/>
        )
    }

    useEffect(() => {
        let { params }  = route;

        if (params != null && params.status) {
            doGetUserApproval(params.status);
            setStatus(params.status);
        } else {
            doGetUserApproval(null);
            setStatus(null);
        }
    }, [])

    async function doGetUserApproval(status = null) {
        let { acknowledge, result, message } = await getUserApproval(status);

        if (acknowledge == true) {
            setTaskList(result);
        } else {
            Toast.show({text: message, duration: 1000})
        }
    }

    return (
        <Container>
            <SafeAreaView />
            <Header>
                <Left style={styles.iconSide}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon
                            type='AntDesign'
                            name='arrowleft'
                            style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title>Approval List</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <FlatList
                    style={styles.flatList}
                    data={taskList}
                    renderItem={_renderItem} />
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    iconSide: {
        flex: 0.5,
        paddingHorizontal: 5
    },
    iconBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    flatList: {
        paddingHorizontal: 10
    }
})