import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import CartItem from '../components/CartItem'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

import { Modalize } from 'react-native-modalize';
import CustomTextInput from '../components/CustomTextInput'
import { auth, db } from '../../firebaseConfig'

export default function CartScreen({ navigation }) {
    const [cartList, setCartList] = useState([])
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [total, setTotal] = useState(0)

    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open()
        calcTotal()
    };

    const getName = () => {
        db.ref(`users/${auth().currentUser.uid}`).once('value', snap => {
            setName(() => snap.val().user_name)
        })
    }

    const getCart = () => {
        db.ref(`users/${auth().currentUser.uid}/cart`).on('value', snap => {
            let data = snap.val() ? snap.val() : {};
            setCartList(() => Object.values(data))
        })
    }

    const calcTotal = () => {
        let totalPrice = 0
        cartList.map(e => totalPrice += e.original_price * e.quantity)
        setTotal(totalPrice)
    }

    const order = () => {
        db.ref(`users/${auth().currentUser.uid}/order`).push({
            timestamp: Date.now(),
            products: cartList,
            status: "Handling",
            product_price: total,
            delivery_fee: EN_TEXT.DELIVERY_FEE_PRICE,
            phone: phone,
            name: name,
            address: address
        }).then(() => db.ref(`users/${auth().currentUser.uid}/cart`).remove().then(() => console.log("removed")))
            .then(() => navigation.navigate("OrderSuccessScreen"))
    }

    useEffect(() => {
        getCart()
        getName()
    }, [])

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
                {/* <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} />
                <CartItem productName="Nguyen son Ha" productPrice="1.600.000" quantity={5} /> */}

                {/* {cartList?.map(e => console.log(e))} */}
                {cartList.length > 0 ? (
                    cartList.map((e, i) => (
                        <CartItem key={i} productName={e.product.product_name} productPrice={e.original_price * e.quantity} quantity={e.quantity} image={e.product.product_image} />
                    ))
                ) : null}
                {console.log(cartList)}

                <View style={{ width: 10, height: 80 }} />
            </ScrollView>

            <Modalize
                ref={modalizeRef}
                modalStyle={{
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 0
                }}
                modalHeight={DIMENSION.height / 10 * 9}
                overlayStyle={{ backgroundColor: COLOR.GREEN, zIndex: -99, opacity: .2 }}
            >
                <View style={{ width: DIMENSION.width, backgroundColor: COLOR.WHITE, height: DIMENSION.height / 10 * 9 }}>
                    <View style={{ padding: 24 }}>
                        <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }}>
                            {EN_TEXT.DELIVERY_INFORMATION}
                        </Text>

                        <CustomTextInput placeholder={EN_TEXT.NAME} style={styles.textInput} value={name} onChangeValue={setName} />
                        <CustomTextInput placeholder={"Phone number"} style={styles.textInput} keyboard="number-pad" value={phone} onChangeValue={setPhone} />
                        <CustomTextInput placeholder={"Address"} style={styles.textInput} value={address} onChangeValue={setAddress} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 32, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>Product total</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>{total} VND</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>{EN_TEXT.DELIVERY_FEE}</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>{EN_TEXT.DELIVERY_FEE_PRICE} VND</Text>
                        </View>
                        <View style={{ width: "100%", height: 1, backgroundColor: COLOR.GRAY, marginTop: 24 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 20, ...styles.text }}>{EN_TEXT.TOTAL}</Text>
                            <Text style={{ fontSize: 20, ...styles.text }}>{total + EN_TEXT.DELIVERY_FEE_PRICE} VND</Text>
                        </View>
                    </View>

                    <CustomButton content={EN_TEXT.ORDER} contentColor={COLOR.WHITE} color={COLOR.GREEN} press={() => order()} style={{ position: "absolute", bottom: 0, height: 63 }} />

                </View>

            </Modalize>

            {cartList.length > 0 ? <CustomButton press={() => onOpen()} content={EN_TEXT.CHECKOUT} contentColor={COLOR.WHITE} color={COLOR.GREEN} style={{ height: 60 }} /> : null}

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