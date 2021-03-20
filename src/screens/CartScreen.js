import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import CartItem from '../components/CartItem'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

import { Modalize } from 'react-native-modalize';
import CustomTextInput from '../components/CustomTextInput'

export default function CartScreen({ navigation }) {
    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('HomeScreen')}>
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.CART}</Text>
            </View>

            <ScrollView style={{ width: DIMENSION.width, flex: 1, padding: 24 }}>
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />

                <View style={{ width: 10, height: 80 }} />
            </ScrollView>

            <Modalize
                ref={modalizeRef}
                modalStyle={{
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 0,

                }}
                modalHeight={DIMENSION.height / 10 * 9}
                overlayStyle={{ backgroundColor: COLOR.GREEN, zIndex: -99, opacity: .2 }}
            >
                <View style={{ width: DIMENSION.width, backgroundColor: COLOR.WHITE, height: DIMENSION.height / 10 * 9 }}>
                    <View style={{ padding: 24 }}>
                        <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }}>
                            {EN_TEXT.DELIVERY_INFORMATION}
                        </Text>

                        <CustomTextInput placeholder={EN_TEXT.NAME} style={styles.textInput} />
                        <CustomTextInput placeholder={"Phone number"} style={styles.textInput} />
                        <CustomTextInput placeholder={"Address"} style={styles.textInput} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 32, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>Product total</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>20.000 VND</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>{EN_TEXT.DELIVERY_FEE}</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>20.000 VND</Text>
                        </View>
                        <View style={{ width: "100%", height: 1, backgroundColor: COLOR.GRAY, marginTop: 24 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>{EN_TEXT.TOTAL}</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>40.000 VND</Text>
                        </View>
                    </View>

                    <CustomButton content={EN_TEXT.ORDER} contentColor={COLOR.WHITE} color={COLOR.GREEN} press={() => { }} style={{ position: "absolute", bottom: 0, height: 63 }} />

                </View>

            </Modalize>

            <CustomButton press={() => onOpen()} content={EN_TEXT.CHECKOUT} contentColor={COLOR.WHITE} color={COLOR.GREEN} style={{ height: 60 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#979797', marginRight: 8 },
    section: { width: DIMENSION.width, padding: 24 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center' },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK },
    textInput: { marginRight: 24, marginLeft: 24, marginTop: 12 },
    text: { fontFamily: "Saol", color: COLOR.BLACK }
})