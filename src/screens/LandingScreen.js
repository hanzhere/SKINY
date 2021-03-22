import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

import { Modalize } from 'react-native-modalize';
import CustomTextInput from '../components/CustomTextInput'
import { auth, db } from '../../firebaseConfig'

export default function LandingScreen({ navigation }) {
    const [isLoginBtnPress, setIsLoginBtnPress] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [uuid, setUuid] = useState("")

    // useEffect(() => {
    //     setUuid(e => uuidv4())
    // }, [])

    const modalizeRef = useRef(null);

    const handleSignInBtnPress = () => {
        modalizeRef.current?.open();
        setIsLoginBtnPress(true)
    };

    const handleSignUpBtnPress = () => {
        modalizeRef.current?.open();
        setIsLoginBtnPress(false)
    }

    // function uuidv4() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    // }

    const writeToDB = async () => {
        let uuid = auth().currentUser.uid;
        await db.ref("/users/" + uuid).set({
            "user_id": uuid,
            "user_name": name,
            "user_phonenumber": "",
            "user_email": email,
            "user_password": password,
            "user_skin": {},
            "orders": {}
        })
    }

    const signUpProcess = () => {
        console.log("asd" + uuid + typeof (uuid))
        email === "" || password === "" || name === "" ? setIsValid(value => false) :
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => writeToDB().then(() => navigation.navigate('AddInfoScreen')))
                .catch(e => console.error(e))
    }

    const signInProcess = () => {
        // email === "" || password === "" ? 
        auth().signInWithEmailAndPassword(email, password).then(() => navigation.navigate('HomeScreen'))
    }

    return (
        <View style={{
            width: DIMENSION.width,
            height: DIMENSION.height,
            alignItems: 'center'
        }}>
            {console.log(uuid)}
            <StatusBar hidden />
            <Text style={{
                fontFamily: "Saol",
                fontSize: 36,
                marginTop: 102,
                color: COLOR.BLACK,
                zIndex: 999
            }}>{EN_TEXT.LOGO_NAME}</Text>
            <Modalize
                ref={modalizeRef}
                modalStyle={{
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 0
                }}
                overlayStyle={{ backgroundColor: isLoginBtnPress ? COLOR.GREEN : COLOR.BROWN, zIndex: -99 }}
            >
                {isLoginBtnPress ? (
                    <KeyboardAvoidingView style={{ width: DIMENSION.width, height: DIMENSION.height, }}>
                        <View style={{ marginTop: 80, alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Saol", fontSize: 32, color: COLOR.BROWN }}>{EN_TEXT.WELCOME_BACK}</Text>
                            <View style={{ height: 40, width: 40 }} />
                            <CustomTextInput
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                value={email}
                                onChangeValue={setEmail}
                                placeholder={EN_TEXT.EMAIL} />
                            <View style={{ height: 40, width: 40 }} />
                            <CustomTextInput
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                value={password}
                                onChangeValue={setPassword}
                                placeholder={EN_TEXT.PASSWORD} />
                            {console.log(email, password)}
                            <View style={{ height: 80, width: 40 }} />
                            <CustomButton
                                style={{ width: DIMENSION.width - 48 * 2 }}
                                contentColor={COLOR.WHITE}
                                content={EN_TEXT.SIGN_IN}
                                color={COLOR.GREEN}
                                press={() => signInProcess()} />
                        </View>
                    </KeyboardAvoidingView>
                ) : (
                    <KeyboardAvoidingView style={{ width: DIMENSION.width, height: DIMENSION.height, }}>
                        <View style={{ marginTop: 80, alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Saol", fontSize: 32, color: COLOR.GREEN }}>{EN_TEXT.WELCOME}</Text>
                            <View style={{ height: 40, width: 40 }} />
                            <CustomTextInput
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                value={name}
                                onChangeValue={setName}
                                placeholder={EN_TEXT.NAME} />
                            <View style={{ height: 40, width: 40 }} />
                            <CustomTextInput
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                value={email}
                                onChangeValue={setEmail}
                                placeholder={EN_TEXT.EMAIL} />
                            <View style={{ height: 40, width: 40 }} />
                            <CustomTextInput
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                value={password}
                                isSecureTextEntry={true}
                                onChangeValue={setPassword}
                                placeholder={EN_TEXT.PASSWORD} />
                            <View style={{ height: 80, width: 40 }} />
                            <CustomButton
                                style={{
                                    width: DIMENSION.width - 48 * 2
                                }}
                                contentColor={COLOR.BROWN}
                                content={EN_TEXT.SIGN_UP}
                                color={COLOR.GRAY}
                                press={() => signUpProcess()}
                            />
                        </View>
                    </KeyboardAvoidingView>
                )}
            </Modalize>

            <View style={{
                width: DIMENSION.width,
                height: 160,
                position: 'absolute',
                bottom: 0,
                padding: 24,
                justifyContent: "space-between"

            }}>
                <CustomButton press={() => { handleSignInBtnPress() }} content={EN_TEXT.SIGN_IN} color={COLOR.GREEN} contentColor={COLOR.WHITE} />
                <CustomButton press={() => { handleSignUpBtnPress() }} content={EN_TEXT.SIGN_UP} color={COLOR.GRAY} contentColor={COLOR.BROWN} />
            </View>

        </View>


    )
}
