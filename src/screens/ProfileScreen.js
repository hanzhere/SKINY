import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import CarouselCardItem from '../components/CarouselCardItem'
import Carousel from 'react-native-snap-carousel'
import { Modal, ScaleAnimation, ModalContent, ModalTitle } from 'react-native-modals'

const orderData = [
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Delivery" },
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Delivery" },
]

const discountData = [
    { percent: "20%", target: "All product", deadline: "30/2/2020", area: "IN STORE", img: require('../images/sale20.jpg') },
    { percent: "20%", target: "All product", deadline: "30/2/2020", area: "IN STORE", img: require('../images/sale20.jpg') },
    { percent: "20%", target: "All product", deadline: "30/2/2020", area: "IN STORE", img: require('../images/sale20.jpg') },
    { percent: "20%", target: "All product", deadline: "30/2/2020", area: "IN STORE", img: require('../images/sale20.jpg') },
]


export default function ProfileScreen({ username, navigation, diaries }) {
    const isCarousel = useRef(null)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }} >
                <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                        onPress={() => { }}>
                        <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 32,
                        fontFamily: "Saol",
                        color: COLOR.BLACK
                    }}>{username}</Text>
                </View>

                {/* <TouchableOpacity style={{ position: 'absolute', top: 32, right: 24 }}>
                    <View style={{ width: 32, height: 32, backgroundColor: COLOR.GRAY, borderRadius: 16 }} />
                    <View style={{ width: 16, height: 16, backgroundColor: COLOR.BROWN, borderRadius: 10, position: 'absolute', top: 0, right: -4, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Effra", fontSize: 8, color: COLOR.WHITE, marginBottom: 2 }}>8</Text>
                    </View>
                </TouchableOpacity> */}

                <ScrollView style={{ marginTop: 12, width: DIMENSION.width, flex: 1 }}>
                    {console.log(showModal)}
                    <Modal
                        onTouchOutside={() => {
                            setShowModal(() => false)
                        }}
                        //width={0.9}

                        modalTitle={
                            <ModalTitle
                                title="Modal - Scale Animation"
                                hasTitleBar={false}
                            />
                        }
                        onSwipeOut={() => setShowModal(() => false)}
                        visible={showModal}

                    >
                        <ModalContent>
                            <Text>aksfjhakjfhaskdhg</Text>
                        </ModalContent>
                    </Modal>
                    {/* <View >
                        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                            <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.DIARY}</Text>
                            <TouchableOpacity onPress={() => { setShowModal(() => true) }}>
                                <Image source={require('../images/plus.png')} style={{ width: 8, height: 8 }} resizeMode="cover" />
                            </TouchableOpacity>


                        </View>
                        {diaries.length > 0 ? diaries.map((e, i) => (
                            <TouchableOpacity key={i} style={{ flexDirection: "row", padding: 12, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", alignItems: 'center' }} onPress={() => { setShowModal(() => true) }}>
                                <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{e.date}</Text>
                                <View style={{ width: 1, height: "100%", backgroundColor: COLOR.BLACK, margin: 8 }} />
                                <Text style={{ fontSize: 12, ...styles.textStyleLight, marginRight: 70, lineHeight: 14 }}>{e.title}</Text>
                            </TouchableOpacity>
                        )) : null}
                    </View> */}
                    <View style={{ width: DIMENSION.width, }}>
                        {console.log(diaries)}
                        {diaries.length > 0 ?
                            diaries.map((e, i) => (
                                <ScrollView horizontal style={{ height: DIMENSION.height / 10 * 6, width: "100%" }}>

                                    <View style={{ justifyContent: 'center' }}>
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
                                                <Text style={{ fontFamily: "Saol", fontSize: 40, color: COLOR.WHITE, marginBottom: 4 }}>20</Text>
                                                <View style={{ width: "60%", height: 1, backgroundColor: COLOR.WHITE }}></View>
                                                <Text style={{ fontFamily: "Saol", fontSize: 40, color: COLOR.WHITE }}>02</Text>
                                            </View>

                                            <Text style={{ fontFamily: "Saol", fontSize: 18, color: COLOR.BLACK, position: 'absolute', bottom: 24, alignSelf: 'center' }}>
                                                My skin getting better
                                            </Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            ))
                            :
                            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                <Image source={require('../images/nodiary.jpg')} style={{ width: 200, height: 300, borderRadius: 24, opacity: .5 }} resizeMode="cover" />
                                <Text style={{ alignSelf: 'center', fontFamily: "Effra", fontSize: 16, color: COLOR.GREEN, position: "absolute" }}>No diary</Text>
                            </View>

                        }

                    </View>

                    <TouchableOpacity
                        style={{ width: DIMENSION.width, justifyContent: 'center', flexDirection: "row", alignItems: 'center', marginTop: 12 }}

                        onPress={() => setShowModal(() => true)}
                    >
                        <View style={{ width: 36, height: 36, backgroundColor: COLOR.GRAY, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: "Effra", color: COLOR.WHITE }}>+</Text>
                        </View>
                        <Text style={{ fontFamily: "Effra", color: COLOR.GRAY, fontSize: 12, marginLeft: 4 }}>Write today’s diary</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 24 }} >
                        <Text style={{ fontFamily: "Saol", fontSize: 16, color: "#6B6B6B", marginTop: 4, textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.v
                        </Text>
                    </View>

                    <View style={{ padding: 24 }} >
                        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                            <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.ORDER}</Text>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{EN_TEXT.SEE_ALL}</Text>
                                <Image style={{ height: 6, width: 13, marginLeft: 4 }} source={require('../images/right_arrow.png')} />
                            </TouchableOpacity>
                        </View>
                        {orderData.map((e, i) => (
                            <View key={i} style={{ flexDirection: "row", padding: 12, paddingLeft: 18, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", alignItems: 'center', borderRadius: 24 }}>
                                <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{e.date}</Text>
                                <View style={{ width: 1, height: "100%", backgroundColor: COLOR.WHITE, margin: 4 }} />
                                <Text style={{ fontSize: 12, ...styles.textStyleLight, marginRight: 70, lineHeight: 14 }}>{e.price}</Text>
                                <Text style={{ fontSize: 10, ...styles.textStyleLight, position: 'absolute', right: 24 }}>{e.status}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ padding: 24, paddingTop: 8 }} >
                        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                            <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.DISCOUNT}</Text>
                        </View>
                        <ScrollView style={{ width: "100%", height: 140, marginTop: 8 }} horizontal showsHorizontalScrollIndicator={false}>
                            {discountData.map((e, i) => (
                                <View key={i} style={{ width: 120, height: 140, backgroundColor: "green", borderRadius: 24, marginRight: 4 }}>
                                    <Image source={e.img} style={{ width: "100%", height: "100%", borderRadius: 24 }} />
                                    <View style={{ position: "absolute" }}>
                                        <Text style={{ fontSize: 30, paddingTop: 12, ...styles.textSale }}>{e.percent}</Text>
                                        <Text style={{ fontSize: 16, marginTop: -4, ...styles.textSale }}>{e.target}</Text>
                                        <Text style={{ fontSize: 10, ...styles.textSale }}>Deadline: {e.deadline}</Text>
                                    </View>
                                    <Text style={{ fontSize: 10, ...styles.textSale, position: 'absolute', bottom: 12, right: 12 }}>{e.area}</Text>

                                </View>
                            ))}

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


})
