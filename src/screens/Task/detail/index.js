import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Card, CardItem, View, Button } from "native-base";
import moment from 'moment';

export default function TaskDetail({ navigation, route }) {
    const [ data,setData ] = useState(null);
    
    useEffect(() => {
        let { params } = route
        if (params != null && params.data) {
            setData(params.data);
        }
    }, []);

    function renderItemDetail(type, value) {
        return (
            <View style={styles.viewItemDetail}>
                <Text style={{ fontWeight: 'bold' }}>{type}</Text>
                <Text style={{ marginVertical: 5 }}>{value}</Text>
            </View>)
    }

    function doEditTask(data){
        if (data) {
            navigation.push('CreateTask' ,{
                data: data,
                isUpdateData: onUpdateData
            })
        }
    }

    function onUpdateData(isUpdateData){
        if (isUpdateData == true) {
            onBackPressed(true)
        }
    }

    function onBackPressed(isUpdateData){
        if (route.params != null && route.params.isUpdateData != null) {
            route.params.isUpdateData(isUpdateData);
        }
        navigation.goBack();
    }

    return (
        <Container>
            <SafeAreaView />
            <Header noShadow>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => onBackPressed(false)}>
                        <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title style={styles.textTitle}>Detail Task</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content>
                {data != null &&
                    <View style={{ margin: 10 }}>
                        <Card>
                            <CardItem>
                                <View style={styles.viewCardTask}>
                                    {renderItemDetail('Category', data.category)}
                                    {renderItemDetail('Name', data.name)}
                                    {renderItemDetail('Description', data.description)}
                                    {renderItemDetail('Request Date', moment(data.request_date).utc().format("DD MMM YYYY"))}
                                </View>
                            </CardItem>
                        </Card>
                    {/* start from this */}
                        <Card style={{ marginTop: 10 }}>
                            <CardItem>
                                <View style={{ flexDirection: "column", flex: 1 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ fontWeight:'bold' }}>
                                                {data.status}
                                            </Text>
                                        </View>
                                    </View>

                                    {
                                    (data.status != 'W' && data.response_message) ?
                                        <View style={styles.viewBottomNotes}>
                                            <Text style={{ fontWeight: "bold" }}>Notes</Text>
                                            <Text style={{ marginTop: 5 }}>{data.response_message}</Text>
                                        </View>
                                    :
                                        <View style={styles.viewBottomNotes}>
                                            <Button warning block rounded onPress={() => doEditTask(data)} style={{ marginTop: 10 }}>
                                                <Text>Edit Task</Text>
                                            </Button>
                                        </View>
                                    }
                                </View>
                                
                            </CardItem>
                        </Card>
                    </View>
                }
                
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    iconSide: {
        flex: 0.5,
        paddingHorizontal: 5
    },
    iconBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewCardTask: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 10
    },
    viewItemDetail: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    viewBottomNotes: {
        flex: 1,
        marginTop: 15,
        paddingVertical: 10,
        borderTopColor: 'black',
        borderTopWidth: 1
    },
});