import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TextInput } from 'react-native'
import NothingInList from '../components/NothingInList'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Modal from 'react-native-modal'
import { auth, db } from '../../firebaseConfig'

const AllOrderScreen = ({ route, navigation }) => {
    const { orderList } = route.params
    const [isModalVisible, setModalVisible] = useState(false)
    const [review, setReview] = useState("")
    const [username, setUsername] = useState("")

    // hàm chuyển timestamp thành thời gian dạng ngày/tháng/năm
    const getTime = (timestamp) => {
        let date = new Date(timestamp)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    // hàm lấy tên người dùng
    const getUsername = () => {
        db.ref(`users/${auth().currentUser.uid}`).on('value', snapshot => setUsername(() => snapshot.val().user_name))
    }

    // thực hiện lấy tên người dùng ở lần tải trang đầu tiên
    useEffect(() => {
        getUsername()
    }, [])

    // bật tắt trang đánh giá
    const toggleModal = () => {
        setModalVisible(() => !isModalVisible);
    }

    // hàm thêm review vào database
    const addReview = (productId) => {
        db.ref(`products/${productId - 1}/product_reviews/`).push({
            name: username,
            comment: review
        }).then(() => toggleModal(), setReview(() => ""))
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
                                            {/* {console.log(item.product.product_id)} */}
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 18, ...styles.textStyle, }} >{item.product.product_name}</Text>
                                                <Text style={{ fontSize: 14, ...styles.textStyle, color: COLOR.LIGHT_GREEN }}>{item.original_price * item.quantity} VND</Text>
                                            </View>

                                            <Modal isVisible={isModalVisible}
                                                style={{ justifyContent: 'center', alignItems: 'center' }}
                                                onBackdropPress={() => toggleModal()}
                                                onBackButtonPress={() => toggleModal()}
                                            >
                                                <View style={{
                                                    width: DIMENSION.width - 48 * 2, height: DIMENSION.height - 48 * 6,
                                                    backgroundColor: COLOR.WHITE, borderRadius: 24,
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontSize: 24, ...styles.textStyle, paddingTop: 24, paddingLeft: 24, paddingRight: 24, }} numberOfLines={1}>{item.product.product_name}</Text>
                                                    <Text style={{ fontSize: 16, ...styles.textStyle, color: COLOR.LIGHT_GREEN, paddingLeft: 24, paddingRight: 24, textAlign: 'center', marginTop: 4 }} numberOfLines={5}>{item.product.product_describe}</Text>

                                                    <TextInput
                                                        value={review}
                                                        onChangeText={e => setReview(e)}
                                                        placeholder="Write review" style={{ paddingLeft: 24, paddingRight: 24, fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }}
                                                        multiline
                                                        numberOfLines={5}
                                                        selectionColor={COLOR.GREEN}
                                                    />

                                                    <TouchableOpacity style={styles.addToDiaryBtn} onPress={() => addReview(item.product.product_id)} >
                                                        <Text style={{ ...styles.textStyle, color: COLOR.WHITE }}>Add review</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Modal>

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
                                                onPress={toggleModal}
                                            >
                                                <Text style={{ fontSize: 12, ...styles.textStyle, color: COLOR.WHITE }}>Rate</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }


                            </View>

                        ))
                        : (<NothingInList text="No order" />) // nếu không có danh sách order nào thì hiện hình ảnh thông báo là No order
                    }
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK, },
    textStyleEffra: { fontFamily: "Effra", color: COLOR.BLACK },
    addToDiaryBtn: { width: DIMENSION.width - 48 * 2 - 24 * 2, height: 40, backgroundColor: COLOR.LIGHT_GREEN, borderRadius: 24, position: "absolute", bottom: 24, justifyContent: 'center', alignItems: 'center' }
})

export default AllOrderScreen
