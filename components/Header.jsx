import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import icons from '../constants/icons'
import { router } from 'expo-router'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '@env';

const Header = ({ showTitle, title, showBackButton, showNotificationIcon, showSearchBar, searchBarEditable, onSearchQueryChange }) => {
    const [form, setForm] = useState({
        search: '',
    })
    const [notificationCount, setNotificationCount] = useState(0)
    const isFocused = useIsFocused();

    useEffect(() => {
        // fetch notification count

        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                fetch(`${API_BASE_URL}/notification/count?userId=` + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        setNotificationCount(data.count);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
    }, [isFocused])

    // Ref for the search input field
    const searchInputRef = useRef(null);

    const handlePress = () => {
        // navigate to search page
        if (!searchBarEditable) {
            router.push('/search')
        }
    }

    if (searchBarEditable) {

        useEffect(() => {
            // Focus the search input field when the component mounts
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, []); // Empty dependency array ensures this effect runs only once after the component mounts
    }


    const handleSearchInputChange = (text) => {
        setForm({ ...form, search: text })

        if (onSearchQueryChange) {
            onSearchQueryChange(text); // Call the callback function with the new search query
        }
    }
    return (
        <>
            {showBackButton && (
                <View className="h-12 flex-auto w-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={1}
                        className="h-12 rounded-lg flex justify-center items-center"
                    >
                        <Image
                            source={icons.leftArrow}
                            className="w-6 h-6"
                            resizeMode='contain'
                            tintColor={'#E45412'}
                        />
                    </TouchableOpacity>
                </View >
            )}

            {/* Center Bar */}
            <View
                className="flex-auto w-80 justify-center items-center"
            >
                {showSearchBar && (
                    <>
                        <TextInput
                            ref={searchInputRef}
                            className="w-full pl-10 pb-1 pt-2 text-base text-tertiary-darker relative font-pmedium border-2 rounded-lg border-primary"
                            placeholder="Search Wonder Woods"
                            placeholderTextColor={'#F9B678'}
                            value={form.search}
                            keyboardType="default"
                            onPress={handlePress}
                            onChangeText={handleSearchInputChange}
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
                        onPress={() => router.push('/notification')}
                        activeOpacity={1}
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
                            <Text className="text-xs text-white">
                                {notificationCount > 9 ? '+9' : notificationCount}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default Header