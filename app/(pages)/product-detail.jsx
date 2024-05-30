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

    // Get the item from the navigation
    const params = useLocalSearchParams();

    const productId = params.id;
    console.log(productId);

    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // fetch the product details from the API
        fetch(`http://wonderwoods.aps.org.in/api/product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setProduct(data.data);
                setSimilarProducts(data.similarProducts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const maxRating = 5;
    const fullStars = Math.floor(product.averageRating);
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

            {/* manage loading */}

            {isLoading && (
                <View
                    className="flex flex-1 items-center justify-center bg-white"
                >
                    <Text
                        className="text-[20px] font-psemibold text-primary-dark"
                    >
                        Loading...
                    </Text>
                </View>
            )}

            {
                !isLoading && (
                    <SafeAreaView
                        className="w-full  flex-1 bg-white"
                    >
                        <ScrollView>
                            <View
                                className="py-3 pb-[100px] "
                            >
                                <View className="w-full flex-row  px-3 h-72 bg-white">
                                    <Image
                                        source={{ uri: `http://wonderwoods.aps.org.in/${product.image}` }}
                                        className="w-full h-full bg-gray-200 rounded-lg"
                                        resizeMode='cover'
                                    />
                                </View>

                                <View className="px-5 pt-4">
                                    <View
                                        className="flex flex-row items-center justify-between"
                                    >
                                        {/* Vendor Name */}
                                        <Text className="text-[14px] font-psemibold text-tertiary-light">{product.company?.name}</Text>
                                        {/* ratings with star and count */}
                                        <View className="flex flex-row h-[22px] items-center justify-between">
                                            <Text className="text-[14px] font-psemibold text-tertiary-light">
                                                {Math.floor(product.averageRating)} {``}
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
                                                {``} ({product.totalRatings})
                                            </Text>
                                        </View>
                                    </View>
                                    {/* Product Name */}
                                    <Text className="text-[18px] font-pmedium text-primary-dark">{product?.name}</Text>
                                    {/* Tags */}
                                    <View
                                        className="flex flex-row items-center justify-between"
                                    >
                                        {/* Tag Name */}
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
                                            {Number(product.discountedPrice).toLocaleString('en-IN')}
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
                                                -{product.mrp > 0 ? Math.round(((product.mrp - product.discountedPrice) / product.mrp) * 100) : 0}
                                                <Text>%</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* <View className="w-full border mb-5 border-secondary"></View> */}

                                {/* Sizes */}
                                {/* <View>
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
                        </View> */}

                                {/* <View className="w-full border my-5 border-secondary"></View> */}

                                {/* Colors */}
                                {/* <View>
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
                        </View> */}

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
                                    >{product.description}</Text>

                                </View>

                                <View className="w-full border my-5 border-secondary"></View>

                                {/* Images */}
                                <View>
                                    <View
                                        className="bg-secondary-light py-2 flex flex-row items-center justify-center mx-10 mb-5 rounded-full"
                                    >
                                        <Text
                                            className="text-[20px] mx-3 font-psemibold text-tertiary-light"
                                        >
                                            IMAGES
                                        </Text>
                                    </View>

                                    <FlatList
                                        data={product.images}
                                        horizontal
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <View
                                                className={`w-[300px] flex-row  px-3 h-52 mr-4 ${index === 0 ? 'ml-5' : ''}`}
                                            >
                                                <Image
                                                    source={{ uri: `http://wonderwoods.aps.org.in/${item.image}` }}
                                                    className="w-full h-full bg-gray-200 rounded-lg"
                                                    resizeMode='cover'
                                                />
                                            </View>
                                        )}
                                    />
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
                                    {/* Color */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-3"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Color</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.color?.name}</Text>
                                    </View>
                                    {/* Size */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Size</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.size?.name}</Text>
                                    </View>
                                    {/* Material */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Material</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.material}</Text>
                                    </View>
                                    {/* Finish */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Finish</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        >{product.finish}</Text>
                                    </View>
                                    {/* Weight */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Weight</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.weight} kg</Text>
                                    </View>
                                    {/* Dimensions */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Dimensions (LxWxH in cm)</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.length} x {product.width} x {product.height}</Text>
                                    </View>
                                    {/* Warranty */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Warranty</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.warranty} Months</Text>
                                    </View>
                                    {/* Storage */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Storage</Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.storage === 1 ? 'Yes' : 'No'}</Text>
                                    </View>
                                    {/* Style */}
                                    <View
                                        className="px-5 flex flex-row items-center justify-between mt-1"
                                    >
                                        <Text
                                            className="text-[14px] text-primary-dark font-psemibold"
                                        >Style
                                        </Text>
                                        <Text
                                            className="text-[14px] text-tertiary-light font-psemibold"
                                        > {product.style}</Text>
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
                                            data={similarProducts}
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
                )}

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