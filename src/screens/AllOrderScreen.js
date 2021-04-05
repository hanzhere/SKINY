import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

const AllOrderScreen = ({ route, navigation }) => {
    const { orderList } = route.params
    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            {console.log(orderList)}
            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('ProfileScreen')}>
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.ORDERS}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: DIMENSION.width - 24 * 2, borderRadius: 24, backgroundColor: "green", padding: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, ...styles.textStyle }} >25/02/2020</Text>
                        <Text style={{ fontSize: 24, ...styles.textStyle }} >150.000 VND</Text>
                        <Text style={{ fontSize: 12, ...styles.textStyleEffra }} >Done</Text>
                        <View style={{ width: "100%", backgroundColor: "yellow", height: 100 }}>

                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK },
    textStyleEffra: { fontFamily: "Effra", color: COLOR.BLACK }
})

export default AllOrderScreen
