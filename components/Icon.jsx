import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import images from '../constants/images'

import { IMAGE_API_BASE_URL } from '@env';

const Icon = ({ item, index, selectableFrame }) => {

    return (
        <View className={`w-24 h-[110px] flex items-center mr-1 ${index === 0 ? 'ml-4' : ''}`}>
            <View className={`w-[76px] h-[76px] rounded-lg bg-white flex items-center justify-center ${selectableFrame ? 'border-2 border-tertiary-dark' : ''}`}>
                <Image
                    source={{ uri: `${IMAGE_API_BASE_URL}/${item.image}`}}
                    className="w-[70px] h-[70px] mt-1 rounded-lg mb-1 border-2"
                    resizeMode='cover'
                />
            </View>
            <Text
                numberOfLines={2}
                className={`text-xs mt-1 font-psemibold text-center w-24 ${selectableFrame ? 'text-tertiary-dark' : 'text-primary'} `}
            >
                {item.name}
            </Text>
        </View>
    )
}

export default Icon