import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ForYouItem from '../components/ForYouItem'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

export default function ForYouScreen({ navigation, route }) {
    const isCarousel = useRef(null)
    const { forYourProductList } = route.params
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
            <View style={{ width: DIMENSION.width, flex: 1 }}>
                <Image style={{ width: "100%", height: "100%", borderTopLeftRadius: 24, borderTopRightRadius: 24 }} source={{ uri: "https://www.sesderma.com/on/demandware.static/-/Sites-Sesderma_USA-Library/default/dw4981e2c1/category_slider/Bloque_Categorias_PielSensible.jpg" }} resizeMode="cover" />
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
                        data={forYourProductList}
                        renderItem={ForYouItem}
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
