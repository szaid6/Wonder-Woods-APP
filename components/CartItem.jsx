import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const QtyButton = ({ qty, handleIncrement, handleDecrement }) => {

    const [quantity, setQuantity] = useState(qty)

    return (
        <View
            className="flex flex-row items-center"
        >
            <TouchableWithoutFeedback
                onPress={handleDecrement}
            >
                <View
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                    <Text
                        className="text-white font-psemibold"
                    >-</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text
                className="text-tertiary-light font-psemibold mx-2"
            > {quantity} </Text>
            <TouchableWithoutFeedback
                onPress={handleIncrement}
            >
                <View
                    className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                    <Text
                        className="text-white font-psemibold"
                    >+</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const CartItem = ({ item, showQty, handlePlusCount, handleMinusCount, showDeleteCart, handleDeleteCart, showDeleteWishlist, handleDeleteWishlist, showAddToWishlist, handleAddToWishlist, showMoveToCart, handleMoveToCart }) => {

    const isFocused = useIsFocused();
    const [user, setUser] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [isFocused]);

    const fetchUserData = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            const userData = JSON.parse(user);
            setUser(userData);
            checkCart(item.products.id);
            checkWishlist(item.products.id);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }
    };

    const checkCart = async (productId) => {
        try {
            const response = await fetch('https://wonderwoods.aps.org.in/api/cart/check?userId=' + user.id + '&productId=' + productId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status === 200) {
                console.log('Cart Data:', data);
                setIsAddedToCart(data.isPresent);
                return data.isPresent;
            } else {
                console.error('Error:', data);
                setIsAddedToCart(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking cart:', error);
            return false;
        }
    };

    const checkWishlist = async (productId) => {
        try {
            const response = await fetch('https://wonderwoods.aps.org.in/api/wishlist/check?userId=' + user.id + '&productId=' + productId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status === 200) {
                console.log('Wishlist Data:', data);
                setIsAddedToWishlist(data.isPresent);
                return data.isPresent;
            } else {
                console.error('Error:', data);
                setIsAddedToWishlist(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking wishlist:', error);
            return false;
        }
    };

    const priceDifference = item.price - item.products.discountedPrice;
    const priceDifferenceText = priceDifference !== 0 ? (
        <Text className="text-[12px] text-primary-dark font-psemibold">
            Price {priceDifference > 0 ? 'increased by' : 'reduced by'} {''}
            <Text className="text-[12px] text-tertiary font-psemibold">
                ₹{Math.abs(priceDifference).toLocaleString('en-IN')}
            </Text>
        </Text>
    ) : null;

    return (
        <View
            className="flex  m-2 justify-between items-center px-1 py-2 border-2 rounded-md bg-secondary-lighter border-primary"
        >
            <View
                className="flex flex-row items-center"
            >
                <View
                    className="w-[25%] ml-2"
                >
                    <Image
                        source={{ uri: `https://wonderwoods.aps.org.in/${item.products.image}` }}
                        className="w-24 h-24 rounded-lg"
                        resizeMode='cover'
                    />
                </View>
                <View
                    className="ml-2 w-[75%]"
                >
                    <Text
                        // numberOfLines={2}
                        className="text-[16px] text-primary font-psemibold text-start"
                    >{item.products.name}</Text>
                    {/* Product Pricing */}
                    <View
                        className="flex flex-row mt-2 h-8"
                    >
                        <Text
                            className="text-2xl text-tertiary-light font-psemibold"
                        >
                            <Text
                                className="text-[12px] text-tertiary-light font-psemibold"
                            >₹</Text>
                            {Number(item.products.discountedPrice).toLocaleString('en-IN')}
                        </Text>
                        <View
                            className="flex flex-col justify-between ml-1"
                        >
                            <Text
                                className="text-[12px] h-4 line-through text-primary-light font-psemibold"
                            >
                                <Text
                                    className="text-[10px] text-primary font-psemibold"
                                >₹</Text>
                                {Number(item.products.mrp).toLocaleString('en-IN')}
                            </Text>
                            <Text
                                className="text-[10px] h-4 text-primary font-psemibold"
                            >
                                -{item.products.mrp > 0 ? Math.round(((item.products.mrp - item.products.discountedPrice) / item.products.mrp) * 100) : 0}
                                <Text>%</Text>
                            </Text>
                        </View>
                    </View>

                    <View
                        className="mt-2"
                    >
                        {priceDifferenceText}
                    </View>

                </View>
            </View>
            <View
                className="flex w-full mt-2 flex-row justify-around items-center"
            >
                {
                    showQty && (
                        <QtyButton
                            qty={item.qty}
                            handleIncrement={handlePlusCount}
                            handleDecrement={handleMinusCount}
                        />
                    )
                }

                {
                    showDeleteCart && (
                        < CustomButton
                            title="Remove"
                            handlePress={handleDeleteCart}
                            containerStyles="bg-secondary-light rounded-md"
                            textStyles="text-tertiary-light"
                        />
                    )
                }

                {
                    showDeleteWishlist && (
                        <CustomButton
                            title="Remove"
                            handlePress={handleDeleteWishlist}
                            containerStyles="bg-secondary-light rounded-md"
                            textStyles="text-tertiary-light"
                        />
                    )
                }

                {
                    showAddToWishlist && (
                        <CustomButton
                            title={isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                            handlePress={handleAddToWishlist}
                            disabled={isAddedToWishlist}
                            containerStyles={isAddedToWishlist ? "bg-primary rounded-md opacity-80" : "bg-secondary-light rounded-md"}
                            textStyles={isAddedToWishlist ? "text-white" : "text-primary"}
                        />
                    )
                }

                {
                    showMoveToCart && (
                        <CustomButton
                            title={isAddedToCart ? 'Added to Cart' : 'Move to Cart'}
                            handlePress={handleMoveToCart}
                            disabled={isAddedToCart}
                            containerStyles={isAddedToCart ? "bg-primary rounded-md opacity-80" : "bg-secondary-light rounded-md"}
                            textStyles={isAddedToCart ? "text-white" : "text-primary"}
                        />
                    )
                }
            </View>
        </View>
    )
}

export default CartItem