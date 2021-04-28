import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import CartItem from '../components/CartItem'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

import { Modalize } from 'react-native-modalize';
import CustomTextInput from '../components/CustomTextInput'
import { auth, db } from '../../firebaseConfig'
import NothingInList from '../components/NothingInList'
import { SwipeListView } from 'react-native-swipe-list-view'


export default function CartScreen({ navigation }) {
    const [cartList, setCartList] = useState([])
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [total, setTotal] = useState(0)
    const modalizeRef = useRef(null);

    // mở trang điền thông tin giao hàng, mỗi lần mở thì tính lại tổng giá tiền nếu có thay đổi, thêm bớt sản phẩm
    const onOpen = () => {
        modalizeRef.current?.open()
        calcTotal()
    };

    // lấy tên người dùng từ database
    const getName = () => {
        db.ref(`users/${auth().currentUser.uid}`).once('value', snap => {
            setName(() => snap.val().user_name)
        })
    }

    // lấy thông tin giỏ hàng
    const getCart = () => {
        db.ref(`users/${auth().currentUser.uid}/cart`).on('value', snap => {
            let data = snap.val() ? snap.val() : {};
            setCartList(() => Object.values(data))
        })
    }

    // tính tổng tiền
    const calcTotal = () => {
        let totalPrice = 0
        cartList.map(e => totalPrice += e.original_price * e.quantity)
        setTotal(totalPrice)
    }

    // thêm order
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
        }).then(() => db.ref(`users/${auth().currentUser.uid}/cart`).remove())
            .then(() => navigation.navigate("OrderSuccessScreen"))
    }

    // lấy danh sách giỏ hàng và tên người dùng ở lần chạy đầu tiền
    useEffect(() => {
        getCart()
        getName()
    }, [])

    // xoá sản phẩm khỏi giỏ hàng
    const deleteProductFromCart = (key) => {
        db.ref(`users/${auth().currentUser.uid}/cart/${key}`).remove()
    }

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

            {cartList.length > 0 ? (
                <SwipeListView
                    useFlatList
                    data={cartList}
                    renderItem={({ item, index }) => (
                        // console.log(item)
                        <CartItem key={index} productName={item.product.product_name} productPrice={item.original_price * item.quantity} quantity={item.quantity} image={item.product.product_image} />
                    )}
                    renderHiddenItem={({ item, index }) => (
                        <TouchableOpacity style={styles.rowBack} onPress={() => deleteProductFromCart(item.key)}>
                            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                                <Text style={{ fontFamily: "Effra", fontSize: 14, color: COLOR.BROWN }}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    rightOpenValue={-75}
                />
            ) : <NothingInList text="Nothing here" />}

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

                    <CustomButton content={EN_TEXT.ORDER} contentColor={COLOR.WHITE} color={COLOR.GREEN} press={() => order()} style={{ position: "absolute", bottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 60 }} />

                </View>

            </Modalize>

            {cartList.length > 0 ? <CustomButton press={() => onOpen()} content={EN_TEXT.CHECKOUT} contentColor={COLOR.WHITE} color={COLOR.GREEN} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 60 }} /> : null}

        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#979797', marginRight: 8 },
    section: { width: DIMENSION.width, padding: 24 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center' },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK },
    textInput: { marginRight: 24, marginLeft: 24, marginTop: 12 },
    text: { fontFamily: "Saol", color: COLOR.BLACK },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        right: 24,
    },
})