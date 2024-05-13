import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import images from '../../constants/images';
import { router } from 'expo-router';
import EmptyPage from '../../components/EmptyPage';

const Address = () => {
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
                        { id: 1, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 2, name: 'Sayed Zai', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 3, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 4, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 5, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
                        { id: 6, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Office' },
                        { id: 7, name: 'Sayed Zaid', phone: '8433885667', address1: 'B-1103, Sai Crystal', address2: 'Sector 35', city: 'City', state: 'State', district: 'Raigad', pincode: '123456', landmark: 'near Proviso building', type: 'Home' },
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
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => router.push({
                                pathname: 'address-update',
                                params: {
                                    data: JSON.stringify(item)
                                }
                            })}
                        >
                            <View className="w-full bg-secondary-lighter shadow-lg border-2 border-primary-light rounded-lg p-4 my-2">
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
                    )}
                />

            </SafeAreaView>
        </>
    )
}

export default Address