import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

export default function OrderSuccess({ navigation }) {


    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height }}>
            <Text style={{ fontFamily: "Saol", fontSize: 20, color: COLOR.BROWN }}>{EN_TEXT.ORDER_SUCESSFULLY}</Text>
        </View>
    )
}
