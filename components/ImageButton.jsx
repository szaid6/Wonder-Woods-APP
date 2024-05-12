import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ImageButton = ({ icon, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={isLoading}
            activeOpacity={0.8}
            className={`justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} >
            <Image
                source={icon}
                className="w-6 h-6 "
                resizeMode='contain'
                tintColor={'#F37121'}
            />
        </TouchableOpacity>
    )
}

export default ImageButton