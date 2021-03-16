import React, { useRef } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCardItem'

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

export default function HomeScreen({ navigation }) {
    const isCarousel = useRef(null)

    return (
        <View style={{
            width: DIMENSION.width,
            height: DIMENSION.height,
            backgroundColor: COLOR.WHITE
        }}>
            <ScrollView style={{
                width: DIMENSION.width,
                height: DIMENSION.height,
            }}>
                <View
                    style={{
                        width: DIMENSION.width - 24 * 2,
                        marginTop: 36,
                        alignSelf: 'center'
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "flex-end"
                    }}>
                        <Text style={{
                            fontFamily: "Saol",
                            fontSize: 28,
                            color: COLOR.BLACK
                        }}>{EN_TEXT.NEW_ARRIVALS}</Text>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                            onPress={() => navigation.navigate('ProductScreen')}
                        >
                            <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{EN_TEXT.SEE_ALL}</Text>
                            <Image style={{ height: 6, width: 13, marginLeft: 4 }} source={require('../images/right_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            width: "100%",
                            height: 400
                        }}>
                        <Carousel
                            layout="stack"
                            layoutCardOffset={16}
                            ref={isCarousel}
                            data={data}
                            renderItem={CarouselCardItem}
                            sliderWidth={DIMENSION.width - 12 * 2}
                            itemWidth={DIMENSION.width - 24 * 2 - 20}
                            hasParallaxImages={true}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.7}
                            loop={true}
                            inactiveSlideShift={10}
                            useScrollView={true}
                        />
                    </View>
                </View>

                <View style={{
                    padding: 24,
                    paddingTop: 48
                }}>
                    <Text style={{
                        fontFamily: "Saol",
                        fontSize: 28,
                        color: COLOR.BLACK
                    }}>{EN_TEXT.FOR_YOU}</Text>

                    <View style={{
                        width: "100%",
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <View style={{ width: DIMENSION.width * 55 / 100, height: DIMENSION.width * 55 / 100, backgroundColor: "red" }}>

                        </View>
                        <View style={{
                            justifyContent: "space-between"
                        }}>
                            <View style={{ width: DIMENSION.width * 30 / 100, height: DIMENSION.width * 30 / 100, backgroundColor: "green" }}>

                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForYouScreen')}
                                style={{ width: DIMENSION.width * 30 / 100, height: 72, backgroundColor: "yellow", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }}>{EN_TEXT.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{
                    padding: 24,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "flex-end"
                    }}>
                        <Text style={{
                            fontFamily: "Saol",
                            fontSize: 28,
                            color: COLOR.BLACK
                        }}>{EN_TEXT.SALES}</Text>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                            onPress={() => navigation.navigate('ProductScreen')}
                        >
                            <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{EN_TEXT.SEE_ALL}</Text>
                            <Image style={{ height: 6, width: 13, marginLeft: 4 }} source={require('../images/right_arrow.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: "100%",
                        marginTop: 20,
                    }}>
                        <View style={{
                            width: "100%",
                            height: 184,
                            backgroundColor: "yellow"
                        }}>

                        </View>

                        <ScrollView horizontal>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginRight: 8, marginTop: 12 }}></View>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginRight: 8, marginTop: 12 }}></View>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginRight: 8, marginTop: 12 }}></View>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginRight: 8, marginTop: 12 }}></View>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginRight: 8, marginTop: 12 }}></View>
                            <View style={{ width: 120, height: 148, backgroundColor: "red", marginTop: 12 }}></View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}