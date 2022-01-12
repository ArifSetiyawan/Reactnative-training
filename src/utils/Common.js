import { Platform } from "react-native";

export const setID = (id) => {
    return Platform.OS === 'android' ? { accessible: true, accessibilityLabel: id } : { testID: id }
}

export const validateEmail = (email) => {
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}