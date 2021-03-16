import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem from '../components/CarouselCardItem'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

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

export default function ForYouScreen({ navigation }) {
    const isCarousel = useRef(null)
    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('HomeScreen')}
                >
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.FOR_YOU}</Text>
            </View>
            <View style={{ width: DIMENSION.width, flex: 1, backgroundColor: "red" }}>
                <View style={{
                    width: DIMENSION.width,
                    height: 168 + 24 * 2,
                    position: 'absolute',
                    bottom: 0,
                    padding: 24,
                    paddingTop: 0
                }}>
                    <Carousel
                        layout="default"
                        layoutCardOffset={16}
                        ref={isCarousel}
                        data={data}
                        renderItem={CarouselCardItem}
                        sliderWidth={DIMENSION.width - 12 * 2}
                        itemWidth={DIMENSION.width - 24 * 2 - 100}
                        hasParallaxImages={true}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        loop={true}
                        inactiveSlideShift={10}
                        useScrollView={true}
                    />
                </View>

            </View>
        </View>
    )
}
