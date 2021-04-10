import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'

export const SLIDER_WIDTH = DIMENSION.width - 24 * 2
export const ITEM_WIDTH = DIMENSION.width - 24 * 2 - 40

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={{ uri: item.product_image }}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 24
                }}
                resizeMode="cover"
                resizeMethod="scale"
            />
            <View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 24,
            }}>
                <Text style={{
                    fontFamily: "Saol",
                    fontSize: 24,
                    color: COLOR.WHITE

                }}>{item.product_name}</Text>
                <Text style={{
                    fontFamily: "Effra",
                    fontSize: 12,
                    color: COLOR.GRAY,
                }} numberOfLines={1}>{item.product_describe}</Text>
                <Text style={{
                    fontFamily: "Saol",
                    fontSize: 16,
                    color: COLOR.WHITE
                }}>{item.product_price} VND</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.WHITE,
        width: "100%",
        borderRadius: 24,
        height: "100%"
    },
})

export default CarouselCardItem