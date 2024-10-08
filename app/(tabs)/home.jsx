import { View, Text, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, router } from 'expo-router';
import icons from '../../constants/icons'
import images from '../../constants/images'
import Icon from '../../components/Icon';
import ProductVertical from '../../components/ProductVertical';
import ShopByRoom from '../../components/ShopByRoom';
import RecentlyViewed from '../../components/RecentlyViewed';
import Banner from '../../components/Banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';

import { API_BASE_URL, IMAGE_API_BASE_URL } from '@env';

const Home = () => {
  const [defaultAddress, setDefaultAddress] = useState(null)
  const [categories, setCategories] = useState([])
  const [banners, setBanners] = useState([])
  const [rooms, setRooms] = useState([])
  const [products, setProducts] = useState([])
  const [recentlyVisited, setRecentlyVisited] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => {
        const userData = JSON.parse(user)
        console.log('userData', userData);

        fetch(`${API_BASE_URL}/welcome?userId=` + userData.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            // console.log('Success:', data);
            setCategories(data.data.categories);
            setBanners(data.data.banners);
            setRooms(data.data.rooms);
            setProducts(data.data.products);
            setDefaultAddress(data.data.selectedAddress);

            getRecentlyVisited();
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsLoading(true);
          });

      })


  }, [isFocused]);

  // Function to retrieve the "recently visited" list
  const getRecentlyVisited = async () => {
    try {
      console.log(`${IMAGE_API_BASE_URL}`);
      // clear recently visited products
      // await AsyncStorage.removeItem('recentlyVisited');

      const jsonValue = await AsyncStorage.getItem('recentlyVisited');
      // console.log('jsonValue', jsonValue);
      setRecentlyVisited(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error retrieving recently visited products', e);
      return [];
    }
  };

  const { isAuthenticated } = useGlobalContext();
  if (!isAuthenticated) return <Redirect href="/sign-in" />
  return (
    <>
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
          <ScrollView
            className="h-full bg-white"
          >
            {/* Address Bar */}
            < TouchableWithoutFeedback
              onPress={() => router.push('address')}
            >
              <View className="w-full h-12 px-4 flex flex-row items-center bg-secondary-lighter">
                {/* location icon */}
                <Image
                  source={icons.location}
                  className="w-6 h-6 mr-2"
                  resizeMode='contain'
                  tintColor={'#F37121'}
                />
                {defaultAddress === null && (
                  <Text className="text-xs text-primary font-pregular">No Address Selected</Text>
                )}
                {defaultAddress !== null && (
                  <Text className="text-xs text-primary font-pregular">Delivering to <Text className="font-psemibold" > {defaultAddress.name} </Text> at <Text className="font-psemibold" > {defaultAddress.pincode} </Text> </Text>
                )}
                <Text className="text-xs text-primary-dark font-psemibold">- Change?</Text>
              </View>
            </ TouchableWithoutFeedback>

            {/* Categories */}
            < View className="w-full h-[110px] mt-3" >
              <FlatList
                data={categories}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => router.push({
                      pathname: 'category',
                      params: {
                        id: item.id
                      }
                    })}
                    activeOpacity={1}
                  >
                    <Icon
                      item={item}
                      index={index}
                      selectableFrame={false}
                    />
                  </TouchableOpacity>
                )}
              />
            </ View>

            {/* Dynamic Banners */}
            < View className="w-full h-52" >
              <Banner
                items={banners}
              />
            </ View>

            {/*Static Banner */}
            < View className="w-full h-36 mt-3" >
              <Image
                source={images.banner}
                className="w-full h-full rounded-lg"
                resizeMode='contain'
              />
            </ View>

            {/* Recently Viewed Products */}

            {recentlyVisited != null && (

              < View className="w-full h-auto my-3" >
                <Text
                  className="text-xl text-primary font-psemibold my-3 text-center"
                >RECENTLY VIEWED PRODUCTS
                </Text>
                <View className="flex flex-row flex-wrap justify-between px-4 mt-2">
                  {
                    recentlyVisited.map((item) => (
                      <RecentlyViewed
                        item={item}
                      />
                    ))
                  }
                </View>
              </ View>
            )}

            {/* Shop By Rooms */}
            < View className="w-full h-auto mt-3 bg-secondary-lighter" >
              <Text
                className="text-xl text-primary font-psemibold my-3 text-center"
              >SHOP BY ROOMS
              </Text>

              <View>
                <FlatList
                  data={rooms}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View className={`${index === 0 ? 'pl-6' : 'pl-4'} ${index === rooms.length - 1 ? 'pr-6' : ''}`}>
                      {
                        item.map((cat) => (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => router.push({
                              pathname: 'shopbyroom',
                              params: {
                                id: cat.id
                              }
                            })}>
                            <ShopByRoom
                              item={cat}
                            />
                          </TouchableOpacity>
                        ))
                      }

                    </View>
                  )}
                />
              </View>
            </ View>

            {/* Our Products */}
            < View className="w-full mt-3 mb-24" >
              <Text
                className="text-xl text-primary font-psemibold mt-3 text-center"
              >OUR PRODUCTS
              </Text>
              <View className="flex flex-row flex-wrap justify-between px-4">
                {products.map((product) => (
                  // log
                  // console.log('product', product.id),
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => console.log('Product Detail Clicked')}
                    onPress={() => router.push({
                      pathname: 'product-detail',
                      params: {
                        id: product.id
                      }
                    })}
                  >
                    <ProductVertical
                      item={product}
                    />
                  </TouchableOpacity>
                ))}

              </View>
            </ View>
          </ScrollView>
        )}

    </>
  )
}

export default Home