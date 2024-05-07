import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'

import icons from '../constants/icons'

const FormField = ({ label, placeholder, type, value, handleChangeText, otherStyles, keyboardType, externalIcon, secureTextEntry }) => {
    return (
        <View className={`px-10 space-y-2 ${otherStyles}`}>
            {
                label &&
                <Text className="text-base font-pmedium">{label}</Text>
            }

            <View className="flex flex-row gap-2 w-100 bg-tertiary-lighter rounded-lg justify-center items-center">
                {/* add icon with custom color*/}
                <Image
                    source={icons[externalIcon]}
                    resizeMode='contain'
                    className="w-6 h-6"
                    style={{ tintColor: '#E45412' }}
                />
                <TextInput
                    className="w-full pl-3 py-1 text-base text-tertiary-darker font-pmedium border-2 rounded-lg border-primary"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    )
}

export default FormField