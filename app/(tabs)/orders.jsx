import { View, Text, ScrollView, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../constants/images'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL, IMAGE_API_BASE_URL } from '@env';

const Orders = () => {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);
      console.log('userData in orders', userData.id);
      setUser(userData);
      fetchOrders(userData.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setOrders(data.data);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const timeStampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-[20px] font-psemibold text-primary-dark">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white" >
      <View
        className="flex flex-col items-center mx-4 pt-3 justify-center"
      >
        <FlatList
          data={orders}
          renderItem={({ item, index }) => (
            <View
              // add margin bottom to the last item
              className={`w-full bg-secondary-lighter border-primary-light border-2 mb-3 rounded-md ${index === orders.length - 1 ? "mb-[80px]" : ""}`}
            >
              <View
                className="w-full flex flex-row justify-between px-5 py-3 rounded-t bg-primary-light"
              >
                <Text className="text-white font-psemibold">TRXID-{item.id}</Text>
                <Text className="text-white font-psemibold">{timeStampToDate(item.created_at)}</Text>
              </View>
              <FlatList
                data={item.orders}
                className="mt-2 px-2"
                renderItem={({ item }) => (
                  <>
                    <View
                      className="w-full flex flex-row items-center justify-between my-4"
                    >
                      <View
                        className="w-[20%] h-20 rounded-md"
                      >
                        <Image
                          source={{ uri: `${IMAGE_API_BASE_URL}/${item.product.image}` }}
                          className="w-20 h-20 rounded-md"
                          resizeMode='cover'
                        />
                      </View>
                      <View
                        className="w-[80%] pl-5"
                      >
                        <Text
                          numberOfLines={2}
                          className="text-tertiary font-psemibold">{item.product.name}</Text>
                        <View
                          className="flex flex-row justify-between"
                        >
                          <Text
                            className="text-tertiary font-psemibold"
                          >
                            ₹
                            <Text className="text-tertiary font-psemibold text-xl">{item.price}</Text>
                          </Text>
                          <Text className="text-tertiary font-psemibold">Nos - {''}
                            <Text className="text-tertiary font-psemibold text-xl ">{item.qty}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* <View className="w-3/4 mb-4 mt-2 border border-tertiary-light"></View> */}
                  </>
                )}
                keyExtractor={item => item.id}
              ></FlatList>
              <View
                className="w-full flex flex-row justify-between px-5 py-3 rounded-b bg-primary-light"
              >
                <Text className="text-white font-psemibold">₹ {item.total}</Text>
                <Text className="text-white font-psemibold">{item.status}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView >
  )
}

export default Orders