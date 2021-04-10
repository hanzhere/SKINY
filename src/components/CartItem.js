import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'

export default function CartItem({ productName, productPrice, quantity, image }) {
    return (
        <View style={{ width: DIMENSION.width - 24 * 2, flexDirection: "row", backgroundColor: COLOR.GRAY, borderRadius: 24, alignItems: 'center', marginBottom: 4, alignSelf: 'center' }}>
            <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }} >
                <Image source={{ uri: image }} style={{ width: "90%", height: "90%", borderRadius: 20 }} resizeMode="cover" />
            </View>
            <View style={{ width: "100%", paddingRight: 120, marginLeft: 4 }} >
                <Text style={{ fontFamily: "Saol", fontSize: 20, color: COLOR.BLACK }} numberOfLines={2} >{productName}</Text>
                <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.WHITE, marginTop: 4 }} numberOfLines={1} >{quantity} {quantity > 1 ? "products" : "product"}</Text>
                <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{productPrice} VND</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#979797', marginRight: 8 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center' },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }
})
