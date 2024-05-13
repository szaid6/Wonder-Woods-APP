import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import icons from '../constants/icons'


const FormField = ({ label, placeholder, type, value, handleChangeText, otherStyles, keyboardType, externalIcon, secureTextEntry }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`${otherStyles}`}>
            {
                label &&
                <Text className="text-base font-pmedium text-tertiary">{label}</Text>
            }

            <View className="flex flex-row gap-2 w-full bg-tertiary-lighter rounded-lg justify-center items-center">
                {/* add icon with custom color*/}

                {
                    externalIcon &&
                    <Image
                        source={icons[externalIcon]}
                        resizeMode='contain'
                        className="w-6 h-6"
                        style={{ tintColor: '#E45412' }}
                    />
                }
                <TextInput
                    className="w-full pl-3 pb-2 pt-3 text-base text-tertiary-darker relative font-pmedium border-2 rounded-lg border-primary"
                    placeholder={placeholder}
                    placeholderTextColor={'#F9B678'}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !showPassword}
                    // color of the text entered
                    style={{ color: '#f37121' }}
                />

                {
                    type === 'password' &&
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute -right-2 top-[15]"
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