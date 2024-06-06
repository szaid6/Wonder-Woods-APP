import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const Checkout = () => {

    const [cart, setCart] = useState([])
    const [cartMRPTotal, setMRPTotal] = useState(0)
    const [cartDelivery, setCartDelivery] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [cartDiscount, setCartDiscount] = useState(0)
    const [cartGrandTotal, setCartGrandTotal] = useState(0)
    const [cartSaved, setCartSaved] = useState(0)
    const [cartDeliveryAddress, setCartDeliveryAddress] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null)
    const isFocused = useIsFocused();

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                console.log('userData', userData);
                fetchCart(userData.id);
                setUser(userData);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (isFocused && user) {
            console.log('user', user);
            fetchDefaultAddress(user['id']);
        }
    }, [isFocused, user]);

    const fetchCart = async (userId) => {
        try {
            fetch(`https://wonderwoods.aps.org.in/api/cart?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        setCart(data.data);

                        // Calculate mrptotal
                        const mrptotal = data.data.reduce((acc, item) => acc + (item.qty * item.products.mrp), 0);
                        setMRPTotal(mrptotal);

                        // Calculate delivery
                        const delivery = data.data.reduce((acc, item) => acc + (item.qty * item.products.deliveryCharge), 0);
                        setCartDelivery(delivery);

                        // Calculate total
                        const total = mrptotal + delivery;
                        setCartTotal(total);

                        // Calculate discount
                        const discountedPriceTotal = data.data.reduce((acc, item) => acc + (item.qty * item.products.discountedPrice), 0);
                        const discount = total - discountedPriceTotal;
                        setCartDiscount(discount);

                        // Calculate grand total
                        const grandTotal = discountedPriceTotal;
                        setCartGrandTotal(grandTotal);

                        // Calculate saved
                        const saved = mrptotal - grandTotal;
                        setCartSaved(saved);

                    } else {
                        console.error('Error:', data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchDefaultAddress = async (userId) => {
        try {
            fetch(`https://wonderwoods.aps.org.in/api/address/default?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log('Default Address:', data.data);
                        setCartDeliveryAddress(data.data);
                    } else {
                        console.error('Error:', data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching address:', error);
                });
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const confirmOrder = async () => {
        console.log('Checking you out');

        const options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_NHB7HSbNbyi3CN',
            amount: cartGrandTotal * 100, // amount in paise
            name: 'Wonderwoods',
            prefill: {
                email: user['email'],
                contact: user['phone'],
                name: user['name']
            },
            theme: { color: '#F37254' }
        }

        // try {
        //     const data = await RazorpayCheckout.open(options);
        //     alert(`Success: ${data.razorpay_payment_id}`);
        //     console.log('Success:', data);

        //     // Proceed to confirm order in your backend
        //     // fetch('https://wonderwoods.aps.org.in/api/confirm-order', { ... })

        // } catch (error) {
        //     console.log(`Error: ${error.code} | ${error.description}`);
        //     ToastAndroid.show(`Error: ${error.description}`, ToastAndroid.SHORT);
        // }

        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error}`);
        });
    }

    changeAddress = () => {
        console.log('====================================');
        console.log('Changing Address');
        console.log('====================================');
        router.push('/address')
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
                                    ₹ {Number(cartMRPTotal).toLocaleString('en-IN')}
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
                                    ₹ {Number(cartDelivery).toLocaleString('en-IN')}
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
                                    ₹ {Number(cartTotal).toLocaleString('en-IN')}
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
                                    ₹ {Number(cartDiscount).toLocaleString('en-IN')}
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
                                    ₹ {Number(cartGrandTotal).toLocaleString('en-IN')}
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
                                        {Number(cartSaved).toLocaleString('en-IN')}
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
                                {cartDeliveryAddress?.name}
                            </Text>
                            <Text
                                className="text-[16px] font-pregular text-primary-dark"
                            >
                                {cartDeliveryAddress?.address1}
                                {cartDeliveryAddress?.address2 && `, ${cartDeliveryAddress?.address2}`}
                                {cartDeliveryAddress?.city && `, ${cartDeliveryAddress?.city}`}
                                {cartDeliveryAddress?.state && `, ${cartDeliveryAddress?.state}`}
                                {cartDeliveryAddress?.district && `, ${cartDeliveryAddress?.district}`}
                                {cartDeliveryAddress?.pincode && `, ${cartDeliveryAddress?.pincode}`}
                            </Text>
                            <Text
                                className="text-[16px] font-pregular text-primary-dark"
                            >
                                {cartDeliveryAddress?.landmark}
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