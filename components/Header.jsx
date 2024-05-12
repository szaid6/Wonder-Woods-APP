import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { router } from 'expo-router'

const Header = ({ showTitle, title, showBackButton, showNotificationIcon, showSearchBar, searchBarEditable }) => {
    const [form, setForm] = useState({
        search: '',
    })

    const handlePress = () => {
        console.log('Search bar pressed');
        // navigate to search page
        if (!searchBarEditable) {
            router.push('search')
        } else {
            console.log('Search functionality');
            // search functionality
        }
    }

    return (
        <>
            {!showSearchBar &&
                <View className="h-12 flex-auto w-10">
                    {showBackButton && (
                        // Go Back Button 
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="h-12 rounded-lg flex justify-center items-center"
                        >
                            <Image
                                source={icons.leftArrow}
                                className="w-6 h-6"
                                resizeMode='contain'
                                tintColor={'#E45412'}
                            />
                        </TouchableOpacity>
                    )}
                </View >
            }

            {/* Center Bar */}
            <View
                className="flex-auto w-80 justify-center items-center"
            >
                {showSearchBar && (
                    <>
                        <TextInput
                            className="w-full pl-10 pb-1 pt-2 text-base text-tertiary-darker relative font-pmedium border-2 rounded-lg border-primary"
                            placeholder="Search Wonder Woods"
                            placeholderTextColor={'#F9B678'}
                            value={form.search}
                            keyboardType="default"
                            onPress={handlePress}
                        />

                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            tintColor={'#E45412'}
                            className="w-5 h-5 absolute left-3 top-3"
                        />
                    </>
                )}

                {showTitle && (
                    <Text className="text-2xl text-tertiary font-psemibold">{title}</Text>
                )}

            </View>

            {/* Notification Icon */}
            {showNotificationIcon && (
                <View
                    className="h-12 flex-none w-10"
                >
                    <TouchableOpacity
                        onPress={() => router.push('notification')}
                        className="h-12 rounded-lg flex justify-center items-center"
                    >
                        <Image
                            source={icons.bell}
                            className="w-8 h-8 relative"
                            resizeMode='contain'
                            tintColor={'#E45412'}
                        />
                        {/* counter */}
                        <View className="w-5 h-5 bg-primary rounded-full absolute top-0 right-0 flex justify-center items-center">
                            <Text className="text-xs text-white">+9</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default Header