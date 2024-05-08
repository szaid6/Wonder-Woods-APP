import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={isLoading}
            activeOpacity={0.8}
            className={`border-2 border-primary rounded-xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} >
            <Text className={`font-psemibold text-center py-2 px-4 ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton