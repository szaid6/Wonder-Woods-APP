import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '../constants/icons';
import CustomButton from './CustomButton';
import ImageButton from './ImageButton';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ProductVertical = ({ item }) => {
    const [user, setUser] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                setUser(userData);
                checkProductStatus(userData.id, item.id);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isFocused && user.id) {
            checkProductStatus(user.id, item.id);
        }
    }, [isFocused]);

    const checkProductStatus = async (userId, productId) => {
        try {
            const cartResponse = await fetch(`https://wonderwoods.aps.org.in/api/cart/check?userId=${userId}&productId=${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const cartData = await cartResponse.json();
            setIsAddedToCart(cartData.status === 200 && cartData.isPresent);

            const wishlistResponse = await fetch(`https://wonderwoods.aps.org.in/api/wishlist/check?userId=${userId}&productId=${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const wishlistData = await wishlistResponse.json();
            setIsAddedToWishlist(wishlistData.status === 200 && wishlistData.isPresent);
        } catch (error) {
            console.error('Error checking product status:', error);
        }
    };

    const saveProductToRecentlyVisited = async (product) => {
        try {
            const jsonValue = await AsyncStorage.getItem('recentlyVisited');
            let recentlyVisited = jsonValue ? JSON.parse(jsonValue) : [];

            const { id, image, name } = product;
            recentlyVisited = recentlyVisited.filter(item => item.id !== id);
            recentlyVisited.unshift({ id, image, name });

            if (recentlyVisited.length > 4) {
                recentlyVisited.pop();
            }

            await AsyncStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisited));
        } catch (error) {
            console.error('Error saving product to recently visited:', error);
        }
    };

    const goToProductDetails = () => {
        saveProductToRecentlyVisited(item);
        router.push({
            pathname: 'product-detail',
            params: { id: item.id }
        });
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch('https://wonderwoods.aps.org.in/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    productId: item.id,
                })
            });
            const data = await response.json();
            if (data.status === 200) {
                setIsAddedToCart(true);
                console.log('Success:', data.message);
            } else if (data.status === 400) {
                setIsAddedToCart(false);
            }
            else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleAddToWishlist = async () => {
        try {
            const response = await fetch('https://wonderwoods.aps.org.in/api/wishlist/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    productId: item.id,
                    price: item.discountedPrice
                })
            });
            const data = await response.json();
            if (data.status === 200) {
                setIsAddedToWishlist(true);
                console.log('Success:', data.message);
            } else if (data.status === 400) {
                setIsAddedToWishlist(false);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    return (
        <View className="flex flex-row flex-wrap justify-around gap-y-5 mt-1">
            <View>
                <TouchableOpacity onPress={goToProductDetails} activeOpacity={1}>
                    <View className="w-[180px] h-[180px] rounded-lg bg-gray-200">
                        <Image source={{ uri: `https://wonderwoods.aps.org.in/${item.image}` }} className="w-full h-full rounded-lg" resizeMode='cover' />
                        {item.tag && (
                            <View className="h-5 absolute top-3 left-2 bg-secondary-lighter flex rounded-md items-center justify-center">
                                <Text className="text-xs px-2 text-primary font-psemibold">{item.tag}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <View className="w-[180px] mt-2">
                    <TouchableOpacity onPress={goToProductDetails} activeOpacity={1}>
                        <Text numberOfLines={2} className="text-xs text-primary font-psemibold">{item.name}</Text>
                        <View className="flex flex-row mt-2 h-8">
                            <Text className="text-2xl text-tertiary-light font-psemibold">
                                <Text className="text-[12px] text-tertiary-light font-psemibold">₹</Text>
                                {Number(item.discountedPrice).toLocaleString('en-IN')}
                            </Text>
                            <View className="flex flex-col justify-between ml-1">
                                <Text className="text-[12px] h-4 line-through text-primary-light font-psemibold">
                                    <Text className="text-[10px] text-primary font-psemibold">₹</Text>
                                    {Number(item.mrp).toLocaleString('en-IN')}
                                </Text>
                                <Text className="text-[10px] h-4 text-primary font-psemibold">
                                    -{item.mrp > 0 ? Math.round(((item.mrp - item.discountedPrice) / item.mrp) * 100) : 0}%
                                </Text>
                            </View>
                        </View>
                        <View className="text-primary font-psemibold mt-2">
                            <View className="flex flex-row items-center justify-between gap-x-1">
                                <Text className="text-[12px] text-tertiary-light font-psemibold">Color:</Text>
                                <Text className="text-[12px] text-tertiary font-psemibold">{item.color.name}</Text>
                            </View>
                            <View className="flex flex-row items-center justify-between gap-x-1">
                                <Text className="text-[12px] text-tertiary-light font-psemibold">Size:</Text>
                                <Text className="text-[12px] text-tertiary font-psemibold">{item.size.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View className="flex flex-row justify-between mt-2">
                        <CustomButton
                            title={isAddedToCart ? "Added To Cart" : "Add To Cart"}
                            handlePress={handleAddToCart}
                            containerStyles={`w-[80%] rounded-lg ${isAddedToCart ? "bg-primary" : "bg-secondary-lighter"}`}
                            textStyles={`text-xs font-psemibold ${isAddedToCart ? "text-white" : "text-primary"}`}
                        />
                        <ImageButton
                            icon={isAddedToWishlist ? icons.heartSolid : icons.heartOutline}
                            handlePress={handleAddToWishlist}
                            containerStyles="w-10 h-10"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProductVertical;