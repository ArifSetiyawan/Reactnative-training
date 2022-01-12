import React, { Component } from 'react'
import {Text, View, StyleSheet,} from 'react-native'

export default class Title extends Component {
    render() {
        return (
            <Text {...this.props} style={[styles.title, this.props.style]}>{this.props.text}</Text>
        )
    }
}
const styles = StyleSheet.create({
    title: {
      fontSize:38,
    },
    body: {
        flex: 1 ,
        justifyContent: "center" ,
        alignItems: "center"
    },
});