import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import icons from '../constants/icons'
import CustomButton from './CustomButton'
import ImageButton from './ImageButton'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProductVertical = ({ item }) => {

    const [user, setUser] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                setUser(userData);

                // Check if the product is already in the cart
                fetch('http://wonderwoods.aps.org.in/api/cart?userId=' + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 200) {
                            const cartItems = data.data;
                            const productInCart = cartItems.find(cartItem => cartItem.productId === item.id);
                            if (productInCart) {
                                setIsAddedToCart(true);
                            }
                        } else {
                            console.error('Error:', data);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                // Check if the product is already in the wishlist
                fetch('http://wonderwoods.aps.org.in/api/wishlist?userId=' + userData.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 200) {
                            const wishlistItems = data.data;
                            const productInWishlist = wishlistItems.find(wishlistItem => wishlistItem.productId === item.id);
                            if (productInWishlist) {
                                setIsAddedToWishlist(true);
                            }
                        } else {
                            console.error('Error:', data);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            })
    }, []);


    // Function to save a product to "recently visited" list
    const saveProductToRecentlyVisited = async (product) => {
        try {
            const jsonValue = await AsyncStorage.getItem('recentlyVisited');
            let recentlyVisited = jsonValue != null ? JSON.parse(jsonValue) : [];
            // Only save the necessary fields
            const { id, image, name } = product;

            // Remove product if it's already in the list
            recentlyVisited = recentlyVisited.filter(item => item.id !== product.id);

            // Add the product to the start of the list
            recentlyVisited.unshift({ id, image, name });

            // Keep only the latest 4 products
            if (recentlyVisited.length > 4) {
                recentlyVisited.pop();
            }

            // Save updated list back to AsyncStorage
            await AsyncStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisited));
        } catch (e) {
            console.error('Error saving product to recently visited', e);
        }
    };

    const goToProductDetails = () => {
        console.log("Go To Product Details");

        // Save the product to "recently visited" list
        saveProductToRecentlyVisited(item);

        // Navigate to the product details screen
        router.push({
            pathname: 'product-detail',
            params: {
                id: item.id
            }
        })
    }

    const addToCart = () => {
        console.log("Added To Cart");

        fetch('http://wonderwoods.aps.org.in/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user['id'],
                productId: item.id,
                price: item.discountedPrice,
                qty: 1
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setIsAddedToCart(true);
                    // ToastAndroid.show(
                    //     data.message,
                    //     ToastAndroid.SHORT
                    // );
                    console.log('Success:', data);
                } else if (data.status === 400) {
                    setIsAddedToCart(false);
                    // ToastAndroid.show(
                    //     data.message,
                    //     ToastAndroid.SHORT
                    // );
                }
                else {
                    console.error('Error:', data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const addToWishlist = () => {
        console.log("Added To Wishlist");

        fetch('http://wonderwoods.aps.org.in/api/wishlist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user['id'],
                productId: item.id,
                price: item.discountedPrice
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setIsAddedToWishlist(true);
                    // ToastAndroid.show(
                    //     data.message,
                    //     ToastAndroid.SHORT
                    // );
                    console.log('Success:', data);
                } else if (data.status === 400) {
                    setIsAddedToWishlist(false);
                    // ToastAndroid.show(
                    //     data.message,
                    //     ToastAndroid.SHORT
                    // );
                }
                else {
                    console.error('Error:', data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <View
                className="flex flex-row flex-wrap justify-around gap-y-5 mt-1"
            >
                <View>
                    {/* Cover Image */}
                    <TouchableOpacity
                        onPress={goToProductDetails}
                        activeOpacity={1}
                    >
                        <View
                            className="w-[180px] h-[180px] rounded-lg bg-gray-200"
                        >
                            <Image
                                source={{ uri: `http://wonderwoods.aps.org.in/${item.image}` }}
                                className="w-full h-full rounded-lg"
                                resizeMode='cover'
                            />
                            {item.tag && item.tag.length > 0 &&
                                <View
                                    className="h-5 absolute top-3 left-2 bg-secondary-lighter flex rounded-md items-center justify-center"
                                >
                                    <Text
                                        className="text-xs px-2 text-primary font-psemibold"
                                    >
                                        {item.tag}
                                    </Text>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                    {/* Product Details */}
                    <View
                        className="w-[180px] mt-2"
                    >
                        <TouchableOpacity
                            onPress={goToProductDetails}
                            activeOpacity={1}
                        >
                            <Text
                                numberOfLines={2}
                                className="text-xs text-primary font-psemibold"
                            > {item.name} </Text>
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
                                    {Number(item.discountedPrice).toLocaleString('en-IN')}
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
                                        {Number(item.mrp).toLocaleString('en-IN')}
                                    </Text>
                                    <Text
                                        className="text-[10px] h-4 text-primary font-psemibold"
                                    >
                                        -{item.mrp > 0 ? Math.round(((item.mrp - item.discountedPrice) / item.mrp) * 100) : 0}
                                        <Text>%</Text>
                                    </Text>
                                </View>
                            </View>

                            {/* Colors and Sizes */}
                            <View
                                className="text-primary font-psemibold mt-2"
                            >
                                <View
                                    className="flex flex-row items-center justify-between gap-x-1"
                                >
                                    <Text
                                        className="text-[12px] text-tertiary-light font-psemibold"
                                    >Color:</Text>
                                    <Text
                                        className="text-[12px] text-tertiary font-psemibold"
                                    >{item.color.name}</Text>
                                </View>
                                <View
                                    className="flex flex-row items-center justify-between gap-x-1"
                                >
                                    <Text
                                        className="text-[12px] text-tertiary-light font-psemibold"
                                    >Size:</Text>
                                    <Text
                                        className="text-[12px] text-tertiary font-psemibold"
                                    >{item.size.name}</Text>
                                </View>
                                {/* Colors */}
                                {/* <View
                                className="flex flex-row gap-x-1"
                            >
                                {item.colors.map((c) => (
                                    <TouchableOpacity
                                        onPress={goToProductDetails}
                                        key={c.id}
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: c.color }}
                                        activeOpacity={1}
                                    ></TouchableOpacity>
                                ))}
                            </View> */}

                                {/* Sizes */}
                                {/* <View
                                className="w-[80px] bg-secondary-light rounded-lg px-2">
                                <Text
                                    className="text-[10px] text-center text-tertiary font-psemibold"
                                >Available Sizes</Text>
                            </View> */}
                            </View>
                        </TouchableOpacity>
                        {/* Add to Cart and Wishlist */}
                        <View
                            className="flex flex-row justify-between mt-2"
                        >
                            {/* Add to Cart */}
                            <CustomButton
                                title={isAddedToCart ? "Added To Cart" : "Add To Cart"}
                                handlePress={addToCart}
                                containerStyles={`w-[80%] rounded-lg ${isAddedToCart ? "bg-primary" : "bg-secondary-lighter"}`}
                                textStyles={`text-xs font-psemibold ${isAddedToCart ? "text-white" : "text-primary"}`}
                            />
                            {/* Wishlist */}
                            <ImageButton
                                icon={isAddedToWishlist ? icons.heartSolid : icons.heartOutline}
                                handlePress={addToWishlist}
                                containerStyles="w-10 h-10"
                                textStyles=""
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default ProductVertical

const styles = StyleSheet.create({})