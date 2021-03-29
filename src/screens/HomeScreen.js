import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, BackHandler } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem from '../components/CarouselCardItem'
import ProfileScreen from './ProfileScreen'
import { auth, db } from '../../firebaseConfig'

export default function HomeScreen({ navigation }) {
    const isCarousel = useRef(null)
    const [pageIndex, setPageIndex] = useState(1)
    const [products, setProducts] = useState([])
    const [forYour, setForYour] = useState([])
    const [forYourProductList, setForYourProductList] = useState([])
    const [sales, setSales] = useState([])

    const getProduct = async () => {
        let productList = [];
        let list = [];
        let uid = auth().currentUser.uid

        await db.ref('products/').once('value', snapshot => {
            let arr = snapshot.val()
            productList = arr.filter(function (x) {
                return x !== undefined;
            });

            db.ref(`for_user/${uid}`).once('value', snapshot => {
                snapshot.val().product_id.map(e => {
                    productList.map(pe => {
                        e == pe.product_id ? (list.push(pe)) : null
                    }),
                        setForYourProductList(() => list)

                })
            })
        }).then(() => { setProducts(() => productList) })
    }

    const getSales = () => {
        db.ref('sales/').once('value', snapshot => {
            setSales(() => snapshot.val())
        }).catch(e => console.error(e))
    }

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

    useEffect(() => {
        getProduct()
        getSales()
        return () => backHandler.remove()
    }, []);

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
                                onPress={() => navigation.navigate('ProductScreen', {
                                    pageIndex: 0,
                                    products: products,
                                    sales: sales
                                })}
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
                            <View style={{ width: DIMENSION.width * 55 / 100, height: DIMENSION.width * 55 / 100 }}>
                                <Image source={{ uri: forYourProductList[0]?.product_image }} style={{ width: "100%", height: "100%" }} resizeMode="center" />
                                {console.log(forYourProductList)}
                            </View>
                            <View style={{
                                justifyContent: "space-between"
                            }}>
                                <View style={{ width: DIMENSION.width * 30 / 100, height: DIMENSION.width * 30 / 100 }}>
                                    <Image source={{ uri: forYourProductList[1]?.product_image }} style={{ width: "100%", height: "100%" }} resizeMode="center" />
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ForYouScreen', { forYourProductList: forYourProductList })}
                                    style={{ width: DIMENSION.width * 30 / 100, height: 72, backgroundColor: COLOR.BROWN, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Saol", fontSize: 16, color: COLOR.WHITE }}>{EN_TEXT.SEE_ALL}</Text>
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
                                onPress={() => navigation.navigate('ProductScreen', {
                                    pageIndex: 1,
                                    products: products,
                                    sales: sales
                                })}
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
                                <Image source={{ uri: sales?.images }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />

                            </View>

                            <ScrollView horizontal>
                                {sales?.products_sale?.map((e, i) => (
                                    <View style={{ width: 120, height: 148, marginRight: 8, marginTop: 12 }} key={i}>
                                        <Image source={{ uri: e?.product_image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" resizeMethod="scale" />
                                        <View style={{
                                            padding: 12,
                                            position: "absolute",
                                            bottom: 0
                                        }}>
                                            <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.BLACK }}>{e?.product_name}</Text>
                                            <Text style={{ fontFamily: "Saol", fontSize: 10, color: COLOR.BLACK }}>{e?.product_price} VND</Text>
                                        </View>
                                        <View style={{ padding: 4, paddingRight: 8, paddingLeft: 8, backgroundColor: COLOR.BROWN, position: "absolute", top: 0, right: 0 }}>
                                            <Text style={{ fontFamily: "Saol", fontSize: 10, color: COLOR.WHITE }}>{e?.percent}%</Text>
                                        </View>
                                    </View>
                                )
                                )}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ width: 10, height: 100 }}>

                    </View>
                </ScrollView>
            ) : <ProfileScreen username="Sonha" />}

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