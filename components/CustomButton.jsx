import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

const CustomButton = ({ title, disabled, handlePress, containerStyles, textStyles, isLoading, leftIcon, rightIcon }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={isLoading || disabled}
            activeOpacity={0.8}
            className={`border-2 border-primary rounded-xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} >
            {
                leftIcon &&
                <Image
                    source={icons[leftIcon]}
                    resizeMode='contain'
                    className="w-6 h-6 ml-3"
                    style={{ tintColor: '#E45412' }}
                />
            }
            <Text className={`font-psemibold text-center py-2 px-4 ${textStyles}`}>
                {title}
            </Text>
            {
                rightIcon &&
                <Image
                    source={icons[rightIcon]}
                    resizeMode='contain'
                    className="w-6 h-6 mr-3"
                    style={{ tintColor: '#E45412' }}
                />
            }
        </TouchableOpacity>
    )
}

export default CustomButton