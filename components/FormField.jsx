import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import icons from '../constants/icons'


const FormField = ({ label, placeholder, type, value, handleChangeText, otherStyles, keyboardType, externalIcon, secureTextEntry }) => {

    const [showPassword, setShowPassword] = useState(false)

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
                    className="w-full pl-3 pb-2 pt-3 text-base text-tertiary-darker relative font-pmedium border-2 rounded-lg border-primary"
                    placeholder={placeholder}
                    placeholderTextColor={'#F9B678'}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !showPassword}
                />

                {
                    type === 'password' &&
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-3"
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            resizeMode='contain'
                            className="w-6 h-6"
                            style={{ tintColor: '#E45412' }} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default FormField