import { View, Text, ScrollView, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'

const Orders = () => {

  const orders = [
    {
      id: 1,
      orderNo: 'ORD-001',
      date: '12-12-2021',
      total: '10000',
      status: 'Delivered',
      items: [
        {
          id: 1,
          image: images.logo,
          title: 'Product 1',
          price: '10000',
          quantity: 1
        },
        {
          id: 2,
          image: images.logo,
          title: 'Product 2',
          price: '20000',
          quantity: 1
        }
      ]
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      date: '13-12-2021',
      total: '20000',
      status: 'Pending',
      items: [
        {
          id: 1,
          image: images.logo,
          title: 'Product 1 name will be here so that it can be displayed properly in the UI',
          price: '10000',
          quantity: 1
        },
        {
          id: 2,
          image: images.logo,
          title: 'Product 2',
          price: '20000',
          quantity: 1
        }
      ]
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      date: '14-12-2021',
      total: '30000',
      status: 'Delivered',
      items: [
        {
          id: 1,
          image: images.logo,
          title: 'Product 1',
          price: '10000',
          quantity: 1
        },
        {
          id: 2,
          image: images.logo,
          title: 'Product 2',
          price: '20000',
          quantity: 1
        }
      ]
    }
  ]

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
                <Text className="text-white font-psemibold">{item.orderNo}</Text>
                <Text className="text-white font-psemibold">{item.date}</Text>
              </View>
              <FlatList
                data={item.items}
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
                          source={item.image}
                          className="w-20 h-20 rounded-md"
                          resizeMode='contain'
                        />
                      </View>
                      <View
                        className="w-[80%] pl-5"
                      >
                        <Text
                          numberOfLines={2}
                          className="text-tertiary font-psemibold">{item.title}</Text>
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
                            <Text className="text-tertiary font-psemibold text-xl ">{item.quantity}</Text>
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
                <Text className="text-white font-psemibold">{item.total}</Text>
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