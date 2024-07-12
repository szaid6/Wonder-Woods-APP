import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import Icon from '../../components/Icon'
import ProductVertical from '../../components/ProductVertical'

import { API_BASE_URL } from '@env'

const ShopByRoom = () => {

  // Get the item from the navigation
  const params = useLocalSearchParams();

  const roomId = JSON.parse(params.id)

  const [room, setRoom] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Get the subcategories and products
  useEffect(() => {
    fetch(`${API_BASE_URL}/shopbyroom/` + roomId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          console.log('Success:', data);
          const roomData = data.data.room;
          const productsData = roomData.products || [];

          setRoom(roomData);
          setProducts(productsData);
          console.log('products', productsData);
          setIsLoading(false);
        } else {
          console.log('Error:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <>
      <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
        <Header
          showTitle={true}
          title={room.name}
          showBackButton={true}
          showNotificationIcon={true}
          showSearchBar={false}
          searchBarEditable={false}
        />
      </View>
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
            className="w-full pb-5 flex-1 bg-white"
          >
            {/* Products */}
            <View className="flex flex-row flex-wrap justify-between px-4">
              {products?.map(product => (
                <ProductVertical
                  item={product}
                />
              ))}

            </View>

          </SafeAreaView>
        )}

    </>
  )
}

export default ShopByRoom