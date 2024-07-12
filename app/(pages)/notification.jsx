import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import images from '../../constants/images';
import { router } from 'expo-router';
import EmptyPage from '../../components/EmptyPage';
import icons from '../../constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '@env';

const Notification = () => {

    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // fetch notifications
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                fetch(`${API_BASE_URL}/notification?userId=` + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        // console.log('Success:', data);
                        setNotifications(data.data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        setIsLoading(true);
                    });
            })
    }, [])

    function getTimeAgo(timestamp) {
        const timestampDate = new Date(timestamp);
        const currentDate = new Date();
        const timeDifference = currentDate - timestampDate;

        // Convert milliseconds to seconds
        const secondsAgo = Math.floor(timeDifference / 1000);

        if (secondsAgo < 60) {
            return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
        }

        // Convert seconds to minutes
        const minutesAgo = Math.floor(secondsAgo / 60);

        if (minutesAgo < 60) {
            return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
        }

        // Convert minutes to hours
        const hoursAgo = Math.floor(minutesAgo / 60);

        if (hoursAgo < 24) {
            return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
        }

        // Convert hours to days
        const daysAgo = Math.floor(hoursAgo / 24);

        if (daysAgo < 30) {
            return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
        }

        // Convert days to months
        const monthsAgo = Math.floor(daysAgo / 30);

        if (monthsAgo < 12) {
            return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
        }

        // Convert months to years
        const yearsAgo = Math.floor(monthsAgo / 12);

        return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
    }

    const clearNotifications = () => {
        setNotifications([]);

        // clear notifications from server
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                fetch(`${API_BASE_URL}/notification/clear?userId=` + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })

    }

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
                <Header
                    showTitle={true}
                    title="Notifications"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView
                className="w-full px-4 flex-1 pb-5 bg-white"
            >
                {isLoading && (
                    <View className="flex flex-1 items-center justify-center bg-white">
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text className="text-[20px] font-psemibold text-primary-dark">Loading...</Text>
                    </View>
                )}

                {!isLoading &&
                    <>
                        {
                            notifications.length > 0 &&
                            <View className="flex flex-row justify-end items-end">
                                <TouchableWithoutFeedback
                                    onPress={clearNotifications}
                                >
                                    <Text className="text-[16px] font-psemibold text-tertiary-light">
                                        Clear All
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        }
                        <FlatList
                            data={notifications}
                            ListEmptyComponent={
                                <EmptyPage
                                    image={images.notification}
                                    title="No New Notifications"
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (

                                <View className="w-full flex flex-row  items-center bg-secondary-lighter shadow-lg border-2 border-primary-light rounded-lg p-4 my-2">
                                    <View>
                                        <Image
                                            source={icons.bell}
                                            className="w-8 h-8"
                                            resizeMode='contain'
                                            tintColor={'#E45412'}
                                        />
                                    </View>
                                    <View className="pl-2">
                                        <Text className="text-[14px] -mb-2 font-psemibold text-primary-dark">
                                            {item.title}
                                        </Text>
                                        <Text className="text-[12px] font-pregular text-primary">
                                            {item.message}
                                        </Text>
                                        <Text className="text-[10px] font-pregular text-tertiary">
                                            {/* convert timestamp to number of hours or minutes ago from current time */}
                                            {
                                                getTimeAgo(new Date(item.created_at).getTime())
                                            }
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </>
                }


            </SafeAreaView>
        </>
    )
}

export default Notification