import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, BackHandler } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem from '../components/CarouselCardItem'
import ProfileScreen from './ProfileScreen'
import { db } from '../../firebaseConfig'

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
    const [pageIndex, setPageIndex] = useState(1)

    const [products, setProducts] = useState([])

    const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ])
        return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    const getProduct = () => {
        db.ref('products/').once('value', snapshot => {
            setProducts(snapshot.val())
        })
    }

    useEffect(() => {
        getProduct()
        return () => backHandler.remove()

    }, [products]);

    return (
        <View style={{
            width: DIMENSION.width,
            height: DIMENSION.height,
            backgroundColor: COLOR.WHITE
        }}>
            {pageIndex === 1 ? (
                <ScrollView style={{
                    width: DIMENSION.width,
                    height: DIMENSION.height,
                }}
                    showsVerticalScrollIndicator={false}
                >
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
                            {console.log(products)}
                            {console.log(data)}
                            <Carousel
                                layout="stack"
                                layoutCardOffset={16}
                                ref={isCarousel}
                                data={products}
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
                    <View style={{ width: 10, height: 100 }}>

                    </View>
                </ScrollView>
            ) : <ProfileScreen usename="Sonha" />}

            {}
            <View style={{ position: 'absolute', bottom: 24, width: DIMENSION.width }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={pageIndex === 0 ? styles.bottomNavActive : styles.bottomNavInactive} onPress={() => setPageIndex(pageIndex => 0)} >
                        <Image source={require('../images/user.png')} style={{ width: pageIndex === 0 ? 20 : 16, height: pageIndex === 0 ? 20 : 16, marginLeft: pageIndex === 0 ? 4 : 2 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={pageIndex === 1 ? styles.bottomNavActive : styles.bottomNavInactive} onPress={() => setPageIndex(pageIndex => 1)}>
                        <Image source={require('../images/home.png')} style={{ width: pageIndex === 1 ? 20 : 16, height: pageIndex === 1 ? 20 : 16, }} resizeMode="center" />
                    </TouchableOpacity>

                    <TouchableOpacity style={pageIndex === 2 ? styles.bottomNavActive : styles.bottomNavInactive} onPress={() => navigation.navigate('CartScreen')}>
                        <Image source={require('../images/bag.png')} style={{ width: pageIndex === 2 ? 20 : 16, height: pageIndex === 2 ? 20 : 16, }} resizeMode="center" />
                    </TouchableOpacity>
                </View>


            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    bottomNavActive: { width: 52, height: 52, backgroundColor: COLOR.BROWN, borderRadius: 36, margin: 4, justifyContent: "center", alignItems: "center" },
    bottomNavInactive: { width: 36, height: 36, backgroundColor: COLOR.LIGHT_GREEN, borderRadius: 20, margin: 4, justifyContent: "center", alignItems: "center" }
})