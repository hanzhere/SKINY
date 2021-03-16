import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLOR } from '../value/colors'

export default function SkinStatusItem({ list }) {
    const [listCopy, setListCopy] = useState(list)

    const handleChangeSkinStatus = (i) => {
        let temp = list
        temp[i].isChoose = !temp[i].isChoose
        setListCopy([...temp])
    }

    return (
        <>
            {listCopy.map((e, i) => (
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
            ))}
        </>
    )
}
