import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import images from '../../constants/images';
import { router } from 'expo-router';
import EmptyPage from '../../components/EmptyPage';

const Address = () => {
    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between bg-secondary-light">
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
                className="w-full flex-1 bg-white"
            >
                <ScrollView>
                    <EmptyPage
                        image={images.noaddress}
                        title="No Address Found"
                        subTitle="+ Add Address"
                        handlePress={() => router.push('address-add')}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Address