import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { COLOR } from '../value/colors'

export default function CartItem({ productName, productPrice, quantity, image }) {
    return (
        <View style={{ width: "100%", flexDirection: "row", marginTop: 12 }}>
            <View style={{ width: 100, height: 100 }} >
                <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} resizeMode="center" />
            </View>
            <View style={{ position: "absolute", bottom: 0, left: 112, width: "100%", paddingRight: 112 }} >
                <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }} numberOfLines={2} >{productName}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: 8
                }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <TouchableOpacity style={styles.addButtonContainer}>
                            <Image style={{ width: 12, height: 12 }} resize12ethod="scale" resizeMode="center" source={require('../images/plus.png')} />
                        </TouchableOpacity>
                        <View style={{ width: 24, height: 24, backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: "Saol", color: COLOR.BLACK }}>{quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.addButtonContainer}>
                            <Image style={{ width: 12, height: 12 }} resizeMethod="scale" resizeMode="center" source={require('../images/minus.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }}>{productPrice} VND</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#979797', marginRight: 8 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center' },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }
})
