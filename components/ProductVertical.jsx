import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import icons from '../constants/icons'
import images from '../constants/images'
import BottomSheet from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomButton from './CustomButton'
import ImageButton from './ImageButton'

const ProductVertical = ({ item }) => {

    const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])

    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    const goToProductDetails = () => {
        console.log("Go To Product Details");
    }

    const addToCart = () => {
        console.log("Added To Cart");
        if (isAddedToCart) {
            setIsAddedToCart(false);
        } else {
            setIsAddedToCart(true);
        }
    }

    const addToWishlist = () => {
        console.log("Added To Wishlist");
        if (isAddedToWishlist) {
            setIsAddedToWishlist(false);
        } else {
            setIsAddedToWishlist(true);
        }
    }

    return (
        <>
            <View
                className="flex flex-row flex-wrap justify-around gap-y-5 mt-1"
            >
                <View>
                    {/* Cover Image */}
                    <View
                        className="w-[180px] h-[180px] rounded-lg bg-gray-200"
                    >
                        <Image
                            source={item.image}
                            className="w-full h-full rounded-lg opacity-80"
                            resizeMode='contain'
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
                    {/* Product Details */}
                    <View
                        className="w-[180px] mt-2"
                    >
                        <Text
                            numberOfLines={2}
                            className="text-xs text-primary font-psemibold"
                        > {item.title} </Text>
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
                                {Number(item.price).toLocaleString('en-IN')}
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
                                    -{item.mrp > 0 ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0}
                                    <Text>%</Text>
                                </Text>
                            </View>
                        </View>

                        {/* Colors and Sizes */}
                        <View
                            className="text-primary flex flex-row justify-between items-center font-psemibold mt-2"
                        >
                            {/* Colors */}
                            <View
                                className="flex flex-row gap-x-1"
                            >
                                {item.colors.map((c) => (
                                    <TouchableOpacity
                                        onPress={goToProductDetails}
                                        key={c.id}
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: c.color }}
                                    ></TouchableOpacity>
                                ))}
                            </View>

                            {/* Sizes */}
                            <View
                                className="w-[80px] bg-secondary-light rounded-lg px-2">
                                <Text
                                    className="text-[10px] text-center text-tertiary font-psemibold"
                                >Available Sizes</Text>
                            </View>
                        </View>

                        {/* Add to Cart and Wishlist */}
                        <View
                            className="flex flex-row justify-between mt-2"
                        >
                            {/* Add to Cart */}
                            <CustomButton
                                title={isAddedToCart ? "Added To Cart" : "Add To Cart"}
                                handlePress={addToCart}
                                containerStyles="w-[80%] rounded-lg bg-primary"
                                textStyles="text-xs text-white font-psemibold"
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