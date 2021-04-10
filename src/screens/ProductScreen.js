import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

export default function ProductScreen({ navigation, route }) {
    const [pageIndex, setPageIndex] = useState(route.params.pageIndex)
    const { products } = route.params
    const { sales } = route.params

    const handlePage1 = () => {
        setPageIndex(0)
    }

    const handlePage2 = () => {
        setPageIndex(1)
    }

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('HomeScreen')}>
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18, marginRight: 2 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.PRODUCTS}</Text>
            </View>
            <View style={{ width: DIMENSION.width, flex: 1 }}>
                <View style={{
                    marginLeft: 24,
                    marginRight: 24,
                    flexDirection: "row",
                    justifyContent: 'space-around',

                }}>
                    <TouchableOpacity onPress={() => handlePage1()}>
                        <Text style={{
                            fontFamily: "Saol",
                            fontSize: 20,
                            color: pageIndex == 0 ? COLOR.BLACK : COLOR.GRAY
                        }}>{EN_TEXT.ALL_PRODUCT}</Text>
                        {pageIndex == 0 ? <View style={{ width: "100%", height: 1, backgroundColor: COLOR.BROWN, marginTop: 4 }} /> : null}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePage2()}>
                        <Text style={{
                            fontFamily: "Saol",
                            fontSize: 20,
                            color: pageIndex == 1 ? COLOR.BLACK : COLOR.GRAY
                        }}>{EN_TEXT.SALES}</Text>
                        {pageIndex == 1 ? <View style={{ width: "100%", height: 1, backgroundColor: COLOR.BROWN, marginTop: 4 }} /> : null}
                    </TouchableOpacity>

                </View>

                <View style={{
                    marginLeft: 24,
                    marginRight: 24,
                    flex: 1,
                    marginTop: 32,
                }}>{console.log(products)}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={pageIndex == 0 ? products : pageIndex == 1 ? sales.products_sale : null}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{
                                flex: 1,
                                borderRadius: 24,
                                flexDirection: 'column',
                                marginTop: index !== 0 && index % 2 === 0 ? -20 : 0,
                                margin: 4
                            }}
                                onPress={() => navigation.navigate('ProductDetailScreen', {
                                    item: item
                                })}
                            >
                                {index == 1 ? <View style={{ width: 10, height: 20 }} /> : null}
                                <Image style={{ height: 210, borderRadius: 24 }} source={{ uri: item.product_image }} resizeMode="cover" />
                                <View style={{
                                    position: 'absolute',
                                    padding: 12,
                                    bottom: index % 2 === 0 ? 20 : 0
                                }}>
                                    <Text style={{ fontFamily: "Saol", fontSize: 16, color: COLOR.WHITE }} numberOfLines={1}>
                                        {item.product_name}
                                    </Text>
                                    {/* <Text numberOfLines={1} style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.GRAY }}>
                                        {item.product_describe}
                                    </Text> */}
                                    <Text numberOfLines={1} style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.WHITE }} numberOfLines={1}>
                                        {item.product_price} VND
                                    </Text>
                                </View>
                                {pageIndex === 1 ?
                                    <View style={{
                                        padding: 4, paddingRight: 8, paddingLeft: 8,
                                        backgroundColor: COLOR.BROWN, position: "absolute", top: index % 2 === 0 ? 0 : index > 2 ? 0 : 20, right: 0
                                    }}>
                                        <Text style={{ fontFamily: "Saol", fontSize: 12, color: COLOR.WHITE }}>{item.percent}%</Text>
                                    </View> : null}
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ width: 20, height: 24 }} />
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 28,
    },
});
