import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import CustomButton from '../components/CustomButton'

const data = [
    {
        name: 'Innisfree',
        image: 'https://cdn.webshopapp.com/shops/125574/files/343278893/innisfree-innisfree-green-tea-seed-serum.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        review: [
            { name: 'Sonha', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { name: 'Hason', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { name: 'Honsa', review: 'Lorem ipsum ' }
        ]
    }
]

const ReviewItem = ({ name, comment }) => {
    return (
        <View style={{ width: '100%', paddingLeft: 24, marginTop: 12 }}>
            <Text style={{ fontFamily: 'Saol', fontSize: 20, color: COLOR.BLACK }}>{name}</Text>
            <Text style={{ fontFamily: 'Effra', fontSize: 16, color: '#6B6B6B' }}>{comment}</Text>
        </View>
    )
}

export default function ProductDetailScreen({ navigation }) {
    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24, zIndex: 999 }}
                onPress={() => navigation.goBack('HomeScreen')}>
                <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
            </TouchableOpacity>

            <ScrollView style={{ width: DIMENSION.width, height: DIMENSION.height, zIndex: 0 }}>
                <Image source={{ uri: data[0].image }} style={{ width: DIMENSION.width, height: DIMENSION.height / 2, marginTop: 36 }} resizeMode='center' />

                <View style={styles.section}>
                    <Text style={{ fontFamily: 'Saol', fontSize: 36, color: COLOR.BLACK }} >{data[0].name}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <View style={styles.rateDot} />
                        <Text style={{ fontFamily: 'Saol', fontSize: 9, color: COLOR.BLACK }}>23 reviews</Text>
                    </View>

                    <Text style={{ fontFamily: 'Saol', fontSize: 16, color: "#6B6B6B", marginTop: 16 }} >{data[0].desc}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontFamily: 'Saol', fontSize: 24, color: COLOR.BLACK }} >{EN_TEXT.REVIEW}</Text>
                    {data[0].review.map((e, i) => (
                        <ReviewItem key={i} name={e.name} comment={e.review} />

                    ))}
                    <View style={{ width: 10, height: 120 }} />
                </View>
            </ScrollView>
            <View style={{
                width: DIMENSION.width,
                position: 'absolute',
                bottom: 0,
                zIndex: 99,
                backgroundColor: COLOR.WHITE
            }}>
                <View style={{ width: DIMENSION.width, paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.addButtonContainer}>
                            <Image style={{ width: 12, height: 12 }} resize12ethod="scale" resizeMode="center" source={require('../images/plus.png')} />
                        </TouchableOpacity>
                        <View style={{ width: 24, height: 24, backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: "Saol", color: COLOR.BLACK }}>2</Text>
                        </View>
                        <TouchableOpacity style={styles.addButtonContainer}>
                            <Image style={{ width: 12, height: 12 }} resizeMethod="scale" resizeMode="center" source={require('../images/minus.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK }}>150.000 VND</Text>
                </View>
                <CustomButton color={COLOR.GREEN} content={EN_TEXT.ADD_TO_CART} contentColor={COLOR.WHITE} press={() => { }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rateDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#979797', marginRight: 8 },
    section: { width: DIMENSION.width, padding: 24 },
    addButtonContainer: { width: 24, height: 24, backgroundColor: COLOR.GRAY, justifyContent: 'center', alignItems: 'center' },
    addButton: { fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }
})
