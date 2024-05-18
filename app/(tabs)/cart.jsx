import { View, Text, ScrollView, FlatList, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import EmptyPage from '../../components/EmptyPage'
import CartItem from '../../components/CartItem'
import images from '../../constants/images'
import { router } from 'expo-router'
import CustomButton from '../../components/CustomButton'

const Cart = () => {

  const cart = [{
    id: 1,
    productId: 1,
    qty: 1,
    price: 10000,
    product: {
      id: 1,
      image: images.logo,
      title: 'Product 1 name will be here so that it can be displayed properly in the UI',
      tag: 'New Arrival',
      price: '9000',
      mrp: '12000'
    }
  },
  {
    id: 2,
    productId: 2,
    qty: 2,
    price: 20000,
    product: {
      id: 2,
      image: images.logo,
      title: 'Product 2',
      tag: 'New',
      price: '22000',
      mrp: '23000'
    }
  },
  ]

  const openProductDetails = (productId) => {
    // stringified object
    console.log('====================================');
    console.log('Open Product Details', productId);
    console.log('====================================');
    // router.push('product-details', { id: item.product.id })
  }

  const checkout = (cart) => {
    console.log('====================================');
    console.log('Checkout', cart);
    console.log('====================================');
    router.push({
      pathname: 'checkout',
      params: {
        cart: cart
      }
    })
  }

  return (
    <View
      className="flex-1 px-2 bg-white"
    >
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyPage
            image={images.emptyCart}
            title="Your Cart is Empty"
            subTitle="Browse Products"
            handlePress={() => router.push('home')}
          />
        }
        ListHeaderComponent={
          <View
            className="flex mx-2 my-5 rounded-md px-4 py-3 bg-secondary-lighter"
          >
            <View className="flex flex-row justify-between items-center ">
              <Text className="text-[16px] font-pmedium text-primary-dark">Subtotal</Text>

              <Text className="text-[12px] font-psemibold text-primary">₹
                <Text className="text-[18px] font-psemibold text-primary-dark">
                  {
                    Number(cart.reduce((acc, item) => acc + (item.qty * item.product.price), 0)).toLocaleString('en-IN')
                  }
                </Text>
              </Text>
            </View>

            <CustomButton
              title={`Proceed to Buy (${cart.length} items)`}
              handlePress={checkout.bind(this, cart)}
              containerStyles="mt-3 rounded-md bg-secondary-light"
              textStyles="text-tertiary-light font-psemibold text-[16px]"
            />

          </View>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={openProductDetails.bind(this, item.product.id)}
            activeOpacity={1}
          >
            { /* log the item */
              console.log('item', item)
            }
            <CartItem
              item={item}
              showQty={true}
              showDelete={true}
              showAddToWishlist={true}
              showMoveToCart={false}
            />
          </TouchableOpacity>
        )}
      >
      </FlatList>
    </View>
  )
}

export default Cart