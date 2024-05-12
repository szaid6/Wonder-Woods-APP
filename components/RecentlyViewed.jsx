import { View, Text, Image } from 'react-native'
import images from '../constants/images'
import React from 'react'

const RecentlyViewed = ({ items }) => {
    return (

        <View
            className="flex flex-col items-center">
            <View
                className="w-[180px] h-[180px] mb-3 rounded-lg bg-gray-200"
            >
                <Image
                    source={images.logo}
                    className="w-full h-full rounded-lg opacity-80"
                    resizeMode='contain'
                />
            </View>
            <Text
                numberOfLines={2}
                className="w-[180px] text-center text-sm text-primary font-psemibold"
            >Product Name will be here
            </Text>
        </View>

    )
}

export default RecentlyViewed