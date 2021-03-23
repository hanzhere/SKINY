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
        { name: "Black hole", isChoose: false },
        { name: "Oil Skin", isChoose: false },
        { name: "Mole", isChoose: false },
        { name: "Lo chan long to", isChoose: false },
        { name: "Nhieu long", isChoose: false },
    ])
    const [routines, setRoutines] = useState([
        { name: 'Routine', isChoose: false },
        { name: 'Mole', isChoose: false },
        { name: 'Bac', isChoose: false },
        { name: 'Bca', isChoose: false },
        { name: 'Abc', isChoose: false },
        { name: 'DMC', isChoose: false }
    ])
    const [skinGoals, setSkinGoals] = useState([
        { name: 'Skingoal fat', isChoose: false },
        { name: 'Mole', isChoose: false },
        { name: 'Bac', isChoose: false },
        { name: 'Bca', isChoose: false },
        { name: 'Abc', isChoose: false },
        { name: 'DMC', isChoose: false }
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

        // console.log(auth().currentUser.uid)
        db.ref(`users/${uuid}/user_skin`).set({
            skin_status: skinStatusTemp,
            skin_goals: skinGoalsTemp,
            routines: routinesTemp
        }).then(() => navigation.navigate('HomeScreen'))
        db.ref(`for_user/${uuid}`).set({
            product_id: ['1', '2', '4', '5', '6']
        })
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
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 54
                    }}>
                    <Text
                        style={{
                            fontFamily: "Saol",
                            fontSize: 32,
                            color: COLOR.BLACK
                        }}>{EN_TEXT.HI}, Sonha</Text>
                    <View style={{ width: 172, height: 1, backgroundColor: COLOR.BLACK, marginTop: 4 }} />
                    <Text
                        style={{
                            marginTop: 16,
                            fontFamily: "Saol",
                            fontSize: 18,
                            color: COLOR.BLACK
                        }}>{EN_TEXT.LET_US_KNOW}</Text>

                    <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.BLACK, marginTop: 28 }}>
                        {{
                            1: EN_TEXT.SKIN_STATUS,
                            2: EN_TEXT.SKIN_ROUTINES,
                            3: EN_TEXT.SKIN_GOALS,
                            4: EN_TEXT.YOUR_SKIN
                        }[pageIndex]}
                    </Text>
                </View>

                <View style={{
                    width: DIMENSION.width - 24 * 4,
                    height: DIMENSION.height / 2 - 24,
                    marginTop: 24,
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

