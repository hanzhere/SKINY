import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
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
                    height: "100%"
                }}
                resizeMode="cover"
            />
            <View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 24,
                backgroundColor: COLOR.GRAY
            }}>
                <Text style={{
                    fontFamily: "Saol",
                    fontSize: 24,
                    color: COLOR.BLACK

                }}>{item.product_name}</Text>
                <Text style={{
                    fontFamily: "Effra",
                    fontSize: 12,
                    color: COLOR.BLACK,
                    marginTop: 4
                }}>{item.product_describe}</Text>
                <Text style={{
                    fontFamily: "Saol",
                    fontSize: 16,
                    color: COLOR.BLACK,
                    marginTop: 16
                }}>{item.product_price} VND</Text>
            </View>
            {/* <Text style={styles.body}>{item.body}</Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%",
        height: "100%"
    },
})

export default CarouselCardItem