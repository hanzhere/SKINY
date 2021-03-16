import React from 'react'
import { TextInput } from 'react-native'
import { COLOR } from '../value/colors'

export default function CustomTextInput({ value, onChangeValue, placeholder, style }) {
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
            placeholderTextColor={COLOR.GRAY}
            placeholder={placeholder}
            onChangeText={text => onChangeValue(text)}
            value={value}
        />
    )
}
