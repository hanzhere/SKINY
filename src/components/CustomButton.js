import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function CustomButton({ press, content, color, contentColor, style }) {
    return (
        <TouchableOpacity style={{
            width: "100%",
            height: 50,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 24,
            ...style
        }}
            onPress={press}
        >
            <Text style={{
                fontFamily: "Saol",
                fontSize: 20,
                color: contentColor
            }}>{content}</Text>
        </TouchableOpacity>
    )
}
