import { View, Text, FlatList, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from 'expo-router';
import icons from '../../constants/icons'
import images from '../../constants/images'
import Icon from '../../components/Icon';
import ProductVertical from '../../components/ProductVertical';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet'
import ShopByRoom from '../../components/ShopByRoom';
import RecentlyViewed from '../../components/RecentlyViewed';

const Home = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])

  const products = [
    {
      id: 1,
      image: images.logo,
      title: 'Product 1',
      tag: 'New Arrival',
      price: '10000',
      mrp: '12000',
      discount: '20%',
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
      discount: '10%',
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
      discount: '6%',
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
      discount: '5%',
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
      discount: '4%',
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

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        {/* Address Bar */}
        <TouchableWithoutFeedback
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
            <Text className="text-xs text-primary font-pregular">No Address Selected</Text>
            <Text className="text-xs text-primary-dark font-psemibold"> - Change?</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Categories */}
        <View className="w-full h-[110px] mt-3">
          <FlatList
            data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Icon
                item={item}
                index={index}
                selectableFrame={false}
              />
            )}
          />
        </View>

        {/* Banner */}
        <View className="w-full h-36 mt-3">
          <Image
            source={images.banner}
            className="w-full h-full rounded-lg"
            resizeMode='contain'
          />
        </View>

        {/* Recently Viewed Products */}
        <View className="w-full h-auto my-3">
          <Text
            className="text-xl text-primary font-psemibold my-3 text-center"
          >RECENTLY VIEWED PRODUCTS
          </Text>
          <View className="flex flex-row flex-wrap justify-between px-4 mt-2">
            {
              [1, 2, 3, 4].map((item) => (
                <RecentlyViewed
                  item={item}
                />
              ))
            }
          </View>
        </View>

        {/* Shop By Rooms */}
        <View className="w-full h-auto mt-3 bg-secondary-lighter">
          <Text
            className="text-xl text-primary font-psemibold my-3 text-center"
          >SHOP BY ROOMS
          </Text>

          {/* TODO: fix the logic for showing 2 rows of items */}
          <View>
            <FlatList
              data={[[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }], [{ id: 5 }, { id: 6 }]]}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View className={`${index === 0 ? 'pl-6' : 'pl-4'} ${index === item.length ? 'pr-6' : ''}`}>
                  {
                    item.map((cat) => (
                      <ShopByRoom
                        item={cat}
                      />
                    ))
                  }

                </View>
              )}
            />
          </View>
        </View>

        {/* Our Products */}
        <View className="w-full mt-3 mb-24">
          <Text
            className="text-xl text-primary font-psemibold mt-3 text-center"
          >OUR PRODUCTS
          </Text>
          <View className="flex flex-row flex-wrap justify-between px-4">
            {products.map((product) => (
              <ProductVertical
                item={product}
              />
            ))}

          </View>
        </View>
      </ScrollView>
      {/* <BottomSheet snapPoints={snapPoints}/> */}
    </GestureHandlerRootView>


  )
}

export default Home