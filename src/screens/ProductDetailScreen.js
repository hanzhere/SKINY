import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import CustomButton from '../components/CustomButton'
import { auth, db } from '../../firebaseConfig'

const ReviewItem = ({ name, comment }) => {
    return (
        <View style={{ width: '100%', paddingLeft: 24, marginTop: 12 }}>
            <Text style={{ fontFamily: 'Saol', fontSize: 20, color: COLOR.BLACK }}>{name}</Text>
            <Text style={{ fontFamily: 'Effra', fontSize: 16, color: '#6B6B6B' }}>{comment}</Text>
        </View>
    )
}

export default function ProductDetailScreen({ navigation, route }) {
    const { item } = route.params
    const [price, setPrice] = useState(item.product_price)
    const [quantity, setQuantity] = useState(1)

    const handleInc = () => {
        setQuantity(quantity => quantity + 1)
    }

    const handleDec = () => {
        quantity > 1 ? (
            setQuantity(quantity => quantity - 1)
        ) : null
    }

    const addToCart = () => {
        let newProductKey = db.ref().push().key

        db.ref(`users/${auth().currentUser.uid}/cart/${newProductKey}`).set({
            product: item,
            quantity: quantity,
            original_price: price,
            key: newProductKey
        }).then(() => console.log('added to cart'))
    }

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24, zIndex: 999, width: 40, height: 40, backgroundColor: COLOR.WHITE, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.goBack('HomeScreen')}>
                <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18, marginRight: 2 }} />
            </TouchableOpacity>

            <ScrollView style={{ width: DIMENSION.width, height: DIMENSION.height, zIndex: 0 }}>
                <Image source={{ uri: item.product_image }} style={{ width: DIMENSION.width, height: DIMENSION.height / 2 + 36 }} resizeMode='cover' />

                <View style={styles.section}>
                    <Text style={{ fontFamily: 'Saol', fontSize: 36, color: COLOR.BLACK }} >{item.product_name}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <Text style={{ fontFamily: 'Saol', fontSize: 9, color: COLOR.BLACK }}>23 reviews</Text>
                    </View>

                    <Text style={{ fontFamily: 'Saol', fontSize: 16, color: "#6B6B6B", marginTop: 16 }} >{item.product_describe}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontFamily: 'Saol', fontSize: 24, color: COLOR.BLACK }} >{EN_TEXT.REVIEW}</Text>
                    {Object.keys(item.product_reviews).map((e, i) => (
                        <ReviewItem key={i} name={item.product_reviews[e].name} comment={item.product_reviews[e].comment} />

                    ))}
                    <View style={{ width: 10, height: 120 }} />
                </View>
                {Object.keys(item.product_reviews).forEach(e => e != undefined ? console.log(item?.product_reviews[e]?.name, item?.product_reviews[e]?.comment) : null)}
            </ScrollView>
            <View style={{
                width: DIMENSION.width,
                position: 'absolute',
                bottom: 0,
                zIndex: 99,
                backgroundColor: COLOR.WHITE
            }}>
                <View style={{ width: DIMENSION.width, paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.addButtonContainer} onPress={() => handleInc()}>
                            <Image style={{ width: 12, height: 12 }} resize12ethod="scale" resizeMode="center" source={require('../images/plus.png')} />
                        </TouchableOpacity>
                        <View style={{ width: 24, height: 24, backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: "Saol", color: COLOR.BLACK }}>{quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.addButtonContainer} onPress={() => handleDec()}>
                            <Image style={{ width: 12, height: 12 }} resizeMethod="scale" resizeMode="center" source={require('../images/minus.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }}>{price * quantity} VND</Text>
                </View>
                <CustomButton color={COLOR.GREEN} content={EN_TEXT.ADD_TO_CART} contentColor={COLOR.WHITE} press={() => addToCart()} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 60 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F3E037', marginRight: 8 },
    section: { width: DIMENSION.width, padding: 24 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center', borderRadius: 24 },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }
})
