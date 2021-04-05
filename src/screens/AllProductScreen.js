import React from 'react'
import { View, Text } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'

const AllProductScreen = () => {
    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <Text>AllProductScreen</Text>
        </View>
    )
}

export default AllProductScreen
