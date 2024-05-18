import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import images from '../../constants/images';
import { router, useLocalSearchParams } from 'expo-router';
import EmptyPage from '../../components/EmptyPage';

const Address = () => {

    const params = useLocalSearchParams();

    const [redirectBackTo, setRedirectBackTo] = useState(params.redirectBackTo || 'home')

    useEffect(() => {
        console.log("Redirect back to : ", redirectBackTo)
    }, [])

    const changeDefaultAddress = () => {
        console.log("Change default address")
        router.replace(redirectBackTo);
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
            <SafeAreaView
                className="w-full px-4 flex-1 pb-5 bg-white"
            >

                <View className="flex flex-row justify-end items-end">
                    <TouchableWithoutFeedback
                        onPress={() => router.push('address-add')}
                    >
                        <Text className="text-[16px] font-psemibold text-tertiary-light">
                            + Add New Address
                        </Text>
                    </TouchableWithoutFeedback>
                </View>

                <FlatList
                    data={[
                        { id: 1, default: 1, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 2, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 3, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 4, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 5, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 6, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 7, default: 0, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                    ]}
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
                                onPress={changeDefaultAddress}
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
        </>
    )
}

export default Address