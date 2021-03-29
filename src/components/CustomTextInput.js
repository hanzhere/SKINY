import React from 'react'
import { TextInput } from 'react-native'
import { COLOR } from '../value/colors'

export default function CustomTextInput({ value, onChangeValue, placeholder, style, isSecureTextEntry, keyboard }) {
    return (
        <TextInput
            style={{
                marginLeft: 48,
                marginRight: 48,
                paddingLeft: 24,
                height: 50,
                fontFamily: "Saol",
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: COLOR.GRAY,
                ...style
            }}
            // keyboardType={"visible-password"}
            keyboardType={keyboard}
            secureTextEntry={isSecureTextEntry}
            placeholderTextColor={COLOR.GRAY}
            placeholder={placeholder}
            onChangeText={onChangeValue}
            value={value}
        />
    )
}
