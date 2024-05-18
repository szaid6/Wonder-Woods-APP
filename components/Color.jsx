import { View, Text, Image } from 'react-native'
import React from 'react'

const Color = ({ index, data, selected }) => {
    return (
        <View
            className={`border rounded-md border-primary-light mr-3 ${selected ? 'selected' : ''} ${index === 0 ? 'ml-3' : ''}`}
        >
            <View
                className="flex flex-row items-center justify-between p-2 border-b border-primary-light"
            >
                <Text
                    className={`text-primary text-sm  font-psemibold`}
                >Color Name</Text>
            </View>

            {/* Product Pricing */}
            <View>
                <Image
                    className="w-48 h-36"
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    resizeMode='cover'
                ></Image>
            </View>


        </View>
    )
}

export default Color