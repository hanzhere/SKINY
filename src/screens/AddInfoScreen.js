import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import { auth, db } from '../../firebaseConfig'
import * as ImagePicker from 'expo-image-picker'

export default function AddInfoScreen({ navigation }) {
    const [skinStatus, setSkinStatus] = useState([
        { name: "Normal Skin", isChoose: false, img: require('../images/11.jpg') },
        { name: "Combanation Skin", isChoose: false, img: require('../images/22.jpg') },
        { name: "Dry Skin", isChoose: false, img: require('../images/33.jpg') },
        { name: "Oily Skin", isChoose: false, img: require('../images/44.jpg') },
        { name: "Acne Skin", isChoose: false, img: require('../images/55.jpg') }
    ])
    const [routines, setRoutines] = useState([
        { name: "Micellar Water", isChoose: false, img: require('../images/111.JPG') },
        { name: "Cleanser", isChoose: false, img: require('../images/222.JPG') },
        { name: "Toner", isChoose: false, img: require('../images/333.JPG') },
        { name: "Chemical Exfoliant", isChoose: false, img: require('../images/444.JPG') },
        { name: "Serum", isChoose: false, img: require('../images/555.JPG') },
        { name: "Moisturizing Face Cream", isChoose: false, img: require('../images/666.JPG') },
        { name: "Sunscreen", isChoose: false, img: require('../images/777.JPG') },
        { name: "Overnight Mask", isChoose: false, img: require('../images/888.JPG') }
    ])
    const [skinGoals, setSkinGoals] = useState([
        { name: "Less Acnes", isChoose: false, img: require('../images/1.JPG') },
        { name: "Light Skin", isChoose: false, img: require('../images/2.JPG') },
        { name: "Blurred", isChoose: false, img: require('../images/3.JPG') },
        { name: "Tone Lift", isChoose: false, img: require('../images/4.JPG') },
        { name: "Less Visible Lines and Wrinkles", isChoose: false, img: require('../images/5.JPG') },
        { name: "Youthful-looking Skin", isChoose: false, img: require('../images/6.JPG') },
        { name: "Smaller-looking Pores", isChoose: false, img: require('../images/7.JPG') },
        { name: "Control Oil", isChoose: false, img: require('../images/8.JPG') },
    ])
    const handleChangeSkinStatus = (i) => {
        let temp = skinStatus
        temp[i].isChoose = !temp[i].isChoose
        setSkinStatus([...temp])
    }
    const handleChangeRoutines = (i) => {
        let temp = routines
        temp[i].isChoose = !temp[i].isChoose
        setRoutines([...temp])
    }
    const handleChangeSkinGoals = (i) => {
        let temp = skinGoals
        temp[i].isChoose = !temp[i].isChoose
        setSkinGoals([...temp])
    }

    const [pageIndex, setPageIndex] = useState(1)

    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    useEffect(() => {
        pageIndex > 4 ? navigation.navigate("HomeScreen") : null
    }, [pageIndex])

    const handleNextBtnPress = () => {
        setPageIndex(pageIndex => pageIndex + 1)
    }

    const handleDoneBtn = () => {
        let skinStatusTemp = []
        let skinGoalsTemp = []
        let routinesTemp = []
        let uuid = auth().currentUser.uid
        skinStatus.filter(e => e.isChoose ? skinStatusTemp.push(e.name) : null)
        skinGoals.filter(e => e.isChoose ? skinGoalsTemp.push(e.name) : null)
        routines.filter(e => e.isChoose ? routinesTemp.push(e.name) : null)

        db.ref(`users/${uuid}/user_skin`).set({
            skin_status: skinStatusTemp,
            skin_goals: skinGoalsTemp,
            routines: routinesTemp
        }).then(() => db.ref(`for_user/${uuid}`).set({
            product_id: ['1', '2', '4', '5', '6']
        }).then(() => navigation.navigate('HomeScreen')))

    }

    return (
        <>
            {pageIndex > 1 ? (
                <TouchableOpacity style={{
                    width: 30, height: 30,
                    position: 'absolute',
                    top: 36,
                    left: 24,
                    zIndex: 99
                }} onPress={() => setPageIndex(pageIndex => pageIndex - 1)}>
                    <Image
                        source={require('../images/back_arrow.png')}
                        style={{
                            width: 18,
                            height: 18,
                        }}
                    />
                </TouchableOpacity>

            ) : null}
            {console.log(pageIndex)}
            <View
                style={{
                    width: DIMENSION.width,
                    height: DIMENSION.height,
                    alignItems: 'center'
                }}>
                <Text style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: 24,
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{{
                    1: EN_TEXT.SKIN_STATUS,
                    2: EN_TEXT.SKIN_ROUTINES,
                    3: EN_TEXT.SKIN_GOALS,
                    4: EN_TEXT.YOUR_SKIN
                }[pageIndex]}</Text>

                <View style={{
                    width: DIMENSION.width - 24 * 4,
                    height: DIMENSION.height / 2 - 24,
                    marginTop: 112,
                }}>
                    <ScrollView >
                        <View style={{
                            alignItems: 'center'
                        }}>
                            {{
                                1: (
                                    skinStatus.map((e, i) => (
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                width: "100%",
                                                marginLeft: 24,
                                                marginRight: 24,
                                                height: 50,
                                                backgroundColor: e.isChoose ? COLOR.GREEN : COLOR.LIGHT_GREEN,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: 24
                                            }}
                                            onPress={() => handleChangeSkinStatus(i)}
                                            key={i}
                                        >
                                            <Image source={e.img} style={{ width: "100%", height: "100%" }} />
                                            {/* <Text
                                                style={{
                                                    fontFamily: "Saol",
                                                    fontSize: 18,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.BLACK
                                                }} >{e.name}</Text>
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: e.isChoose ? COLOR.WHITE : COLOR.LIGHT_GREEN
                                                }} /> */}
                                        </TouchableOpacity>
                                    ))
                                ),
                                2: (
                                    routines.map((e, i) => (
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                width: "100%",
                                                marginLeft: 24,
                                                marginRight: 24,
                                                height: 50,
                                                backgroundColor: e.isChoose ? COLOR.GREEN : COLOR.LIGHT_GREEN,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: 24
                                            }}
                                            onPress={() => handleChangeRoutines(i)}
                                            key={i}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Saol",
                                                    fontSize: 18,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.BLACK
                                                }} >{e.name}</Text>
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: e.isChoose ? COLOR.WHITE : COLOR.LIGHT_GREEN
                                                }} />
                                        </TouchableOpacity>
                                    ))
                                ),
                                3: (
                                    skinGoals.map((e, i) => (
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                width: "100%",
                                                marginLeft: 24,
                                                marginRight: 24,
                                                height: 50,
                                                backgroundColor: e.isChoose ? COLOR.GREEN : COLOR.LIGHT_GREEN,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: 24
                                            }}
                                            onPress={() => handleChangeSkinGoals(i)}
                                            key={i}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Saol",
                                                    fontSize: 18,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.BLACK
                                                }} >{e.name}</Text>
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: e.isChoose ? COLOR.WHITE : COLOR.LIGHT_GREEN
                                                }} />
                                        </TouchableOpacity>
                                    ))
                                ),
                                4: (
                                    <View style={{ width: "100%", height: "100%", backgroundColor: "red" }}>

                                    </View>
                                )
                            }[pageIndex]}
                        </View>

                    </ScrollView>
                </View>

                <View
                    style={{
                        padding: 24,
                        position: 'absolute',
                        bottom: 0,
                        width: DIMENSION.width
                    }}
                >
                    {pageIndex === 4 ?
                        <CustomButton press={() => handleDoneBtn()} content={EN_TEXT.DONE} color={COLOR.BROWN} contentColor={COLOR.WHITE} />
                        :
                        <CustomButton press={() => handleNextBtnPress()} content={EN_TEXT.NEXT} color={COLOR.BROWN} contentColor={COLOR.WHITE} />

                    }
                </View>
            </View>
        </>
    )
}

