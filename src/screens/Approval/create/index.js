import React, { useEffect, useState } from 'react'
import { Container, Header, Left, Body, Right, Icon, Toast, Title, Content, Card, Text, Item, View, Picker, DatePicker, Input, Button } from 'native-base'
import { StyleSheet, TouchableOpacity, Dimensions, Alert, SafeAreaView, AsyncStorage } from 'react-native'
import moment from 'moment'
import { createTask } from '../../../utils/api'

const { height: heightDevice } = Dimensions.get('window');


export default function CreateTask({ navigation, route }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(null)
    const [errorName, setErrorName] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)
    const [errorCategory, setErrorCategory] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [categoryDescription, setCategoryDescription] = useState('')

    const categoryList = [
        {
            key: 'PENGADAAN',
            label: 'PENGADAAN'
        },
        {
            key: 'PERAWATAN',
            label: 'PERAWATAN'
        },
        {
            key: 'PENGURANAGN',
            label: 'PENGURANAGN'
        },
        {
            key: 'TRANSPORTASI',
            label: 'TRANSPORTASI'
        },
        {
            key: 'SEWA',
            label: 'SEWA'
        }
    ]

    function onValueChange(value) {
        setCategory(value)
        setErrorCategory(false)

        let category = categoryList.find(data => data.key == value)
        if (category != null) {
            setCategoryDescription(category.label)
        }
    }

    function renderCategoryList() {
        if (categoryList != null && categoryList.length > 0) {
            return (
                categoryList.map(value => {
                    return (
                        <Picker.Item label={value.label} value={value.key} />
                    )
                })
            )
        }
    }

    function onSelectedDate(newDate) {
        setDate(newDate)
        setErrorDate(false)
    }

    function onChangeName(text) {
        setName(text)
        setErrorName(false)
    }

    function onChangeDescription(text) {
        setDescription(text)
        setErrorDescription(false)
    }

    function validateData() {
        let errorMessage = ''

        if (category == '') {
            setErrorCategory(true)
            errorMessage = 'Category cannot empty'
        }

        if (date == null) {
            setErrorDate(true)
            if (errorMessage != '') {
                errorMessage += ', '
            }

            errorMessage += 'Date cannot empty'
        }

        if (name == '') {
            setErrorName(true)
            if (errorMessage != '') {
                errorMessage += ', '
            }

            errorMessage += 'Name cannot empty'
        }

        if (description == '') {
            setErrorDescription(true)
            if (errorMessage != '') {
                errorMessage += ', '
            }
            errorMessage += 'Description cannot empty'
        }

        if (errorMessage == '') {
            showAlert()
        } else {
            Toast.show({
                text: errorMessage,
                duration: 1000
            })
        }
    }

    function showAlert() {
        Alert.alert(
            'Konfirmasi',
            'Apakah data yang anda input sudah benar?',
            [
                {
                    text: 'Tidak',
                    onPress: () => console.log('dismiss dialog'),
                    style: 'cancel'
                },
                {
                    text: "Ya",
                    onPress: () => submitTask()

                }
            ]
        )
    }

    async function submitTask() {
        let dataProfile = await AsyncStorage.getItem("DATA_PROFILE")

        if (dataProfile != null) {
            let profile = JSON.parse(dataProfile)

            let responseUserId = profile.leaderId > 0 ? profile.leaderId : profile.Dimensions

            let params = {
                id: 0,
                name: name,
                description: description,
                request_date: moment(date).format('YYYY-MM-DD'),
                assign_user: profile.id,
                response_user: responseUserId,
                category: category,
                status: 'W'
            }

            let { acknowledge, message } = await createTask(params)

            if (acknowledge == true) {
                Toast.show({
                    text: "Succes Update data",
                    duration: 1000
                })

                if(route.params != null && route.params.isUpdated != null){
                    route.params.isUpdated(true)
                }

                navigation.goBack();
            } else {
                Toast.show({
                    text: message,
                    duration: 1000
                })

            }
        }

    }

    return (
        <Container>
            <SafeAreaView />
            <Header>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            type='AntDesign'
                            name='arrowleft'
                            style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title>Create Task</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <Card style={{ padding: 16 }}>
                    <Text style={styles.textField}>Category</Text>
                    <Item regular error={errorCategory} style={styles.itemPicker}>
                        <View style={{ flex: 1 }}>
                            <Picker
                                placeholder='Select Category'
                                placeholderIconColor='black'
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                selectedValue={category}
                                onValueChange={onValueChange.bind(this)}
                            >
                                {renderCategoryList()}
                            </Picker>
                        </View>
                    </Item>
                    <Text style={styles.textField}>Input Date</Text>
                    <Item regular error={errorDate} style={styles.itemPicker}>
                        <Icon type='Entypo' name='calendar' />
                        <View style={{ flex: 1 }}>
                            <DatePicker
                                defaultDate={new Date(2020, 5, 18)}
                                minimumDate={new Date(2019, 5, 18)}
                                maximumDate={new Date(2025, 5, 18)}
                                locale={"en"}
                                formatChosenDate={date => {
                                    return moment(date).format("DD MMM YYYY")
                                }}
                                placeHolderText={'Input Date'}
                                placeHolderTextStyle={{ color: '#d3d3d3' }}
                                onDateChange={onSelectedDate}
                            />
                        </View>
                    </Item>
                    <Text style={styles.textField}>Task Name</Text>
                    <Item regular error={errorName} style={styles.formItem}>
                        <Input
                            value={name}
                            keyboardType='default'
                            autoFocus={false}
                            onChangeText={(text) => {
                                onChangeName(text)
                            }}
                            placeholder="Input Task Name" />

                    </Item>
                    <Text style={styles.textField}>Description</Text>
                    <Item regular error={errorDescription} style={styles.formItem}>
                        <Input
                            value={description}
                            style={{ height: heightDevice / 5 ,textAlignVertical: "top"}}
                            keyboardType='default'
                            autoFocus={false}
                            multiline
                            onChangeText={(text) => {
                                onChangeDescription(text)
                            }}
                            placeholder="Input Description" />
                    </Item>
                </Card>
                <Button onPress={() => validateData()} style={{ marginTop: 10 }} success rounded block>
                    <Text>Save</Text>
                </Button>

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
    textField: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    itemPicker: {
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row-reverse'
    },
    formItem: {
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})