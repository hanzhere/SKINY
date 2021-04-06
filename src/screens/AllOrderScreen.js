import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import NothingInList from '../components/NothingInList'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

const AllOrderScreen = ({ route, navigation }) => {
    const { orderList } = route.params

    const [modalVisible, setModalVisible] = useState(false)
    const [background, setBackground] = useState(`${COLOR.WHITE}`)

    const getTime = (timestamp) => {
        let date = new Date(timestamp)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>


            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('ProfileScreen')}>
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.ORDERS}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    {orderList.length > 0 ?
                        orderList.map((e, i) => (

                            <View key={i} style={{ width: DIMENSION.width - 24 * 2, borderRadius: 24, backgroundColor: "#EAEAEA", padding: 20, alignItems: 'center', marginBottom: 12 }}>
                                <Text style={{ fontSize: 16, ...styles.textStyle }} >{getTime(e.timestamp)}</Text>
                                <Text style={{ fontSize: 24, ...styles.textStyle }} >{e.product_price + e.delivery_fee} VND</Text>
                                <Text style={{ fontSize: 12, ...styles.textStyleEffra, color: e.status === "Handling" ? COLOR.BROWN : COLOR.GREEN }} >{e.status}</Text>
                                {
                                    e.products?.map((item, i) => (
                                        <View key={i} style={{ width: "100%", flexDirection: "row", marginTop: 12 }}>
                                            <Image source={{ uri: item.product.product_image }}
                                                style={{ width: 60, height: 60, borderRadius: 20 }} resizeMode="cover"
                                            />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 18, ...styles.textStyle }} numberOfLines={1}>{item.product.product_name}</Text>
                                                <Text style={{ fontSize: 14, ...styles.textStyle, color: COLOR.LIGHT_GREEN }}>{item.original_price * item.quantity} VND</Text>
                                            </View>
                                            <TouchableOpacity style={{
                                                width: 70,
                                                height: 24,
                                                borderRadius: 24,
                                                backgroundColor: COLOR.GREEN,
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                                onPress={() => setModalVisible(!modalVisible)}
                                            >
                                                <Text style={{ fontSize: 12, ...styles.textStyle, color: COLOR.WHITE }}>Rate</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }


                            </View>

                        ))
                        : (<NothingInList text="No order" />)
                    }
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK },
    textStyleEffra: { fontFamily: "Effra", color: COLOR.BLACK },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default AllOrderScreen
