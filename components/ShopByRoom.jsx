import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'

const ShopByRoom = ({ item }) => {
    return (
        <View
            className="w-[180px] h-[180px] mb-3 rounded-lg bg-gray-200"
        >
            <Image
                source={images.logo}
                className="w-full h-full rounded-lg opacity-80"
                resizeMode='contain'
            />
            <View
                className="h-6 absolute top-3 left-0 bg-secondary-lighter flex rounded-r-full items-center justify-center"
            >
                <Text
                    className="text-xs px-2 text-primary font-psemibold"
                >Room Name
                </Text>
            </View>
        </View>
    )
}

export default ShopByRoom