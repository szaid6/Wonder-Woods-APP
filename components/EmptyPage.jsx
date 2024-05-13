import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { router } from 'expo-router';


const EmptyPage = ({ image, title, subTitle, handlePress }) => {
    return (
        <View
            className="flex justify-center items-center h-[80vh] "
        >
            <Image
                source={image}
                className="w-[150px] h-[220px]"
                resizeMode="contain"
            />
            <Text className="text-2xl font-pbold text-primary-dark mt-4">
                {title}
            </Text>
            <TouchableWithoutFeedback
                onPress={handlePress}
            >
                <Text className="text-center text-[16px] font-pregular text-primary mt-2">
                    {subTitle}
                </Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default EmptyPage