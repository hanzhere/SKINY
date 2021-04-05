import React from 'react'
import { View, Text, Image } from 'react-native'
import { COLOR } from '../value/colors'

const img = [
    { url: require('../images/nothing1.jpg') },
    { url: require('../images/nothing2.jpg') },
    { url: require('../images/nothing3.jpg') },
    { url: require('../images/nothing4.jpg') },
    { url: require('../images/nothing5.jpg') },
    { url: require('../images/nothing6.jpg') },
    { url: require('../images/nothing7.jpg') },
    { url: require('../images/nothing8.jpg') }
]

const NothingInList = ({ width = 200, height = 300, text, style }) => {

    return (
        <View style={{ width, height, borderRadius: 24, opacity: .5, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', ...style }}>
            <Image source={img[Math.floor(Math.random() * img.length)].url} style={{ width, height, borderRadius: 24, opacity: .5 }} resizeMode="cover" />
            <Text style={{ alignSelf: 'center', fontFamily: "Effra", fontSize: 16, color: COLOR.GREEN, position: "absolute" }}>{text}</Text>
        </View>
    )
}

export default NothingInList
