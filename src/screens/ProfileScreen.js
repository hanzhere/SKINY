import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, TextInput } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Modal from 'react-native-modal'

import { db, auth } from '../../firebaseConfig'
import NothingInList from '../components/NothingInList'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen({ username }) {
    const [isModalVisible, setModalVisible] = useState(false)
    const [discountList, setDiscountList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
    const [diaries, setDiaries] = useState([])
    const [content, setContent] = useState("")

    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(() => !isModalVisible);
    }

    useEffect(() => {
        getOrderList()
        getDiscountList()
        getMessage()
        getDiaries()
    }, [])

    const getOrderList = () => {
        db.ref(`users/${auth().currentUser.uid}/order`).on('value', snap => {
            let data = snap.val() ? snap.val() : {}
            setOrderList(() => Object.values(data))
        })
    }

    const getDiscountList = () => {
        db.ref(`users/${auth().currentUser.uid}/discount`).on('value', snap => {
            let data = snap.val() ? snap.val() : {}
            setDiscountList(() => Object.values(data))
        })
    }

    const getMessage = () => {
        db.ref(`users/${auth().currentUser.uid}/message`).on('value', snap => {
            let data = snap.val() ? snap.val() : {}
            setMessage(() => data)
        })
    }

    const getTime = (timestamp) => {
        let date = new Date(timestamp)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    const getDiaries = () => {
        db.ref(`users/${auth().currentUser.uid}/diaries`).on('value', snap => {
            let data = snap.val() ? snap.val() : {};
            setDiaries(() => Object.values(data))
        })
    }

    const handleNavigate = () => {
        navigation.navigate('AllOrderScreen', { orderList: orderList })
    }

    const handleAddDiary = () => {
        let date = new Date(Date.now())
        let convetDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        let convetMonth = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
        db.ref(`users/${auth().currentUser.uid}/diaries`).push({
            date: convetDate,
            month: convetMonth,
            title: title,
            content: content
        })
    }

    return (
        <>
            <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }} >
                <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 32,
                        fontFamily: "Saol",
                        color: COLOR.BLACK
                    }}>{username}</Text>
                </View>

                <Modal isVisible={isModalVisible}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onBackdropPress={() => toggleModal()}
                    onBackButtonPress={() => toggleModal()}
                >
                    <View style={{
                        width: DIMENSION.width - 48 * 2, height: DIMENSION.height - 48 * 4,
                        backgroundColor: COLOR.WHITE, borderRadius: 24,
                        alignItems: 'center'
                    }}>

                        <TextInput
                            value={title}
                            onChangeText={e => setTitle(e)}
                            placeholder="Title" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 24, fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }}
                            selectionColor={COLOR.GREEN}
                        />
                        <TextInput
                            value={content}
                            onChangeText={e => setContent(e)}
                            placeholder="How's your skin today" style={{ paddingLeft: 24, paddingRight: 24, fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}
                            selectionColor={COLOR.GREEN}
                            multiline
                            numberOfLines={20}
                        />
                        <TouchableOpacity style={styles.addToDiaryBtn} onPress={handleAddDiary}>
                            <Text style={{ ...styles.textStyle, color: COLOR.WHITE }}>Add today diary</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <ScrollView style={{ marginTop: 12, width: DIMENSION.width, flex: 1 }}>
                    <View style={{ width: DIMENSION.width, }}>
                        <ScrollView horizontal style={{ height: DIMENSION.height / 10 * 6, width: "100%" }} showsHorizontalScrollIndicator={false}>
                            {diaries.length > 0 ?
                                diaries.reverse().map((e, i) => (
                                    <View style={{ justifyContent: 'center' }} key={i}>
                                        <View style={{
                                            width: 240,
                                            height: "100%",
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderRadius: 24,
                                            backgroundColor: "yellow"
                                        }}>
                                            <Image source={{ uri: 'https://i.pinimg.com/736x/d6/a9/57/d6a957f1d8045c9c973c12bf5968326f.jpg' }} style={{ width: "100%", height: "100%", borderRadius: 24 }} resizeMode="cover" />
                                            <View style={{ width: 75, height: 124, backgroundColor: COLOR.LIGHT_GREEN, position: "absolute", top: 0, left: 0, borderRadius: 24, borderTopRightRadius: 0, alignItems: 'center', justifyContent: "center" }}>
                                                <Text style={{ fontFamily: "Saol", fontSize: 40, color: COLOR.WHITE, marginBottom: 4 }}>{e.date}</Text>
                                                <View style={{ width: "60%", height: 1, backgroundColor: COLOR.WHITE }}></View>
                                                <Text style={{ fontFamily: "Saol", fontSize: 40, color: COLOR.WHITE }}>{e.month}</Text>
                                            </View>
                                            <Text style={{ fontFamily: "Saol", fontSize: 18, color: COLOR.WHITE, position: 'absolute', bottom: 24, alignSelf: 'center' }}>
                                                {e.title}
                                            </Text>
                                        </View>
                                    </View>

                                ))
                                :
                                <NothingInList text="No diary" />}
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        style={{ width: DIMENSION.width, justifyContent: 'center', flexDirection: "row", alignItems: 'center', marginTop: 12 }}
                        onPress={() => toggleModal()}>
                        <View style={{ width: 36, height: 36, backgroundColor: COLOR.GRAY, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: "Effra", color: COLOR.WHITE }}>+</Text>
                        </View>
                        <Text style={{ fontFamily: "Effra", color: COLOR.GRAY, fontSize: 12, marginLeft: 4 }}>Write today’s diary</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 24 }} >
                        <Text style={{ fontFamily: "Saol", fontSize: 16, color: "#6B6B6B", marginTop: 4, textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}>
                            {message ? `${message}` : "No message"}
                        </Text>
                    </View>

                    <View style={{ padding: 24 }} >
                        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                            <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.ORDER}</Text>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                                onPress={() => handleNavigate()}
                            >
                                <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{EN_TEXT.SEE_ALL}</Text>
                                <Image style={{ height: 6, width: 13, marginLeft: 4 }} source={require('../images/right_arrow.png')} />
                            </TouchableOpacity>
                        </View>
                        {orderList.length > 0 ? orderList.map((e, i) => (
                            <View key={i} style={{ flexDirection: "row", padding: 12, paddingLeft: 18, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", alignItems: 'center', borderRadius: 24 }}>
                                <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{getTime(e.timestamp)}</Text>
                                <View style={{ width: 1, height: "100%", backgroundColor: COLOR.WHITE, margin: 4 }} />
                                <Text style={{ fontSize: 12, ...styles.textStyleLight, marginRight: 70, lineHeight: 14 }}>{e.product_price + e.delivery_fee} VND</Text>
                                <Text style={{ fontSize: 10, ...styles.textStyleLight, position: 'absolute', right: 24 }}>{e.status}</Text>
                            </View>
                        )) : <NothingInList width={DIMENSION.width - 24 * 2} height={100} text="No order" style={{ marginTop: 20 }} />}
                    </View>

                    <View style={{ padding: 24, paddingTop: 8, width: DIMENSION.width }} >
                        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                            <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.DISCOUNT}</Text>
                        </View>
                        <ScrollView style={{ width: "100%", height: 140, marginTop: 8 }} horizontal showsHorizontalScrollIndicator={false}>
                            {discountList.length > 0 ? discountList.map((e, i) => (
                                <View key={i} style={{ width: 120, height: 140, backgroundColor: "green", borderRadius: 24, marginRight: 4 }}>
                                    <Image source={{ uri: e.img }} style={{ width: "100%", height: "100%", borderRadius: 24 }} />
                                    <View style={{ position: "absolute" }}>
                                        <Text style={{ fontSize: 30, paddingTop: 12, ...styles.textSale }}>{e.percent}</Text>
                                        <Text style={{ fontSize: 16, marginTop: -4, ...styles.textSale }}>{e.target}</Text>
                                        <Text style={{ fontSize: 10, ...styles.textSale }}>Deadline: {e.deadline}</Text>
                                    </View>
                                    <Text style={{ fontSize: 10, ...styles.textSale, position: 'absolute', bottom: 12, right: 12 }}>{e.area}</Text>

                                </View>

                            )) : (
                                <View style={{}}>
                                    <NothingInList width={DIMENSION.width - 24 * 2} height={100} text="No discount" />
                                </View>
                            )}
                        </ScrollView>
                    </View>
                    <View style={{ width: 10, height: 80 }} />
                </ScrollView>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK },
    textStyleLight: { fontFamily: "Saol", color: COLOR.WHITE },
    textSale: { fontFamily: "Effra", color: COLOR.WHITE, paddingLeft: 12, },
    addToDiaryBtn: { width: DIMENSION.width - 48 * 2 - 24 * 2, height: 40, backgroundColor: COLOR.LIGHT_GREEN, borderRadius: 24, position: "absolute", bottom: 24, justifyContent: 'center', alignItems: 'center' }

})
