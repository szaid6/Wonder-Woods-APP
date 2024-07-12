import { View, Text, TouchableWithoutFeedback, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import images from '../../constants/images';
import { router } from 'expo-router';
import EmptyPage from '../../components/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { API_BASE_URL } from '@env';

const Address = () => {

    const [user, setUser] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
        // get current user from AsyncStorage
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                setUser(userData)
                fetch(`${API_BASE_URL}/address?userId=` + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        setAddresses(data.data)
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
    }, [isFocused])

    const changeDefaultAddress = (addressId) => {

        fetch(`${API_BASE_URL}/address/default`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user['id'],
                id: addressId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    console.log('Success:', data);

                    ToastAndroid.show(
                        data.message,
                        ToastAndroid.LONG
                    )

                    router.back();
                } else {
                    console.log('Error:', data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
                <Header
                    showTitle={true}
                    title="Your Addresses"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            {isLoading && (
                <View
                    className="flex flex-1 items-center justify-center bg-white"
                >
                    <Text
                        className="text-[20px] font-psemibold text-primary-dark"
                    >
                        Loading...
                    </Text>
                </View>
            )}

            {
                !isLoading && (
                    <SafeAreaView
                        className="w-full px-4 flex-1 pb-5 bg-white"
                    >
                        {addresses.length > 0 && (
                            <View className="flex flex-row justify-end items-end">
                                <TouchableWithoutFeedback
                                    onPress={() => router.push('address-add')}
                                >
                                    <Text className="text-[16px] font-psemibold text-tertiary-light">
                                        + Add New Address
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        )}

                        <FlatList
                            data={addresses}
                            ListEmptyComponent={
                                <EmptyPage
                                    image={images.noaddress}
                                    title="No Address Found"
                                    subTitle="+ Add Address"
                                    handlePress={() => router.push('address-add')}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (

                                <View className={`w-full flex-row bg-secondary-lighter shadow-lg  rounded-lg  my-2 ${item.default === 1 ? 'border-4 border-primary-dark' : 'border-2 border-primary-light'}`}>
                                    <TouchableWithoutFeedback
                                        onPress={changeDefaultAddress.bind(this, item.id)}
                                    >
                                        <View
                                            className="bg-primary-light w-8 justify-center items-center"
                                        >
                                            <View className={`w-4 h-4 rounded-full border-2 border-primary-light ${item.default === 1 ? 'bg-primary-dark' : 'bg-white'}`} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() => router.push({
                                            pathname: 'address-update',
                                            params: {
                                                data: JSON.stringify(item)
                                            }
                                        })}
                                    >
                                        <View
                                            className="p-4"
                                        >
                                            <View className="flex">
                                                <Text className="text-[16px] font-psemibold text-tertiary-light">
                                                    {item.name}'s {item.type} Address
                                                </Text>
                                                <Text className="text-[16px] font-psemibold text-tertiary-light">
                                                    {item.phone}
                                                </Text>
                                            </View>
                                            <Text className="text-[16px] font-pregular text-tertiary-light">
                                                {item.address1}
                                                {item.address2 && `, ${item.address2}`}
                                                {item.city && `, ${item.city}`}
                                                {item.state && `, ${item.state}`}
                                                {item.district && `, ${item.district}`}
                                                {item.pincode && `, ${item.pincode}`}
                                            </Text>
                                            <Text className="text-[16px] font-pregular text-tertiary-light">
                                                {item.landmark}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                        />

                    </SafeAreaView >
                )}
        </>
    )
}

export default Address