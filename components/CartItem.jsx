import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'


const QtyButton = ({ qty }) => {

    const [quantity, setQuantity] = useState(qty)

    const handleDecrement = () => {
        // Decrement the quantity
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        // Increment the quantity
        setQuantity(quantity + 1)
    }
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

const CartItem = ({ item, showQty, showDeleteCart, showDeleteWishlist, handleDeleteWishlist, showAddToWishlist, showMoveToCart }) => {
    

    const priceDifference = item.price - item.products.discountedPrice;
    const priceDifferenceText = priceDifference !== 0 ? (
        <Text className="text-[12px] text-primary-dark font-psemibold">
            Price {priceDifference > 0 ? 'increased by' : 'reduced by'} {''}
            <Text className="text-[12px] text-tertiary font-psemibold">
                ₹{Math.abs(priceDifference).toLocaleString('en-IN')}
            </Text>
        </Text>
    ) : null;

    const removeCartItem = (id) => {
        // Remove the cart item
        console.log('Remove cart item', id);

        fetch(`http://wonderwoods.aps.org.in/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                userId: user['id'],
                productId: id,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    const moveToWishlist = (id) => {
        // Move the item to wishlist
        console.log('Move to wishlist', id);
    }

    const moveToCart = (id) => {
        // Move the item to cart
        console.log('Move to cart', id);
    }

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
                        source={{ uri: `http://wonderwoods.aps.org.in/${item.products.image}` }}
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
                        />
                    )
                }

                {
                    showDeleteCart && (
                        < CustomButton
                            title="Remove"
                            handlePress={removeCartItem.bind(this, item.id)}
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
                            title="Add to Wishlist"
                            handlePress={moveToWishlist.bind(this, item.id)}
                            containerStyles="bg-secondary-light rounded-md"
                            textStyles="text-tertiary-light"
                        />
                    )
                }

                {
                    showMoveToCart && (
                        <CustomButton
                            title="Move to Cart"
                            handlePress={moveToCart.bind(this, item.id)}
                            containerStyles="bg-secondary-light rounded-md"
                            textStyles="text-tertiary-light"
                        />
                    )
                }
            </View>
        </View>
    )
}

export default CartItem