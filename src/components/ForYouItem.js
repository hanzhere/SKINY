import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'

export const SLIDER_WIDTH = DIMENSION.width - 24 * 2
export const ITEM_WIDTH = DIMENSION.width - 24 * 2 - 40

const ForYouItem = ({ item, index }) => {
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
                    fontSize: 16,
                    color: COLOR.WHITE

                }}>{item.product_name}</Text>
                <Text style={{
                    fontFamily: "Effra",
                    fontSize: 8,
                    color: COLOR.GRAY,
                }} numberOfLines={1}>{item.product_describe}</Text>
                <Text style={{
                    fontFamily: "Saol",
                    fontSize: 12,
                    color: COLOR.WHITE,
                }}>{item.product_price} VND</Text>
                {/* <TouchableOpacity style={{ height: 32, width: "85%", position: 'absolute', right: 0, bottom: 0, backgroundColor: COLOR.GREEN, justifyContent: 'center', alignItems: 'center', borderRadius: 24 }}>
                    <Text style={{ fontFamily: 'Saol', fontSize: 12, color: COLOR.WHITE }}>Add to cart</Text>
                </TouchableOpacity> */}
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

export default ForYouItem