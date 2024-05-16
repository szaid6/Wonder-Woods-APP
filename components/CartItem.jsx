import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'


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

const CartItem = ({ item, showQty, showDelete, showAddToWishlist, showMoveToCart }) => {

    const priceDifference = item.price - item.product.price;
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
                    className="w-[25%]"
                >
                    <Image
                        source={item.product.image}
                        className="w-24 h-24 rounded-lg"
                        resizeMode='contain'
                    />
                </View>
                <View
                    className="ml-2 w-[75%]"
                >
                    <Text
                        // numberOfLines={2}
                        className="text-[16px] text-primary font-psemibold"
                    > {item.product.title}  </Text>
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
                            {Number(item.product.price).toLocaleString('en-IN')}
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
                                {Number(item.product.mrp).toLocaleString('en-IN')}
                            </Text>
                            <Text
                                className="text-[10px] h-4 text-primary font-psemibold"
                            >
                                -{item.product.mrp > 0 ? Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100) : 0}
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
                    showDelete && (
                        < CustomButton
                            title="Remove"
                            handlePress={removeCartItem.bind(this, item.id)}
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