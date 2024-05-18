import { View, Text, SafeAreaView, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import images from '../../constants/images';
import icons from '../../constants/icons';
import Size from '../../components/Size';
import Color from '../../components/Color';
import CustomButton from '../../components/CustomButton';
import ProductVertical from '../../components/ProductVertical';

const ProductDetail = () => {
    const products = [
        {
            id: 1,
            image: images.logo,
            title: 'Product 1',
            tag: 'New Arrival',
            price: '10000',
            mrp: '12000',
            vendor: 'Nike',
            colors: [
                {
                    id: 1,
                    color: '#000000',
                },
                {
                    id: 2,
                    color: '#FFFFFF',
                },
                {
                    id: 3,
                    color: '#FF0000',
                },
            ]
        },
        {
            id: 2,
            image: images.logo,
            title: 'Product 2',
            tag: 'New',
            price: '20000',
            mrp: '22000',
            vendor: 'Nike',
            colors: [
                {
                    id: 1,
                    color: '#000000',
                },
                {
                    id: 2,
                    color: '#FFFFFF',
                },
                {
                    id: 3,
                    color: '#FF0000',
                },
            ]
        },
        {
            id: 3,
            image: images.logo,
            title: 'Product 3',
            tag: 'Discounted',
            price: '30000',
            mrp: '32000',
            vendor: 'Nike',
            colors: [
                {
                    id: 1,
                    color: '#000000',
                },
                {
                    id: 2,
                    color: '#FFFFFF',
                },
                {
                    id: 3,
                    color: '#FF0000',
                },
            ]
        },
        {
            id: 4,
            image: images.logo,
            title: 'Product 4',
            tag: 'Latest',
            price: '40000',
            mrp: '42000',
            vendor: 'Nike',
            colors: [
                {
                    id: 1,
                    color: '#000000',
                },
                {
                    id: 2,
                    color: '#FFFFFF',
                },
                {
                    id: 3,
                    color: '#FF0000',
                },
            ]
        },
        {
            id: 5,
            image: images.logo,
            title: 'Product 5',
            tag: 'Branded',
            price: '50000',
            mrp: '52000',
            vendor: 'Nike',
            colors: [
                {
                    id: 1,
                    color: '#000000',
                },
                {
                    id: 2,
                    color: '#FFFFFF',
                },
                {
                    id: 3,
                    color: '#FF0000',
                },
            ]
        }
    ]
    // Get the item from the navigation
    const params = useLocalSearchParams();

    // conver the stringified object to JSON

    const productId = params.id;

    const [product, setProduct] = useState({})

    useEffect(() => {
        const product = products.find(product => product.id === Number(productId));
        setProduct(product)
    }, [productId])

    console.log(product);

    const maxRating = 5;
    const fullStars = Math.floor(4);
    const emptyStars = maxRating - fullStars;

    const addToWishlist = () => {
        console.log('Added to wishlist');
    }

    const addToCart = () => {
        console.log('Added to cart');
    }

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light">
                <Header
                    showTitle={false}
                    title="Product Detail"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView
                className="w-full  flex-1 bg-white"
            >
                <ScrollView>
                    <View
                        className="py-3 pb-[100px] "
                    >
                        <View className="w-full px-3 h-72 bg-white">
                            <Image
                                source={images.logo}
                                className="w-full h-full bg-gray-200 rounded-lg"
                                resizeMode='contain'
                            />
                        </View>
                        
                        <View className="px-5 pt-4">
                            <View
                                className="flex flex-row items-center justify-between"
                            >
                                {/* Vendor Name */}
                                <Text className="text-[14px] font-psemibold text-tertiary-light">{product.vendor}</Text>
                                {/* ratings with star and count */}
                                <View className="flex flex-row h-[22px] items-center justify-between">
                                    <Text className="text-[14px] font-psemibold text-tertiary-light">
                                        4 {``}
                                    </Text>
                                    <View className="flex flex-row items-center">
                                        {/* add stars-solid and stars-outline accordingly */}
                                        {Array.from({ length: fullStars }).map((_, index) => (
                                            <Image
                                                key={`full-${index}`}
                                                source={icons.starSolid}
                                                className="w-4 h-4"
                                                resizeMode='contain'
                                                tintColor={'#E45412'}
                                            />
                                        ))}
                                        {Array.from({ length: emptyStars }).map((_, index) => (
                                            <Image
                                                key={`empty-${index}`}
                                                source={icons.starOutline}
                                                className="w-4 h-4"
                                                resizeMode='contain'
                                                tintColor={'#E45412'}
                                            />
                                        ))}
                                    </View>
                                    <Text className="text-[14px] font-psemibold text-tertiary-light">
                                        {``} (200)
                                    </Text>
                                </View>
                            </View>
                            {/* Product Name */}
                            <Text className="text-[18px] font-pmedium text-primary-dark">{product.title}</Text>
                            {/* Tags */}
                            <View
                                className="flex flex-row items-center justify-between"
                            >
                                {/* Vendor Name */}
                                <Text className="text-[14px] font-psemibold rounded-full px-3 pt-0.5 bg-primary-light text-white">{product.tag}</Text>
                            </View>
                            {/* Product Pricing */}
                            <View
                                className="flex flex-row mt-2"
                            >
                                <Text
                                    className="text-[40px] text-tertiary-light font-psemibold"
                                >
                                    <Text
                                        className="text-[12px] text-tertiary-light font-psemibold"
                                    >₹</Text>
                                    {Number(product.price).toLocaleString('en-IN')}
                                </Text>
                                <View
                                    className="flex ml-1"
                                >
                                    <Text
                                        className="text-[18px] line-through text-primary-light font-psemibold"
                                    >
                                        <Text
                                            className="text-[10px] text-primary font-psemibold"
                                        >₹</Text>
                                        {Number(product.mrp).toLocaleString('en-IN')}
                                    </Text>
                                    <Text
                                        className="text-[15px] text-primary font-psemibold"
                                    >
                                        -{product.mrp > 0 ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0}
                                        <Text>%</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="w-full border mb-5 border-secondary"></View>

                        {/* Sizes */}
                        <View>
                            <Text className="text-[16px] mx-3 font-psemibold text-tertiary-light">
                                Sizes
                            </Text>
                            <View className="flex flex-row  items-center justify-between">
                                <FlatList
                                    data={product.colors}
                                    horizontal
                                    keyExtractor={(item) => item.id.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Size
                                            index={index}
                                            data={product}
                                            selected={item.id === product.id}
                                        ></Size>
                                    )}
                                />
                            </View>
                        </View>

                        <View className="w-full border my-5 border-secondary"></View>

                        {/* Colors */}
                        <View>
                            <Text className="text-[16px] mx-3 font-psemibold text-tertiary-light">
                                Colors
                            </Text>
                            <View className="flex flex-row  items-center justify-between">
                                <FlatList
                                    data={product.colors}
                                    horizontal
                                    keyExtractor={(item) => item.id.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Color
                                            index={index}
                                            data={product}
                                            selected={item.id === product.id}
                                        ></Color>
                                    )}
                                />
                            </View>
                        </View>

                        <View className="w-full border my-5 border-secondary"></View>

                        {/* Description */}
                        <View>
                            <View
                                className="bg-secondary-light py-2 flex flex-row items-center justify-center mx-10 rounded-full"
                            >
                                <Text
                                    className="text-[20px] mx-3 font-psemibold text-tertiary-light"
                                >
                                    DESCRIPTION
                                </Text>
                            </View>
                            <Text
                                className="text-[14px] mx-3 font-psemibold text-justify text-primary-dark mt-2 px-2"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc elementum
                                fermentum. Ut in nisl nec sem ultrices luctus. Integer euismod, nulla nec scelerisque
                                consectetur, mi sapien tincidunt nunc, nec vestibulum odio sapien id nisi. Sed in
                                sollicitudin mi. Donec nec odio vitae nunc elementum fermentum. Ut in nisl nec sem ultrices
                                luctus. Integer euismod, nulla nec scelerisque consectetur, mi sapien tincidunt nunc, nec
                            </Text>

                        </View>

                        <View className="w-full border my-5 border-secondary"></View>

                        {/* other details */}
                        <View>
                            <View
                                className="bg-secondary-light py-2 flex flex-row items-center justify-center mx-10 rounded-full"
                            >
                                <Text
                                    className="text-[20px] mx-3 font-psemibold text-tertiary-light"
                                >
                                    OTHER DETAILS
                                </Text>
                            </View>
                            {/* Material */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-3"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Material
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    Cotton
                                </Text>
                            </View>
                            {/* Finish */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Finish
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    Matte
                                </Text>
                            </View>
                            {/* Weight */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Weight
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    200 Kg
                                </Text>
                            </View>
                            {/* Dimensions */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Dimensions (LxWxH in cm)
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    10 x 10 x 10
                                </Text>
                            </View>
                            {/* Warranty */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Warranty
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    1 Year
                                </Text>
                            </View>
                            {/* Storage */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Storage
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    Yes
                                </Text>
                            </View>
                            {/* Style */}
                            <View
                                className="px-5 flex flex-row items-center justify-between mt-1"
                            >
                                <Text
                                    className="text-[14px] text-primary-dark font-psemibold"
                                >
                                    Style
                                </Text>
                                <Text
                                    className="text-[14px] text-tertiary-light font-psemibold"
                                >
                                    Modern
                                </Text>
                            </View>
                        </View>

                        <View className="w-full border my-5 border-secondary"></View>

                        {/* Similar Products */}
                        <View>
                            <View
                                className="bg-secondary-light py-2 flex flex-row items-center justify-center mx-10 rounded-full"
                            >
                                <Text
                                    className="text-[20px] mx-3 font-psemibold text-tertiary-light"
                                >
                                    SIMILAR PRODUCTS
                                </Text>
                            </View>
                            <View
                                className="flex flex-row items-center justify-between mt-3"
                            >
                                <FlatList
                                    data={products}
                                    horizontal
                                    keyExtractor={(item) => item.id.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View
                                            className={`mr-4 ${index === 0 ? 'ml-5' : ''}`}
                                        >
                                            <ProductVertical
                                                index={index}
                                                item={item}
                                            >
                                            </ProductVertical>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* CTA for wishlist and add to cart */}
            <View
                className="absolute bottom-0 flex flex-row w-full bg-secondary-lighter pt-3 pb-5 items-center justify-around "
            >
                <CustomButton
                    title="Add to Wishlist"
                    containerStyles="w-[45%] bg-secondary-light rounded-md"
                    textStyles="text-[14px] font-psemibold text-primary"
                    handlePress={addToWishlist}
                ></CustomButton>
                <CustomButton
                    title="Add to Cart"
                    containerStyles="w-[45%] bg-primary rounded-md"
                    textStyles="text-[14px] font-psemibold text-white"
                    handlePress={addToCart}
                >
                </CustomButton>
            </View>
        </>
    )
}

export default ProductDetail