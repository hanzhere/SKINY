import React, { useState, useEffect } from 'react'
import {
    View, // View
    Text, // Chữ
    Image, // Hình ảnh
    TouchableOpacity, // Nút bấm
    ScrollView // màn hình có thể kéo xuống được
} from 'react-native'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import { auth, db } from '../../firebaseConfig'
import * as ImagePicker from 'expo-image-picker'

export default function AddInfoScreen({ navigation }) {
    // khoi tao danh sach skin status
    const [skinStatus, setSkinStatus] = useState([
        { name: "Normal Skin", isChoose: false, img: require('../images/11.jpg') },
        { name: "Combanation Skin", isChoose: false, img: require('../images/22.jpg') },
        { name: "Dry Skin", isChoose: false, img: require('../images/33.jpg') },
        { name: "Oily Skin", isChoose: false, img: require('../images/44.jpg') },
        { name: "Acne Skin", isChoose: false, img: require('../images/55.jpg') }
    ])

    // khoi tao danh sach routines
    const [routines, setRoutines] = useState([
        { name: "Micellar Water", isChoose: false, img: require('../images/111.jpg') },
        { name: "Cleanser", isChoose: false, img: require('../images/222.jpg') },
        { name: "Toner", isChoose: false, img: require('../images/333.jpg') },
        { name: "Chemical Exfoliant", isChoose: false, img: require('../images/444.jpg') },
        { name: "Serum", isChoose: false, img: require('../images/555.jpg') },
        { name: "Moisturizing Face Cream", isChoose: false, img: require('../images/666.jpg') },
        { name: "Sunscreen", isChoose: false, img: require('../images/777.jpg') },
        { name: "Overnight Mask", isChoose: false, img: require('../images/888.jpg') }
    ])

    // khoi tao danh sach skin goals
    const [skinGoals, setSkinGoals] = useState([
        { name: "Less Acnes", isChoose: false, img: require('../images/1.jpg') },
        { name: "Light Skin", isChoose: false, img: require('../images/2.jpg') },
        { name: "Blurred", isChoose: false, img: require('../images/3.jpg') },
        { name: "Tone Lift", isChoose: false, img: require('../images/4.jpg') },
        { name: "Less Visible Lines and Wrinkles", isChoose: false, img: require('../images/5.jpg') },
        { name: "Youthful-looking Skin", isChoose: false, img: require('../images/6.jpg') },
        { name: "Smaller-looking Pores", isChoose: false, img: require('../images/7.jpg') },
        { name: "Control Oil", isChoose: false, img: require('../images/8.jpg') },
    ])

    // khởi tạo biến lưu trữ đường dẫn của ảnh
    const [image, setImage] = useState(null);

    // hàm xử lí khi mỗi skin status được chọn
    const handleChangeSkinStatus = (i) => {
        let temp = skinStatus
        temp[i].isChoose = !temp[i].isChoose
        // cập nhật lại danh sách sau khi có một hoặc nhiều lựa chọn được chọn
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

    // khởi tạo giá trị để chuyển lựa chọn, mặc định 1 là skin status
    // 2 là routines, 3 là skin goals
    const [pageIndex, setPageIndex] = useState(1)

    useEffect(() => {
        // mỗi lần bấm nút NEXT thì giá trị pageIndex tăng lên 1, 
        // nếu pageIndex > 4 thì chuyển sang trang Homescreen
        pageIndex > 4 ? navigation.navigate("HomeScreen") : null
    }, [pageIndex])

    // nếu bấm nút next thì pageIndex tăng lên 1
    const handleNextBtnPress = () => {
        setPageIndex(pageIndex => pageIndex + 1)
    }

    // pageIndex = 4 thì tiến hành cập nhật danh sách người dùng đã chọn lên database
    const handleDoneBtn = () => {
        let skinStatusTemp = []
        let skinGoalsTemp = []
        let routinesTemp = []
        let uuid = auth().currentUser.uid // lấy uid của người dùng

        // lọc ra những lựa chọn được người dùng chọn
        skinStatus.filter(e => e.isChoose ? skinStatusTemp.push(e.name) : null)
        skinGoals.filter(e => e.isChoose ? skinGoalsTemp.push(e.name) : null)
        routines.filter(e => e.isChoose ? routinesTemp.push(e.name) : null)

        // cập nhật lên database
        db.ref(`users/${uuid}/user_skin`).set({
            skin_status: skinStatusTemp,
            skin_goals: skinGoalsTemp,
            routines: routinesTemp,
            message: 'Welcome to SKINY!',
            user_skin_image: image
        }).then(() => db.ref(`for_user/${uuid}`).set({
            product_id: ['1', '2', '4', '5', '6']
        }).then(() => navigation.navigate('HomeScreen'))) // sau khi cập nhật xong thì chuyển sang trang homescreen
    }

    // hàm chọn hình ảnh từ điện thoại
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    return (
        <>
            {pageIndex > 1 ? ( // nếu pageIndex > 2 thì nút quay lại mới xuất hiện
                <TouchableOpacity style={{ // tạo hình dáng cho nút quay lại
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
                    // mỗi số tương ứng với pageIndex, 1 thì là dòng chữ "Skin status", 2 thì là dòng chữ "SKin routine", tương tự
                    1: EN_TEXT.SKIN_STATUS,
                    2: EN_TEXT.SKIN_ROUTINES,
                    3: EN_TEXT.SKIN_GOALS,
                    4: EN_TEXT.SKIN_IMAGE
                }[pageIndex]}</Text>

                <View style={{
                    width: DIMENSION.width - 24 * 2,
                    height: DIMENSION.height - (24 * 7 + 50),
                    marginTop: 100,
                    // backgroundColor: "red"
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            {{
                                1: (
                                    // hiện danh sách skinStatus
                                    skinStatus.map((e, i) => (
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => handleChangeSkinStatus(i)}
                                            key={i}
                                        >
                                            <Image source={e.img} style={{ width: "100%", height: 77, opacity: e.isChoose ? 1 : .5, borderRadius: 24 }} />
                                            <Text
                                                style={{
                                                    position: 'absolute',
                                                    fontFamily: "Effra",
                                                    fontSize: 18,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.GREEN
                                                }} >{e.name}</Text>

                                        </TouchableOpacity>
                                    ))
                                ),
                                2: (
                                    // hiện danh sách routine
                                    routines.map((e, i) => (
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => handleChangeRoutines(i)}
                                            key={i}
                                        >
                                            <Image source={e.img} style={{ width: "100%", height: 77, opacity: e.isChoose ? 1 : .5, borderRadius: 24 }} />
                                            <Text
                                                style={{
                                                    position: 'absolute',
                                                    fontFamily: "Effra",
                                                    fontSize: 18,
                                                    color: COLOR.WHITE,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.GREEN
                                                }} >{e.name}</Text>

                                        </TouchableOpacity>
                                    ))
                                ),
                                3: (
                                    skinGoals.map((e, i) => ( // hiện danh sách skingoals
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: 8,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => handleChangeSkinGoals(i)}
                                            key={i}
                                        >
                                            <Image source={e.img} style={{ width: "100%", height: 77, opacity: e.isChoose ? 1 : .5, borderRadius: 24 }} />
                                            <Text
                                                style={{
                                                    position: 'absolute',
                                                    fontFamily: "Effra",
                                                    fontSize: 18,
                                                    color: COLOR.WHITE,
                                                    color: e.isChoose ? COLOR.WHITE : COLOR.GREEN
                                                }} >{e.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ),
                                4: (
                                    <View style={{ width: DIMENSION.width - 24 * 2, height: DIMENSION.height, alignItems: 'center' }}>
                                        {!image ? <TouchableOpacity
                                            style={{ width: 100, height: 100, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}
                                            onPress={pickImage}
                                        >
                                            <Image style={{ width: "100%", height: "100%", borderRadius: 24 }} source={require('../images/camerabackground.jpg')} />
                                            <Image style={{ width: "40%", height: "40%", position: 'absolute' }} source={require('../images/camera.png')} />
                                        </TouchableOpacity> : <Image source={{ uri: image }} style={{ width: DIMENSION.width - 24 * 2, height: "100%", borderRadius: 24 }} />}

                                        {/* {image && } */}
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

