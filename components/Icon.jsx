import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import images from '../constants/images'

const Icon = ({ item, index, selectableFrame }) => {
    return (
        <View className={`w-24 h-[110px] flex items-center mr-1 ${index === 0 ? 'ml-4' : ''}`}>
            <Image
                source={images.logo}
                className="w-[70px] h-[70px] mt-1 rounded-lg mb-1"
                resizeMode='contain'
            />
            <Text
                numberOfLines={2}
                className="text-xs text-primary font-psemibold text-center w-24"
            >
                {
                    item.id % 2 === 0 ? "Category" : "Category Name will be here"
                }
            </Text>
        </View>
    )
}

export default Icon