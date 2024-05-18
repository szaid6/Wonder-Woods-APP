import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import images from '../../constants/images';
import EmptyPage from '../../components/EmptyPage';
import CartItem from '../../components/CartItem';

const Checkout = () => {

    const [cart, setCart] = useState([])

    const searchParams = useLocalSearchParams()
    console.log('====================================');
    console.log('SearchParams', searchParams);
    console.log('====================================');

    useEffect(() => {
        if (searchParams.cart) {
            setCart(searchParams.cart)
        }
        console.log('====================================');
        console.log('Cart', cart);
        console.log('====================================');
    }, [searchParams])

    confirmOrder = () => {
        console.log('====================================');
        console.log('Checking you out');
        console.log('====================================');
    }

    changeAddress = () => {
        console.log('====================================');
        console.log('Changing Address');
        console.log('====================================');
        router.push({
            pathname: 'address',
            params: {
                redirectBackTo: 'checkout'
            }
        })
    }

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light ">
                <Header
                    showTitle={true}
                    title="Checkout"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView
                className="w-full flex-1 bg-white"
            >
                <View
                    className="py-3 mx-5 mt-5"
                >
                    {/* Order Summary */}
                    <View
                        className="border-2 rounded-lg border-primary drop-shadow-custom"
                    >
                        <View
                            className="border-b border-primary-light rounded pb-2 pt-3"
                        >
                            <Text className="text-[18px] font-psemibold text-primary px-4">
                                Order Summary
                            </Text>
                        </View>
                        <View>
                            {/* Item total */}
                            <View
                                className="flex flex-row justify-between items-center px-4 mt-3"
                            >
                                <Text
                                    className="text-[16px] font-psemibold text-primary-dark"
                                >
                                    Items
                                </Text>
                                <Text
                                    className="text-[16px] font-psemibold text-primary"
                                >
                                    ₹ {Number(16000).toLocaleString('en-IN')}
                                </Text>
                            </View>

                            {/* Delivery total */}
                            <View
                                className="flex flex-row justify-between items-center px-4 mt-1"
                            >
                                <Text
                                    className="text-[16px] font-psemibold text-primary-dark"
                                >
                                    Delivery
                                </Text>
                                <Text
                                    className="text-[16px] font-psemibold text-primary"
                                >
                                    ₹ {Number(0).toLocaleString('en-IN')}
                                </Text>
                            </View>

                            {/* Total */}
                            <View
                                className="flex flex-row justify-between items-center px-4 mt-1"
                            >
                                <Text
                                    className="text-[16px] font-psemibold text-primary-dark"
                                >
                                    Total
                                </Text>
                                <Text
                                    className="text-[16px] font-psemibold text-primary"
                                >
                                    ₹ {Number(16000).toLocaleString('en-IN')}
                                </Text>
                            </View>

                            {/* Discount*/}
                            <View
                                className="flex flex-row justify-between items-center px-4 mt-1"
                            >
                                <Text
                                    className="text-[16px] font-psemibold text-primary-dark"
                                >
                                    Discount
                                </Text>
                                <Text
                                    className="text-[16px] font-psemibold text-primary"
                                >
                                    ₹ {Number(1000).toLocaleString('en-IN')}
                                </Text>
                            </View>

                            {/* Grand Total */}
                            <View
                                className="flex flex-row justify-between items-center px-4 mt-1"
                            >
                                <Text
                                    className="text-[22px] font-psemibold text-tertiary-light"
                                >
                                    Grand Total
                                </Text>
                                <Text
                                    className="text-[22px] font-psemibold text-tertiary-light"
                                >
                                    ₹ {Number(15000).toLocaleString('en-IN')}
                                </Text>
                            </View>

                            {/* Saved from mrp */}
                            <View
                                className="flex flex-row border-t border-primary-light justify-between items-center px-4 py-2"
                            >
                                <Text
                                    className="text-[16px] font-psemibold text-primary"
                                >
                                    You saved a total of ₹ { }
                                    <Text
                                        className="text-[16px] font-psemibold text-tertiary-light"
                                    >
                                        {Number(8000).toLocaleString('en-IN')}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Selected Address */}
                    <View
                        className="border-2 rounded-lg mt-5 border-primary drop-shadow-custom"
                    >
                        <View
                            className="flex-row items-center justify-between border-b border-primary-light rounded pb-2 pt-3 px-4"
                        >
                            <Text
                                className="text-[18px] font-psemibold text-primary"
                            >
                                Delivering To
                            </Text>

                            <TouchableWithoutFeedback
                                onPress={changeAddress}
                            >
                                <Text
                                    className="text-[12px] font-psemibold text-primary-dark"
                                >
                                    Change
                                </Text>
                            </TouchableWithoutFeedback>

                        </View>
                        <View
                            className="px-4 py-3"
                        >
                            <Text
                                className="text-[16px] font-psemibold text-primary-dark"
                            >
                                John Doe
                            </Text>
                            <Text
                                className="text-[16px] font-pregular text-primary-dark"
                            >
                                123, 4th Cross, 5th Main, 6th Block, Koramangala, Bangalore, Karnataka, 560095
                            </Text>
                            <Text
                                className="text-[16px] font-pregular text-primary-dark"
                            >
                                Near Sony World Signal
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            {/* CTA for wishlist and add to cart */}
            <View
                className="fixed bottom-0"
            >
                <CustomButton
                    title="CONFIRM ORDER"
                    containerStyles="w-full bg-primary rounded-sm"
                    textStyles="text-lg text-white"
                    handlePress={confirmOrder}
                />
            </View>
        </>
    )
}

export default Checkout