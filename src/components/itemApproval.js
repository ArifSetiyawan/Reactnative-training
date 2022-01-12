import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';
import moment from 'moment';

export default class ItemApproval extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { 
            id, name, description, request_date, category, assign_user, 
            assign_user_name, response_date, response_message, response_user, 
            response_user_name, status
        } = this.props.data;

        let dayRequest      = moment(request_date).utc().format('DD');
        let monthRequest    = moment(request_date).utc().format('MMM');
        let bgStatus        = status == 'A' ? 'green' : (status == 'R' ? 'red' : 'orange');
        let shownRequestDate = status == 'A' || status == 'R' ? moment(request_date).utc().format('DD MMM YYYY') : '';
        
        return (
            <Card>
                <CardItem>
                    <TouchableOpacity 
                    onPress={() => this.props.onClickItem(this.props.data)}
                    style={{ flexDirection: 'row'}}>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.viewReverse, { backgroundColor: bgStatus, borderRadius: 5, padding: 5, paddingHorizontal: 10 }]}>
                                <Text style={[styles.textStatus, { color: '#FFFFFF' }]}>{status}</Text>
                                <Text style={[styles.taskName, { color: '#FFFFFF' }]}>{assign_user_name}</Text>
                            </View> 
                            <View style={[{ flex: 1, padding: 10 }]}>
                                <Text style={styles.taskName}>{name}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10  }}>
                                    <Text style={styles.category}>{category}</Text>
                                    <Text style={{ flex: 1, textAlign: 'right'}}>{shownRequestDate}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    viewDate: {
        backgroundColor: '#1f8cdd',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flex: 1,
        marginRight: 10
    },
    viewDateDay: {
        fontSize: 16, 
        color: '#FFFFFF'
    },
    viewDateMonth: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    viewReverse: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    viewStatus: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    textStatus: {
        fontSize: 14,
        color: '#FFFFFF'
    },
    dateStatus: {
        fontSize: 12,
        marginTop: 5,
        alignSelf: 'flex-end'
    },
    category: {
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
        color: '#515456'
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    }
})