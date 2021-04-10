import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native'
import { auth, db } from '../../firebaseConfig'
import { COLOR } from '../value/colors'
import { DIMENSION } from '../value/dimension'
import { EN_TEXT } from '../value/strings'
import Modal from 'react-native-modal'
import * as ImagePicker from 'expo-image-picker'

const ExploreScreen = ({ navigation }) => {
    const [blogList, setBlogList] = useState([])
    const [content, setContent] = useState("")
    const [isModalVisible, setModalVisible] = useState(false)
    const [image, setImage] = useState(null)
    const [username, setUsername] = useState("")

    const toggleModal = () => {
        setModalVisible(() => !isModalVisible)
    }

    const getBlogList = () => {
        db.ref('blogs').once('value', snap => {
            let data = snap.val() ? snap.val() : {}
            setBlogList(() => Object.values(data))
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const getUsername = () => {
        db.ref(`users/${auth().currentUser.uid}`).on('value', snapshot => setUsername(() => snapshot.val().user_name))
    }

    const postBlog = () => {
        db.ref('blogs').push({
            timestamp: Date.now(),
            username: username,
            content: content,
            image: image,
        }).then(() => {
            setContent("")
            setImage(null)
            toggleModal()
        })
    }

    useEffect(() => {
        getBlogList()
        getUsername()

    }, [])

    const timeDifference = (current, previous) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    return (
        <View style={{ width: DIMENSION.width, height: DIMENSION.height, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 36, left: 24 }}
                    onPress={() => navigation.goBack('HomeScreen')}>
                    <Image source={require('../images/back_btn.png')} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "Saol",
                    color: COLOR.BLACK
                }}>{EN_TEXT.EXPLORE}</Text>
            </View>

            <Modal isVisible={isModalVisible}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onBackdropPress={() => toggleModal()}
                onBackButtonPress={() => toggleModal()}
            >
                <View style={{
                    width: DIMENSION.width - 48 * 2,
                    backgroundColor: COLOR.WHITE, borderRadius: 24,
                    alignItems: 'center'
                }}>
                    <TextInput
                        value={content}
                        onChangeText={e => setContent(e)}
                        placeholder="What you want to share?" style={{ padding: 24, fontFamily: "Saol", fontSize: 16, color: COLOR.BLACK }}
                        selectionColor={COLOR.GREEN}
                        multiline
                        numberOfLines={10}
                    />

                    {!image ? <TouchableOpacity
                        style={{ width: 70, height: 70, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}
                        onPress={pickImage}
                    >
                        <Image style={{ width: "100%", height: "100%", borderRadius: 24 }} source={require('../images/camerabackground.jpg')} />
                        <Image style={{ width: "40%", height: "40%", position: 'absolute' }} source={require('../images/camera.png')} />
                    </TouchableOpacity> : <Image source={{ uri: image }} style={{ width: DIMENSION.width - 48 * 2 - 24 * 2, height: "40%", borderRadius: 24 }} />}

                    <TouchableOpacity style={styles.addToDiaryBtn} onPress={postBlog}>
                        <Text style={{ ...styles.textStyle, color: COLOR.WHITE }}>Post</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={{ flex: 1, paddingBottom: 60 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={blogList}
                    renderItem={({ item, index }) => (
                        <View style={{
                            width: DIMENSION.width - 24 * 2, borderRadius: 24,
                            backgroundColor: "#EAEAEA", alignSelf: 'center',
                            marginBottom: 8
                        }}>
                            <View style={{ padding: 24 }}>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "flex-end" }}>
                                    <Text style={{ fontFamily: 'Saol', fontSize: 24, color: COLOR.BLACK }}>{item.username}</Text>
                                    <Text style={{ fontFamily: 'Effra', fontSize: 14, lineHeight: 16, color: COLOR.LIGHT_GREEN }}>{timeDifference(Date.now(), item.timestamp)}</Text>
                                </View>
                                <Text style={{ fontFamily: 'Effra', fontSize: 14, lineHeight: 16, color: "#666666", marginTop: 8 }}>{item.content}</Text>
                            </View>
                            { item?.image ? <Image style={{ width: "100%", height: 300, borderRadius: 24 }} source={{ uri: item?.image }} /> : null}

                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </View>

            <TouchableOpacity style={{
                position: 'absolute',
                bottom: 0,
                width: DIMENSION.width,
                height: 60,
                zIndex: 99,
                backgroundColor: COLOR.GREEN,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={toggleModal}
            >
                <Text style={{ fontFamily: "Saol", fontSize: 24, color: COLOR.WHITE }}>{EN_TEXT.WRITE_YOURS}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: { fontFamily: "Saol", color: COLOR.BLACK },
    textStyleLight: { fontFamily: "Saol", color: COLOR.WHITE },
    textSale: { fontFamily: "Effra", color: COLOR.WHITE, paddingLeft: 12, },
    addToDiaryBtn: { width: DIMENSION.width - 48 * 2 - 24 * 2, height: 40, backgroundColor: COLOR.LIGHT_GREEN, borderRadius: 24, position: "absolute", bottom: 24, justifyContent: 'center', alignItems: 'center' }

})

export default ExploreScreen
