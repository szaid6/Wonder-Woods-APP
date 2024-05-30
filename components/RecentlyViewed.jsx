import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecentlyViewed = ({ item }) => {

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

    return (
        <TouchableOpacity
            onPress={goToProductDetails}
            activeOpacity={1}
        >
            <View
                className="flex flex-col items-center">
                <View
                    className="w-[180px] h-[180px] mb-3 rounded-lg bg-gray-200"
                >
                    <Image
                        source={{ uri: `http://wonderwoods.aps.org.in/${item.image}` }}
                        className="w-full h-full rounded-lg opacity-80"
                        resizeMode='cover'
                    />
                </View>
                <Text
                    numberOfLines={2}
                    className="w-[180px] text-center text-sm text-primary font-psemibold"
                >{item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecentlyViewed