import React, { useRef, useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'

import { Modalize } from 'react-native-modalize';
import CustomTextInput from '../components/CustomTextInput'

export default function LandingScreen({ navigation }) {

    const [isLoginBtnPress, setIsLoginBtnPress] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeName = (value) => {
        setName(value)
    }

    const handleChangeUsername = (value) => {
        setUsername(value)
    }

    const handleChangePassword = (value) => {
        setPassword(value)

    }

    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
        setIsLoginBtnPress(true)
    };

    const handleSignUpBtnPress = () => {
        modalizeRef.current?.open();
        setIsLoginBtnPress(false)
    }


    const SignIn = () => (
        <KeyboardAvoidingView style={{ width: DIMENSION.width, height: DIMENSION.height, }}>
            <View style={{ marginTop: 80, alignItems: 'center' }}>
                <Text style={{ fontFamily: "Saol", fontSize: 32, color: COLOR.BROWN }}>{EN_TEXT.WELCOME_BACK}</Text>
                <View style={{ height: 40, width: 40 }} />
                <CustomTextInput
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    value={username}
                    onChangeValue={handleChangeUsername}
                    placeholder={EN_TEXT.USERNAME} />
                <View style={{ height: 40, width: 40 }} />
                <CustomTextInput
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    value={password}
                    onChangeValue={handleChangePassword}
                    placeholder={EN_TEXT.USERNAME} />
                <View style={{ height: 80, width: 40 }} />
                <CustomButton
                    style={{
                        width: DIMENSION.width - 48 * 2

                    }}
                    contentColor={COLOR.WHITE}
                    content={EN_TEXT.SIGN_IN}
                    color={COLOR.GREEN}
                    press={() => navigation.navigate('AddInfoScreen')} />
            </View>
        </KeyboardAvoidingView>
    )

    const SignUp = () => (
        <KeyboardAvoidingView style={{ width: DIMENSION.width, height: DIMENSION.height, }}>
            <View style={{ marginTop: 80, alignItems: 'center' }}>
                <Text style={{ fontFamily: "Saol", fontSize: 32, color: COLOR.GREEN }}>{EN_TEXT.WELCOME}</Text>
                <View style={{ height: 40, width: 40 }} />
                <CustomTextInput
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    value={name}
                    onChangeValue={handleChangeName}
                    placeholder={EN_TEXT.USERNAME} />
                <View style={{ height: 40, width: 40 }} />
                <CustomTextInput
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    value={username}
                    onChangeValue={handleChangeUsername}
                    placeholder={EN_TEXT.USERNAME} />
                <View style={{ height: 40, width: 40 }} />
                <CustomTextInput
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    value={password}
                    onChangeValue={handleChangePassword}
                    placeholder={EN_TEXT.USERNAME} />
                <View style={{ height: 80, width: 40 }} />
                <CustomButton
                    style={{
                        width: DIMENSION.width - 48 * 2
                    }}
                    contentColor={COLOR.BROWN}
                    content={EN_TEXT.SIGN_UP}
                    color={COLOR.GRAY}
                    press={() => navigation.navigate('AddInfoScreen')} />
            </View>
        </KeyboardAvoidingView>
    )

    return (
        <View style={{
            width: DIMENSION.width,
            height: DIMENSION.height,
            alignItems: 'center'
        }}>
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
                {isLoginBtnPress ? <SignIn /> : <SignUp />}
            </Modalize>

            <View style={{
                width: DIMENSION.width,
                height: 160,
                position: 'absolute',
                bottom: 0,
                padding: 24,
                justifyContent: "space-between"

            }}>
                <CustomButton press={() => { onOpen() }} content={EN_TEXT.SIGN_IN} color={COLOR.GREEN} contentColor={COLOR.WHITE} />
                <CustomButton press={() => { handleSignUpBtnPress() }} content={EN_TEXT.SIGN_UP} color={COLOR.GRAY} contentColor={COLOR.BROWN} />
            </View>

        </View>


    )
}
