import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import CarouselCardItem from '../components/CarouselCardItem'
import Carousel from 'react-native-snap-carousel'

const diaryData = [
    { date: "25/02/2020", content: "Getting better" },
    { date: "26/02/2020", content: "Gettinggggggggg betterrrrrr Gettinggg betterrrrrr Gettinggggggggg betterrrrrr Gettinggggggggg betterrrrrr" },
    { date: "27/02/2020", content: "Gettingdddd betterddddd" },
    { date: "28/02/2020", content: "Getting better" },

]

const data = [
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
        imgUrl: "https://picsum.photos/id/11/200/300"
    },
    {
        title: "In turpis",
        body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
        imgUrl: "https://picsum.photos/id/10/200/300"
    },
    {
        title: "Lorem Ipsum",
        body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
        imgUrl: "https://picsum.photos/id/12/200/300"
    }
]

const orderData = [
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Delivery" },
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Done" },
    { date: "25/02/2020", price: "150.000 VND", status: "Delivery" },
]

const discountData = [
    { content: "Discount 20% for all product", deadline: "30/2/2020", area: "Buy in store" },
    { content: "Discount 20% for all product", deadline: "30/2/2020", area: "Buy in store" },
    { content: "Discount 20% for all product", deadline: "30/2/2020", area: "Buy in store" },
    { content: "Discount 20% for all product", deadline: "30/2/2020", area: "Buy in store" },
]


export default function ProfileScreen({ username, navigation }) {
    const isCarousel = useRef(null)

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }} >
            <View style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 36 }}>
                <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.GOOD_MORNING}</Text>
                <Text style={{ fontSize: 24, ...styles.textStyle }} >{username}</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', top: 40, right: 24 }} onPress={() => navigation.navigate('CartScreen')}>
                <View style={{ width: 32, height: 32, backgroundColor: COLOR.GRAY, borderRadius: 16 }} />
                <View style={{ width: 16, height: 16, backgroundColor: COLOR.BROWN, borderRadius: 10, position: 'absolute', top: 0, right: -4, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "Effra", fontSize: 8, color: COLOR.WHITE, marginBottom: 2 }}>8</Text>
                </View>
            </TouchableOpacity>
            <ScrollView style={{ marginTop: 12, width: DIMENSION.width, flex: 1, padding: 24 }}>

                <View >
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.DIARY}</Text>
                        <Image source={require('../images/plus.png')} style={{ width: 8, height: 8 }} resizeMode="cover" />
                    </View>
                    {diaryData.map((e, i) => (
                        <View key={i} style={{ flexDirection: "row", padding: 12, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{e.date}</Text>
                            <View style={{ width: 1, height: "100%", backgroundColor: COLOR.BLACK, margin: 4 }} />
                            <Text style={{ fontSize: 12, ...styles.textStyleLight, marginRight: 50, lineHeight: 14 }}>{e.content}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ marginTop: 20 }} >
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.YOUR_SKIN}</Text>
                    </View>
                    <View style={{
                        width: DIMENSION.width,
                        height: 240 + 24 * 2,
                        marginTop: 8,

                    }}>
                        {/* <Carousel
                            layout="default"
                            layoutCardOffset={16}
                            ref={isCarousel}
                            data={data}
                            renderItem={CarouselCardItem}
                            sliderWidth={DIMENSION.width - 24 * 2}
                            itemWidth={DIMENSION.width - 24 * 2 - 40}
                            hasParallaxImages={true}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.7}
                            loop={true}
                            inactiveSlideShift={10}
                            useScrollView={true}
                        /> */}
                    </View>
                </View>

                <View style={{ marginTop: 20 }} >
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.MESSAGES}</Text>
                    </View>
                    <Text style={{ fontFamily: "Effra", fontSize: 16, color: "#6B6B6B", marginTop: 4, marginLeft: 12 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.v
                    </Text>
                </View>

                <View style={{ marginTop: 20 }} >
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
                        <View key={i} style={{ flexDirection: "row", padding: 12, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{e.date}</Text>
                            <View style={{ width: 1, height: "100%", backgroundColor: COLOR.BLACK, margin: 4 }} />
                            <Text style={{ fontSize: 12, ...styles.textStyleLight, marginRight: 70, lineHeight: 14 }}>{e.price}</Text>
                            <Text style={{ fontSize: 10, ...styles.textStyleLight, position: 'absolute', right: 24 }}>{e.status}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ marginTop: 20 }} >
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ fontSize: 20, ...styles.textStyle }}>{EN_TEXT.DISCOUNT}</Text>
                    </View>
                    {discountData.map((e, i) => (
                        <View key={i} style={{ padding: 12, backgroundColor: COLOR.GREEN, marginTop: 4, width: "100%", justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, ...styles.textStyleLight }}>{e.content}</Text>
                            <Text style={{ fontSize: 10, ...styles.textStyleLight, marginRight: 70, lineHeight: 14, color: COLOR.GRAY }}>Deadline: {e.deadline}</Text>
                            <Text style={{ fontSize: 10, ...styles.textStyleLight, position: 'absolute', right: 24 }}>{e.area}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ width: 10, height: 120 }} />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK },
    textStyleLight: { fontFamily: "Saol", color: COLOR.WHITE },


})
